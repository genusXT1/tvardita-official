import 'dotenv/config';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  { url: 'https://tvardita.md/article/category/prezidentura-rmoldova', slug: 'prezidentura-rmoldova' },
  { url: 'https://tvardita.md/article/category/istoriya', slug: 'istoriya' },
  { url: 'https://tvardita.md/article/category/nash-khram', slug: 'nash-khram' },
  { url: 'https://tvardita.md/article/category/operativnyy-otdel', slug: 'operativnyy-otdel' },
  { url: 'https://tvardita.md/article/category/deyatelnost', slug: 'deyatelnost' },
  { url: 'https://tvardita.md/article/category/poleznye-ssylki', slug: 'poleznye-ssylki' },
  { url: 'https://tvardita.md/article/category/centr-zdorovya', slug: 'centr-zdorovya' },
  { url: 'https://tvardita.md/article/category/obyavleniya', slug: 'obyavleniya' },
  { url: 'https://tvardita.md/article/category/pozdravleniya', slug: 'pozdravleniya' },
  { url: 'https://tvardita.md/article/category/soboleznovaniya', slug: 'soboleznovaniya' },
  { url: 'https://tvardita.md/article/category/regionalnye-novosti', slug: 'regionalnye-novosti' },
  { url: 'https://tvardita.md/article/category/novosti-moldovy', slug: 'novosti-moldovy' },
  { url: 'https://tvardita.md/article/category/novosti-bolgarii', slug: 'novosti-bolgarii' }
];

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'migrated');

async function downloadImage(url: string, filename: string) {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  
  const filePath = path.join(UPLOADS_DIR, filename);
  if (fs.existsSync(filePath)) {
    return `/uploads/migrated/${filename}`;
  }

  try {
    const response = await axios({ url, responseType: 'stream' });
    return new Promise<string>((resolve, reject) => {
      response.data.pipe(fs.createWriteStream(filePath))
        .on('finish', () => resolve(`/uploads/migrated/${filename}`))
        .on('error', (e: any) => reject(e));
    });
  } catch (err) {
    console.error(`Failed to download image ${url}`);
    return null;
  }
}

async function scrapeCategory(cat: { url: string, slug: string }) {
  console.log(`Scraping category: ${cat.url}`);
  try {
    const { data } = await axios.get(cat.url);
    const $ = cheerio.load(data);
    
    const categoryName = $('h1.title').text().trim() || cat.slug;
    const categoryDesc = $('.field--name-description').html() || '';
    
    // Create or update category in DB
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: categoryName, description: categoryDesc, legacyUrl: cat.url },
      create: { slug: cat.slug, name: categoryName, description: categoryDesc, legacyUrl: cat.url }
    });
    
    console.log(`Saved category ${category.name}`);

    // Find all articles on the first page
    const articles = $('.views-row .post-item').toArray();
    for (const el of articles) {
      const $el = $(el);
      const title = $el.find('.post-title a').text().trim();
      const articleUrl = $el.find('.post-title a').attr('href');
      const fullUrl = `https://tvardita.md${articleUrl}`;
      const excerpt = $el.find('.field--name-body').text().trim();
      const imgUrl = $el.find('.field--name-field-image img').attr('src');
      
      let savedImgPath = null;
      if (imgUrl) {
        const fullImgUrl = imgUrl.startsWith('http') ? imgUrl : `https://tvardita.md${imgUrl}`;
        const fileName = path.basename(imgUrl.split('?')[0]);
        savedImgPath = await downloadImage(fullImgUrl, fileName);
      }
      
      const articleSlug = articleUrl?.split('/').pop() || Math.random().toString(36).substring(7);
      
      // Save article to DB
      try {
        await prisma.article.upsert({
          where: { slug: articleSlug },
          update: { 
            title, 
            excerpt, 
            content: excerpt, // Only saving excerpt for now. Full content requires fetching the articleUrl
            imageUrl: savedImgPath,
            categoryId: category.id,
            legacyUrl: fullUrl
          },
          create: {
            slug: articleSlug,
            title,
            excerpt,
            content: excerpt,
            imageUrl: savedImgPath,
            categoryId: category.id,
            legacyUrl: fullUrl
          }
        });
        console.log(`  Saved article: ${title}`);
      } catch (err) {
        console.error(`  Failed to save article ${title}`, err);
      }
    }
  } catch (err: any) {
    console.error(`Failed to scrape category ${cat.url}:`, err.message);
  }
}

async function main() {
  for (const cat of CATEGORIES) {
    await scrapeCategory(cat);
  }
  console.log('Migration finished!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
