import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import * as argon2 from 'argon2'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: 'Super Admin' },
    update: {},
    create: {
      name: 'Super Admin',
      permissions: {
        create: [
          { name: 'manage_all' }
        ]
      }
    }
  })

  const editorRole = await prisma.role.upsert({
    where: { name: 'Editor' },
    update: {},
    create: {
      name: 'Editor',
      permissions: {
        create: [
          { name: 'manage_content' }
        ]
      }
    }
  })

  const passwordHash = await argon2.hash('admin123')

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      email: 'admin@tvardita.md',
      username: 'admin',
      name: 'Test Administrator',
      password: passwordHash,
      roleId: adminRole.id
    }
  })

  const editor = await prisma.user.upsert({
    where: { username: 'editor' },
    update: {},
    create: {
      email: 'editor@tvardita.md',
      username: 'editor',
      name: 'Test Editor',
      password: await argon2.hash('editor123'),
      roleId: editorRole.id
    }
  })

  const newsCategory = await prisma.category.upsert({
    where: { slug: 'news' },
    update: {},
    create: {
      name: 'Новости',
      slug: 'news'
    }
  })

  const announcementsCategory = await prisma.category.upsert({
    where: { slug: 'announcements' },
    update: {},
    create: {
      name: 'Объявления',
      slug: 'announcements'
    }
  })

  await prisma.article.create({
    data: {
      title: 'Тестовая новость',
      slug: 'test-news',
      content: '<p>Это первая тестовая новость на новом портале.</p>',
      categoryId: newsCategory.id,
      authorId: editor.id,
      publishedAt: new Date()
    }
  })

  await prisma.announcement.create({
    data: {
      title: 'Внимание, отключение воды!',
      content: 'Завтра с 9:00 до 12:00 не будет воды на центральной улице.',
      level: 'warning',
      expiresAt: new Date(Date.now() + 86400000)
    }
  })

  await prisma.document.create({
    data: {
      title: 'Решение № 1/1 от 10.01.2026',
      number: '1/1',
      description: 'Об утверждении бюджета города',
      category: 'decisions',
      filePath: '/files/test-decision.pdf',
      fileSize: 102400,
      format: 'application/pdf'
    }
  })

  console.log('Seed executed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
