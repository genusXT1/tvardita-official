'use client';

import { useState } from 'react';
import { createArticle } from '@/actions/articles';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
}

export default function ArticleForm({ categories }: { categories: Category[] }) {
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function action(formData: FormData) {
    setIsPending(true);
    setError('');
    
    // Validate slug formatting
    const slug = formData.get('slug') as string;
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      setError('Slug может содержать только строчные латинские буквы, цифры и дефисы');
      setIsPending(false);
      return;
    }

    const res = await createArticle(formData);
    
    if (res?.error) {
      setError(res.error);
      setIsPending(false);
    } else {
      router.push('/admin/news');
      router.refresh();
    }
  }

  return (
    <form action={action} className="space-y-6">
      {error && <div className="text-danger bg-danger/10 p-3 rounded">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Заголовок *</label>
          <input 
            type="text" 
            name="title" 
            required 
            className="w-full border border-border rounded px-3 py-2 bg-background"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Slug (URL) *</label>
          <input 
            type="text" 
            name="slug" 
            required 
            pattern="[a-z0-9-]+"
            title="Только строчные латинские буквы, цифры и дефисы"
            className="w-full border border-border rounded px-3 py-2 bg-background"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Категория</label>
        <select 
          name="categoryId" 
          className="w-full border border-border rounded px-3 py-2 bg-background"
        >
          <option value="">Без категории (Объявление)</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Краткое описание (Анонс)</label>
        <textarea 
          name="excerpt" 
          rows={3}
          className="w-full border border-border rounded px-3 py-2 bg-background"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Полный текст (HTML) *</label>
        <textarea 
          name="content" 
          required 
          rows={15}
          className="w-full border border-border rounded px-3 py-2 bg-background font-mono text-sm"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-4">
        <button 
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-border rounded hover:bg-muted"
        >
          Отмена
        </button>
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover disabled:opacity-50"
        >
          {isPending ? 'Сохранение...' : 'Сохранить публикацию'}
        </button>
      </div>
    </form>
  );
}
