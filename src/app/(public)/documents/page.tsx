import { db } from '@/lib/db';
import Link from 'next/link';
import { ChevronRight, FileText, Search, Download } from 'lucide-react';

export default async function DocumentsPage() {
  const documents = await db.document.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      {/* Page Header */}
      <div className="bg-section border-b border-border-light">
        <div className="container-site py-8">
          <div className="flex items-center text-sm text-foreground-muted mb-4 gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-heading font-medium">Документы</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-heading mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Официальные документы
              </h1>
              <p className="text-foreground-muted">
                Решения городского совета, распоряжения примара и нормативные акты
              </p>
            </div>
            <div className="w-full md:w-auto relative">
              <input
                type="text"
                placeholder="Поиск по названию..."
                className="w-full md:w-80 border border-border rounded-lg pl-10 pr-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              <Search className="w-5 h-5 text-text-muted absolute left-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="bg-white rounded-xl border border-border-light overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-section border-b border-border">
                  <th className="p-4 font-semibold text-sm text-heading w-16">№</th>
                  <th className="p-4 font-semibold text-sm text-heading">Название документа</th>
                  <th className="p-4 font-semibold text-sm text-heading w-36">Категория</th>
                  <th className="p-4 font-semibold text-sm text-heading w-32">Дата</th>
                  <th className="p-4 font-semibold text-sm text-heading text-center w-28">Скачать</th>
                </tr>
              </thead>
              <tbody>
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-16 text-center">
                      <FileText className="w-12 h-12 text-text-muted mx-auto mb-3" />
                      <p className="text-foreground-muted">Документы не найдены</p>
                    </td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr key={doc.id} className="border-b border-border-light last:border-0 hover:bg-primary-light/30 transition-colors group">
                      <td className="p-4 text-text-muted font-mono text-sm">{doc.number || '-'}</td>
                      <td className="p-4">
                        <div className="font-medium text-heading group-hover:text-primary transition-colors">
                          {doc.title}
                        </div>
                        {doc.description && (
                          <div className="text-sm text-foreground-muted mt-1 line-clamp-1">{doc.description}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-full">
                          {doc.category}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-foreground-muted">
                        {new Date(doc.createdAt).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="p-4 text-center">
                        <a
                          href={doc.filePath}
                          download
                          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                          title="Скачать файл"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
