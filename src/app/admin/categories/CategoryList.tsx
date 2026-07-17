'use client';

import { deleteCategory } from '@/actions/categories';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-muted border-b border-border">
          <th className="p-3 font-semibold text-sm">Название</th>
          <th className="p-3 font-semibold text-sm">Slug</th>
          <th className="p-3 font-semibold text-sm text-right">Действия</th>
        </tr>
      </thead>
      <tbody>
        {categories.length === 0 ? (
          <tr>
            <td colSpan={3} className="p-4 text-center text-muted-foreground">
              Нет категорий
            </td>
          </tr>
        ) : (
          categories.map(category => (
            <tr key={category.id} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="p-3">{category.name}</td>
              <td className="p-3 text-sm text-foreground-muted">{category.slug}</td>
              <td className="p-3 text-right">
                <button 
                  onClick={() => deleteCategory(category.id)}
                  className="text-danger hover:underline text-sm"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
