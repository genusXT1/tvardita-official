import { getCategories } from '@/actions/categories';
import ArticleForm from '../ArticleForm';

export default async function NewArticlePage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Новая публикация</h1>
      <div className="bg-card p-6 rounded-xl border border-border">
        <ArticleForm categories={categories} />
      </div>
    </div>
  );
}
