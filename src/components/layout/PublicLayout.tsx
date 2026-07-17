import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Clock, MapPin, ChevronDown, ExternalLink } from 'lucide-react';
import { FacebookIcon, YoutubeIcon } from '@/components/ui/Icons';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ═══ Top Info Bar (white, slim) ═══ */}
      <div className="bg-white border-b border-border-light">
        <div className="container-site flex justify-between items-center py-2 text-sm text-foreground-muted">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              +373 (291) 62-2-36
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              primaria.tvardita@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Пн-Пт: 08:00 - 17:00
            </span>
            <span className="flex gap-2 text-xs font-semibold">
              <button className="text-primary hover:underline">RU</button>
              <span className="text-border">|</span>
              <button className="hover:text-primary hover:underline">RO</button>
              <span className="text-border">|</span>
              <button className="hover:text-primary hover:underline">BG</button>
            </span>
          </div>
        </div>
      </div>

      {/* ═══ Main Header (Logo + City Name) ═══ */}
      <header className="bg-white py-4 border-b border-border">
        <div className="container-site flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <img
              src="/logo.png"
              alt="Герб города Твардица"
              className="h-16 w-auto drop-shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-heading leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Примэрия города Твардица
              </span>
              <span className="text-sm text-foreground-muted">
                Primăria orașului Tvardița
              </span>
            </div>
          </Link>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://www.facebook.com/primariatvardita" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@primariatvardita" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200">
              <YoutubeIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* ═══ Green Navigation Bar ═══ */}
      <nav className="bg-nav sticky top-0 z-50 shadow-md">
        <div className="container-site">
          <ul className="flex flex-wrap items-center gap-0">
            <li>
              <Link href="/" className="block px-5 py-3.5 text-white font-semibold text-[0.9375rem] hover:bg-nav-hover transition-colors">
                Главная
              </Link>
            </li>

            {/* Примэрия dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1 px-5 py-3.5 text-white font-semibold text-[0.9375rem] hover:bg-nav-hover transition-colors">
                Примэрия
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>
              <div className="absolute top-full left-0 bg-white rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[240px] z-50 border border-border-light">
                <Link href="/city-hall/mayor" className="block px-5 py-3 text-foreground hover:bg-primary-light hover:text-primary transition-colors text-sm font-medium border-b border-border-light">
                  Примар
                </Link>
                <Link href="/city-hall/departments" className="block px-5 py-3 text-foreground hover:bg-primary-light hover:text-primary transition-colors text-sm font-medium border-b border-border-light">
                  Аппарат Примэрии
                </Link>
                <Link href="/city-hall/structure" className="block px-5 py-3 text-foreground hover:bg-primary-light hover:text-primary transition-colors text-sm font-medium">
                  Подведомственные учреждения
                </Link>
              </div>
            </li>

            {/* Гор.Совет dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1 px-5 py-3.5 text-white font-semibold text-[0.9375rem] hover:bg-nav-hover transition-colors">
                Гор.Совет
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>
              <div className="absolute top-full left-0 bg-white rounded-b-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[240px] z-50 border border-border-light">
                <Link href="/council" className="block px-5 py-3 text-foreground hover:bg-primary-light hover:text-primary transition-colors text-sm font-medium border-b border-border-light">
                  Состав совета
                </Link>
                <Link href="/council/decisions" className="block px-5 py-3 text-foreground hover:bg-primary-light hover:text-primary transition-colors text-sm font-medium border-b border-border-light">
                  Решения
                </Link>
                <Link href="/council/meetings" className="block px-5 py-3 text-foreground hover:bg-primary-light hover:text-primary transition-colors text-sm font-medium">
                  Заседания (видео)
                </Link>
              </div>
            </li>

            <li>
              <Link href="/news" className="block px-5 py-3.5 text-white font-semibold text-[0.9375rem] hover:bg-nav-hover transition-colors">
                Новости
              </Link>
            </li>
            <li>
              <Link href="/documents" className="block px-5 py-3.5 text-white font-semibold text-[0.9375rem] hover:bg-nav-hover transition-colors">
                Документы
              </Link>
            </li>
            <li>
              <Link href="/services/appeals" className="block px-5 py-3.5 text-white font-semibold text-[0.9375rem] hover:bg-nav-hover transition-colors">
                Обращения
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="block px-5 py-3.5 text-white font-semibold text-[0.9375rem] hover:bg-nav-hover transition-colors">
                Контакты
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ═══ Main Content ═══ */}
      <main className="flex-grow">
        {children}
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="bg-heading text-white mt-16">
        {/* Main footer content */}
        <div className="container-site py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Column 1: About */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="Герб" className="h-12 w-auto brightness-0 invert opacity-80" />
                <div>
                  <div className="font-bold text-lg leading-tight">Примэрия</div>
                  <div className="text-white/60 text-sm">г. Твардица</div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Официальный портал Примэрии города Твардица, Тараклийский район, Республика Молдова.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="font-bold text-lg mb-5 text-white">Разделы</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/news" className="text-white/70 hover:text-white transition-colors">Новости</Link></li>
                <li><Link href="/documents" className="text-white/70 hover:text-white transition-colors">Документы</Link></li>
                <li><Link href="/services/appeals" className="text-white/70 hover:text-white transition-colors">Обращения граждан</Link></li>
                <li><Link href="/contacts" className="text-white/70 hover:text-white transition-colors">Контакты</Link></li>
              </ul>
            </div>

            {/* Column 3: Contacts */}
            <div>
              <h3 className="font-bold text-lg mb-5 text-white">Контакты</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                  г. Твардица, ул. Фрунзе 1, MD-7422
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                  +373 (291) 62-2-36
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                  <a href="mailto:primaria.tvardita@gmail.com" className="hover:text-white transition-colors">
                    primaria.tvardita@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Schedule */}
            <div>
              <h3 className="font-bold text-lg mb-5 text-white">График работы</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between">
                  <span>Понедельник - Пятница</span>
                  <span className="text-white font-medium">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Обеденный перерыв</span>
                  <span className="text-white font-medium">12:00 - 13:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Суббота - Воскресенье</span>
                  <span className="text-red-400">Выходной</span>
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                <a href="https://www.facebook.com/primariatvardita" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="https://www.youtube.com/@primariatvardita" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors">
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-white/10">
          <div className="container-site py-5 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
            <span>© {new Date().getFullYear()} Примэрия города Твардица. Все права защищены.</span>
            <Link href="/login" className="hover:text-white transition-colors mt-2 md:mt-0">
              Вход для администраторов
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
