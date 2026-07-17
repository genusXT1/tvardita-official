import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const argv = yargs(hideBin(process.argv))
  .option('dry-run', {
    alias: 'd',
    type: 'boolean',
    description: 'Run without saving to database',
    default: false,
  })
  .option('limit', {
    alias: 'l',
    type: 'number',
    description: 'Limit number of pages to process',
    default: 5,
  })
  .parseSync();

const isDryRun = argv['dry-run'];
const limit = argv.limit;

const BASE_URL = 'https://tvardita.md';
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'legacy');
const MAPPING_FILE = path.join(process.cwd(), 'docs', 'url-mapping-results.json');

let prisma: PrismaClient;

if (!isDryRun) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
}

// Ensure uploads dir exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

async function downloadFile(url: string, destPath: string): Promise<string> {
  try {
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer'
    });
    
    const buffer = Buffer.from(response.data);
    const hash = crypto.createHash('md5').update(buffer).digest('hex');
    
    const ext = path.extname(destPath) || '.bin';
    const newFilename = `${hash}${ext}`;
    const finalPath = path.join(UPLOADS_DIR, newFilename);
    
    if (!fs.existsSync(finalPath)) {
      fs.writeFileSync(finalPath, buffer);
      console.log(`✅ Downloaded: ${newFilename}`);
    } else {
      console.log(`⏩ Skipped (already exists): ${newFilename}`);
    }
    
    return `/uploads/legacy/${newFilename}`;
  } catch (err: any) {
    console.error(`❌ Failed to download ${url}:`, err.message);
    return url; // fallback to original
  }
}

function generateSlug(title: string): string {
  return title.toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04FF-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '-' + crypto.randomBytes(2).toString('hex');
}

async function scrapePage(url: string) {
  console.log(`\n📄 Scrape: ${url}`);
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    
    const title = $('h1').first().text().trim() || $('title').text().trim();
    let content = $('.region-content .field--name-body').first().html() || $('.content').html() || $('article').html() || '';
    
    if (!content) {
      console.log('⚠️ No content found.');
      return null;
    }

    // Process images
    const images = $('img');
    for (let i = 0; i < images.length; i++) {
      const src = $(images[i]).attr('src');
      if (src) {
        const fullSrc = src.startsWith('http') ? src : `${BASE_URL}${src}`;
        const newSrc = await downloadFile(fullSrc, src);
        content = content.replace(src, newSrc);
      }
    }

    // Process links/documents
    const links = $('a');
    for (let i = 0; i < links.length; i++) {
      const href = $(links[i]).attr('href');
      if (href && (href.endsWith('.pdf') || href.endsWith('.doc') || href.endsWith('.docx'))) {
        const fullHref = href.startsWith('http') ? href : `${BASE_URL}${href}`;
        const newHref = await downloadFile(fullHref, href);
        content = content.replace(href, newHref);
      }
    }

    return {
      title,
      content,
      slug: generateSlug(title),
      legacyUrl: url
    };
  } catch (error: any) {
    console.error(`❌ Error scraping ${url}:`, error.message);
    return null;
  }
}

async function run() {
  console.log(`🚀 Starting legacy import (Dry Run: ${isDryRun}, Limit: ${limit})`);
  
  const mappings: Record<string, string> = {};

  try {
    let currentPage = 0;
    let hasMorePages = true;
    const urlsToScrape = new Set<string>();

    while (hasMorePages && urlsToScrape.size < limit) {
      const pageUrl = currentPage === 0 ? BASE_URL : `${BASE_URL}/node?page=${currentPage}`;
      console.log(`Fetching list page: ${pageUrl}`);
      try {
        const pageRes = await axios.get(pageUrl);
        const $main = cheerio.load(pageRes.data);
        const links = $main('a[href^="/article/"]');
        
        let foundNewLinks = false;
        links.each((_, el) => {
          const href = $main(el).attr('href');
          if (href && !href.includes('/category/')) {
            const fullUrl = `${BASE_URL}${href}`;
            if (!urlsToScrape.has(fullUrl)) {
              urlsToScrape.add(fullUrl);
              foundNewLinks = true;
            }
          }
        });

        if (!foundNewLinks) {
          hasMorePages = false;
        } else {
          currentPage++;
        }
      } catch (err) {
        console.warn(`Stopped crawling pages at page ${currentPage}`);
        hasMorePages = false;
      }
    }

    const urls = Array.from(urlsToScrape).slice(0, limit);
    console.log(`Found ${urls.length} articles to scrape.`);

    for (const url of urls) {
      const data = await scrapePage(url);
      if (data) {
        const newUrl = `/news/${data.slug}`;
        mappings[url] = newUrl;
        
        console.log(`➡️  Extracted: ${data.title}`);
        
        if (!isDryRun) {
          try {
            await prisma.article.upsert({
              where: { legacyUrl: url },
              update: {
                title: data.title,
                content: data.content,
                status: 'review'
              },
              create: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: 'review',
                legacyUrl: url,
                publishedAt: new Date()
              }
            });
            console.log(`✅ Saved to DB: ${data.slug}`);
          } catch (dbErr: any) {
            console.error(`❌ DB Save failed:`, dbErr.message);
          }
        }
      }
    }
  } catch (err: any) {
    console.error('Error fetching main page:', err.message);
  }

  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mappings, null, 2));
  console.log(`\n💾 Saved mappings to ${MAPPING_FILE}`);
  
  if (!isDryRun) {
    await prisma.$disconnect();
  }
}

run();
