'use client';

import { deleteArticle } from '@/actions/articles';
import { useState } from 'react';

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (confirm('Вы уверены, что хотите удалить публикацию?')) {
      setIsPending(true);
      await deleteArticle(id);
      setIsPending(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      className="text-danger hover:underline text-sm disabled:opacity-50"
    >
      {isPending ? 'Удаление...' : 'Удалить'}
    </button>
  );
}
