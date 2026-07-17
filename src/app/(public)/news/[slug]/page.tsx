import { db } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Calendar, User } from 'lucide-react';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await db.article.findUnique({
    where: { slug },
    include: { category: true, author: true }
  });

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* Breadcrumb header */}
      <div className="bg-section border-b border-border-light">
        <div className="container-site py-6">
          <div className="flex items-center text-sm text-foreground-muted gap-2 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/news" className="hover:text-primary transition-colors">Новости</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-heading font-medium truncate max-w-[300px]">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="container-site py-12">
        <article className="max-w-3xl mx-auto">
          {/* Category + Date */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold text-primary bg-primary-light px-3 py-1.5 rounded-full uppercase tracking-wider">
              {article.category?.name || 'Новости'}
            </span>
            <span className="text-sm text-text-muted flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {article.author && (
              <span className="text-sm text-text-muted flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author.name || article.author.username}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-heading leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <div className="text-lg text-foreground-muted mb-8 pb-8 border-b border-border-light italic leading-relaxed">
              {article.excerpt}
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-heading prose-headings:font-bold
              prose-a:text-primary hover:prose-a:underline
              prose-p:text-foreground prose-p:leading-relaxed
              prose-img:rounded-xl prose-img:shadow-md
              prose-strong:text-heading"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border-light">
            <Link href="/news" className="btn-outline text-sm py-2.5 px-6">
              ← Все новости
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
