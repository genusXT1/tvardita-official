import Link from 'next/link';
import { db } from '@/lib/db';
import { Search, AlertTriangle, FileText, ChevronRight, Phone, Calendar, Users, Building2, Newspaper, MessageSquare, Download } from 'lucide-react';

export default async function Home() {
  const latestNews = await db.article.findMany({
    orderBy: { publishedAt: 'desc' },
    take: 6,
    include: { category: true }
  });

  const activeAnnouncements = await db.announcement.findMany({
    where: {
      OR: [
        { expiresAt: { gt: new Date() } },
        { expiresAt: null }
      ]
    },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO SECTION — Green Gradient + Search
          ═══════════════════════════════════════════ */}
      <section className="bg-green-gradient text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container-site relative z-10 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-6 leading-tight tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Добро пожаловать<br />в Твардицу
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
              Официальный портал Примэрии города Твардица. Все городские услуги, новости и документы в одном месте.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex bg-white rounded-xl p-1.5 shadow-2xl shadow-black/20">
                <input
                  type="text"
                  placeholder="Что вы ищете? (справки, график, документы...)"
                  className="flex-grow min-w-0 px-5 py-3.5 rounded-l-lg text-foreground placeholder:text-text-muted focus:outline-none text-[0.9375rem]"
                />
                <button className="btn-primary rounded-lg px-7 flex-shrink-0">
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline ml-2">Найти</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QUICK SERVICES — Icon Cards
          ═══════════════════════════════════════════ */}
      <section className="container-site -mt-10 relative z-20 mb-16 px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: FileText, title: 'Документы', desc: 'Решения, распоряжения', href: '/documents', color: 'text-green-600' },
            { icon: MessageSquare, title: 'Обращения', desc: 'Жалобы и предложения', href: '/services/appeals', color: 'text-blue-600' },
            { icon: Newspaper, title: 'Новости', desc: 'Последние события', href: '/news', color: 'text-amber-600' },
            { icon: Building2, title: 'Примэрия', desc: 'Структура, контакты', href: '/city-hall/mayor', color: 'text-purple-600' },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 card-hover border border-border-light group text-center"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-light flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-heading text-base mb-1">{item.title}</h3>
              <p className="text-sm text-foreground-muted">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          URGENT ANNOUNCEMENTS (if any)
          ═══════════════════════════════════════════ */}
      {activeAnnouncements.length > 0 && (
        <section className="container-site mb-16">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-red-700 flex items-center gap-2 mb-5">
              <AlertTriangle className="w-6 h-6" />
              Важные объявления
            </h2>
            <div className="space-y-4">
              {activeAnnouncements.map(ann => (
                <div key={ann.id} className="bg-white rounded-lg border-l-4 border-red-500 p-5 shadow-sm">
                  <h3 className="font-bold text-heading mb-2">{ann.title}</h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          MAIN CONTENT: News + Sidebar
          ═══════════════════════════════════════════ */}
      <section className="container-site mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ─── News Column ─── */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <h2 className="section-title">Последние новости</h2>
              <Link href="/news" className="btn-outline text-sm py-2 px-5">
                Все новости
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-6">
              {latestNews.length === 0 ? (
                <div className="bg-section rounded-xl p-12 text-center">
                  <Newspaper className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <p className="text-foreground-muted">Пока нет опубликованных новостей</p>
                </div>
              ) : (
                latestNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/news/${news.slug}`}
                    className="flex flex-col md:flex-row bg-white rounded-xl border border-border-light overflow-hidden card-hover group"
                  >
                    {/* Article image placeholder */}
                    <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-green-100 to-green-50 flex-shrink-0 flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-green-300" />
                    </div>

                    {/* Article content */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {news.category?.name || 'Новости'}
                          </span>
                          <span className="text-xs text-text-muted flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(news.publishedAt || news.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-heading mb-2 group-hover:text-primary transition-colors leading-snug">
                          {news.title}
                        </h3>
                        <p className="text-foreground-muted text-sm line-clamp-2 leading-relaxed">
                          {news.excerpt || news.content.replace(/<[^>]+>/g, '').substring(0, 180)}
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
          </div>

          {/* ─── Sidebar ─── */}
          <div className="space-y-8">

            {/* Mayor's Card */}
            <div className="bg-white rounded-xl border border-border-light overflow-hidden shadow-sm">
              <div className="bg-gradient-to-br from-green-500 to-green-600 h-28 flex items-center justify-center">
                <Users className="w-12 h-12 text-white/30" />
              </div>
              <div className="p-6 text-center -mt-8">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-md mx-auto flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-heading">Попов Георгий</h3>
                <p className="text-sm text-foreground-muted mb-4">Примар г. Твардица</p>
                <Link href="/city-hall/mayor" className="btn-outline text-sm py-2 px-5 w-full">
                  Обращение примара
                </Link>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl border border-border-light p-6 shadow-sm">
              <h3 className="section-title text-lg mb-5">Контакты</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-heading">Приемная</div>
                    <div className="text-foreground-muted">+373 (291) 62-2-36</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-heading">Адрес</div>
                    <div className="text-foreground-muted">ул. Фрунзе 1, г. Твардица</div>
                  </div>
                </li>
              </ul>
              <Link href="/contacts" className="block text-center mt-5 btn-primary text-sm py-2.5">
                Все контакты
              </Link>
            </div>

            {/* Monthly Archive */}
            <div className="bg-white rounded-xl border border-border-light p-6 shadow-sm">
              <h3 className="section-title text-lg mb-5">Ежемесячный архив</h3>
              <ul className="space-y-2">
                {[
                  { month: 'Июль 2026', count: 5 },
                  { month: 'Июнь 2026', count: 17 },
                  { month: 'Май 2026', count: 8 },
                  { month: 'Апрель 2026', count: 11 },
                  { month: 'Март 2026', count: 18 },
                  { month: 'Февраль 2026', count: 8 },
                  { month: 'Январь 2026', count: 11 },
                  { month: 'Декабрь 2025', count: 8 },
                  { month: 'Ноябрь 2025', count: 7 },
                  { month: 'Октябрь 2025', count: 5 },
                ].map((item) => (
                  <li key={item.month}>
                    <Link href={`/news?month=${item.month}`} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-section text-sm font-medium text-foreground hover:text-primary transition-colors">
                      <span className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary opacity-50" />
                        {item.month}
                      </span>
                      <span className="text-foreground-muted">({item.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sites in Tvardita */}
            <div className="bg-white rounded-xl border border-border-light p-6 shadow-sm">
              <h3 className="section-title text-lg mb-5">Сайты в Твардице</h3>
              <div className="space-y-4">
                <a href="#" className="block hover:opacity-80 transition-opacity">
                  <img src="/uploads/banners/licey.jpg" alt="Теоретический Лицей Твардица" className="w-full rounded-md shadow-sm border border-border-light" />
                </a>
                <a href="#" className="block hover:opacity-80 transition-opacity">
                  <img src="/uploads/banners/library.jpg" alt="Библиотека Твардицы" className="w-full rounded-md shadow-sm border border-border-light" />
                </a>
                <a href="#" className="block hover:opacity-80 transition-opacity">
                  <img src="/uploads/banners/music_school.jpg" alt="Музыкальный колледж" className="w-full rounded-md shadow-sm border border-border-light" />
                </a>
                <a href="#" className="block hover:opacity-80 transition-opacity">
                  <img src="/uploads/banners/ergobrix.jpg" alt="Ergobrix" className="w-full rounded-md shadow-sm border border-border-light" />
                </a>
              </div>
            </div>

            {/* Useful Links Banners */}
            <div className="bg-white rounded-xl border border-border-light p-6 shadow-sm">
              <h3 className="section-title text-lg mb-5">Полезные ссылки</h3>
              <div className="space-y-4">
                <a href="https://gov.md" target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity">
                  <img src="/uploads/banners/gov.jpg" alt="Правительство Республики Молдова" className="w-full rounded-md shadow-sm border border-border-light" />
                </a>
                <a href="https://taraclia.md" target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity">
                  <img src="/uploads/banners/taraclia_district.jpg" alt="Район Тараклия" className="w-full rounded-md shadow-sm border border-border-light" />
                </a>
                <a href="https://primariataraclia.md" target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity">
                  <img src="/uploads/banners/taraclia_city.jpg" alt="Администрация города Тараклия" className="w-full rounded-md shadow-sm border border-border-light" />
                </a>
                <a href="https://sfs.md" target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity">
                  <img src="/uploads/banners/fisc.jpg" alt="Serviciul Fiscal de Stat" className="w-full rounded-md shadow-sm border border-border-light" />
                </a>
              </div>
            </div>

            {/* Regional Media */}
            <div className="bg-white rounded-xl border border-border-light p-6 shadow-sm">
              <h3 className="section-title text-lg mb-5">СМИ в регионе</h3>
              <div className="space-y-4">
                <a href="https://grt.md" target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity bg-section p-4 rounded-md border border-border-light text-center flex items-center justify-center">
                  <img src="/uploads/banners/grt.png" alt="GRT" className="max-h-12 w-auto" />
                </a>
                <a href="https://tuk.md" target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity bg-section p-4 rounded-md border border-border-light text-center flex items-center justify-center">
                  <img src="/uploads/banners/tuk.png" alt="TUK" className="max-h-12 w-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
