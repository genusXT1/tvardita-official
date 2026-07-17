'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';

export async function getArticles() {
  return await db.article.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });
}

export async function getArticle(id: string) {
  return await db.article.findUnique({
    where: { id }
  });
}

export async function createArticle(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'Не авторизован' };

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const categoryId = formData.get('categoryId') as string;

  if (!title || !slug || !content) {
    return { error: 'Заполните обязательные поля' };
  }

  try {
    await db.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        categoryId: categoryId || null,
        authorId: session.userId,
        publishedAt: new Date()
      }
    });
    revalidatePath('/admin/news');
    return { success: true };
  } catch (error) {
    return { error: 'Ошибка при сохранении' };
  }
}

export async function deleteArticle(id: string) {
  try {
    await db.article.delete({
      where: { id }
    });
    revalidatePath('/admin/news');
    return { success: true };
  } catch (error) {
    return { error: 'Ошибка при удалении' };
  }
}
