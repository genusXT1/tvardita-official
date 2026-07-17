import { getArticles, deleteArticle } from '@/actions/articles';
import Link from 'next/link';
import { db } from '@/lib/db';
import DeleteButton from './DeleteButton';

export default async function NewsAdminPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Новости и публикации</h1>
        <Link href="/admin/news/new" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover">
          Добавить новость
        </Link>
      </div>
      
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="p-3 font-semibold text-sm">Заголовок</th>
              <th className="p-3 font-semibold text-sm">Категория</th>
              <th className="p-3 font-semibold text-sm">Дата</th>
              <th className="p-3 font-semibold text-sm text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">
                  Нет публикаций
                </td>
              </tr>
            ) : (
              articles.map(article => (
                <tr key={article.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-3 font-medium">{article.title}</td>
                  <td className="p-3 text-sm">{article.category?.name || '-'}</td>
                  <td className="p-3 text-sm">{new Date(article.createdAt).toLocaleDateString('ru-RU')}</td>
                  <td className="p-3 text-right space-x-2">
                    <Link href={`/admin/news/${article.id}`} className="text-information hover:underline text-sm">
                      Редактировать
                    </Link>
                    <DeleteButton id={article.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
