import { db } from '@/lib/db';
import Link from 'next/link';
import { ChevronRight, Calendar, Newspaper } from 'lucide-react';

export default async function NewsPage() {
  const articles = await db.article.findMany({
    orderBy: { publishedAt: 'desc' },
    include: { category: true }
  });

  return (
    <>
      {/* Page Header */}
      <div className="bg-section border-b border-border-light">
        <div className="container-site py-8">
          <div className="flex items-center text-sm text-foreground-muted mb-4 gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-heading font-medium">Новости</span>
          </div>
          <h1 className="text-3xl font-extrabold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
            Новости и события
          </h1>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Articles list */}
          <div className="lg:col-span-2 space-y-6">
            {articles.length === 0 ? (
              <div className="bg-section rounded-xl p-16 text-center">
                <Newspaper className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-bold text-heading mb-2">Нет публикаций</h3>
                <p className="text-foreground-muted">Пока не опубликовано ни одной новости.</p>
              </div>
            ) : (
              articles.map(article => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="flex flex-col md:flex-row bg-white rounded-xl border border-border-light overflow-hidden card-hover group"
                >
                  <div className="md:w-56 h-44 md:h-auto bg-gradient-to-br from-green-100 to-green-50 flex-shrink-0 flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-green-300" />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {article.category?.name || 'Новости'}
                        </span>
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(article.publishedAt || article.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-heading mb-2 group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h2>
                      <p className="text-foreground-muted text-sm line-clamp-3 leading-relaxed">
                        {article.excerpt || article.content.replace(/<[^>]+>/g, '').substring(0, 200)}
                      </p>
                    </div>
                    <div className="mt-4">
                      <span className="text-primary text-sm font-semibold group-hover:underline">
                        Читать далее →
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border-light p-6 shadow-sm">
              <h3 className="section-title text-lg mb-5">Категории</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/news" className="flex items-center gap-2 py-2.5 px-3 rounded-lg bg-primary-light text-primary text-sm font-semibold">
                    <ChevronRight className="w-4 h-4" />
                    Все новости
                  </Link>
                </li>
                {['События города', 'Официально', 'Культура и спорт'].map(cat => (
                  <li key={cat}>
                    <Link href={`/news?category=${cat}`} className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-foreground-muted hover:bg-section hover:text-primary transition-colors text-sm font-medium">
                      <ChevronRight className="w-4 h-4 text-text-muted" />
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
