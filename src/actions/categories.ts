'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  return await db.category.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;

  if (!name || !slug) return { error: 'Пожалуйста, заполните все поля' };

  try {
    await db.category.create({
      data: { name, slug }
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { error: 'Ошибка при создании категории' };
  }
}

export async function deleteCategory(id: string) {
  try {
    await db.category.delete({
      where: { id }
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { error: 'Ошибка при удалении категории' };
  }
}
