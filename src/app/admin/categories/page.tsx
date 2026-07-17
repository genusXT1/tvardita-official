import { getCategories } from '@/actions/categories';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Категории</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-card p-4 rounded-xl border border-border">
            <h2 className="text-lg font-semibold mb-4">Добавить категорию</h2>
            <CategoryForm />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <CategoryList categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
