import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Calendar, Eye } from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await db.category.findUnique({
    where: { slug: params.slug },
    include: {
      articles: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="container-site py-12">
      {/* Category Header */}
      <div className="mb-12 border-b border-border-light pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-heading mb-4 font-heading">
          {category.name}
        </h1>
        {category.description && (
          <div 
            className="prose prose-lg max-w-none text-foreground-muted"
            dangerouslySetInnerHTML={{ __html: category.description }}
          />
        )}
      </div>

      {/* Articles Grid */}
      {category.articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg border border-border-light overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
              <Link href={`/news/${article.slug}`} className="block relative h-48 overflow-hidden bg-gray-100">
                {article.imageUrl ? (
                  <Image 
                    src={article.imageUrl} 
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-foreground-muted/50">
                    Нет фото
                  </div>
                )}
              </Link>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-heading mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/news/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-foreground-muted text-sm line-clamp-3 mb-4 flex-grow">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-foreground-muted mt-auto pt-4 border-t border-border-light">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Intl.DateTimeFormat('ru', { dateStyle: 'long' }).format(article.publishedAt || article.createdAt)}
                  </span>
                  <Link 
                    href={`/news/${article.slug}`}
                    className="text-primary font-medium hover:underline"
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-foreground-muted">
          В этой категории пока нет записей.
        </div>
      )}
    </div>
  );
}
