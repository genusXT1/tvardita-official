'use client';

import { useRef, useState } from 'react';
import { createCategory } from '@/actions/categories';

export default function CategoryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  async function action(formData: FormData) {
    setIsPending(true);
    setError('');
    const res = await createCategory(formData);
    setIsPending(false);
    
    if (res?.error) {
      setError(res.error);
    } else {
      formRef.current?.reset();
    }
  }

  return (
    <form ref={formRef} action={action} className="space-y-4">
      {error && <div className="text-danger text-sm">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium mb-1">Название</label>
        <input 
          type="text" 
          name="name" 
          required 
          className="w-full border border-border rounded px-3 py-2"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Slug (URL)</label>
        <input 
          type="text" 
          name="slug" 
          required 
          className="w-full border border-border rounded px-3 py-2"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-primary text-white py-2 rounded hover:bg-primary-hover disabled:opacity-50"
      >
        {isPending ? 'Сохранение...' : 'Добавить'}
      </button>
    </form>
  );
}
