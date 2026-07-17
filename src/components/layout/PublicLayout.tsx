"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, Clock, MapPin, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import { FacebookIcon, YoutubeIcon } from '@/components/ui/Icons';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuOpenSection, setMobileMenuOpenSection] = useState<string | null>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const toggleMobileSection = (section: string) => {
    setMobileMenuOpenSection(mobileMenuOpenSection === section ? null : section);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ═══ Top Info Bar (white, slim) - Hidden on very small screens ═══ */}
      <div className="bg-white border-b border-border-light hidden sm:block">
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
            <span className="hidden lg:flex items-center gap-1.5">
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
          <Link href="/" className="flex items-center gap-3 md:gap-4 group z-50">
            <img
              src="/logo.png"
              alt="Герб города Твардица"
              className="h-12 md:h-16 w-auto drop-shadow-sm"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-extrabold text-heading leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Примэрия г. Твардица
              </span>
              <span className="text-xs md:text-sm text-foreground-muted">
                Primăria orașului Tvardița
              </span>
            </div>
          </Link>

          {/* Social Links - Desktop only */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://www.facebook.com/primariatvardita" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@primariatvardita" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200">
              <YoutubeIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 text-foreground hover:bg-gray-100 rounded-md transition-colors z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* ═══ Green Navigation Bar (Desktop) ═══ */}
      <nav className="bg-[#4d9e38] sticky top-0 z-40 shadow-md hidden lg:block">
        <div className="container-site">
          <ul className="flex items-center text-white text-[15px] font-medium">
            
            {/* Основное dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-4 hover:bg-[#3d832b] transition-colors cursor-pointer">
                Основное <ChevronDown className="w-4 h-4 opacity-80" />
              </button>
              <div className="absolute top-full left-0 bg-[#252525] rounded-b shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[260px] z-50 py-2">
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Президентура Республики Молдова</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">История города</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Наш храм</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Оперативный отдел</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Деятельность</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Полезная информация</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Центр Здоровья</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Объявления</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Поздравления</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Соболезнования</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Региональные новости</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Новости Молдовы</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Новости Болгарии</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Новости Украины</Link>
              </div>
            </li>

            {/* Примэрия dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-4 hover:bg-[#3d832b] transition-colors cursor-pointer">
                Примэрия <ChevronDown className="w-4 h-4 opacity-80" />
              </button>
              <div className="absolute top-full left-0 bg-[#252525] rounded-b shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[260px] z-50 py-2">
                <Link href="/city-hall/mayor" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Примар</Link>
                <Link href="/city-hall/departments" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Аппарат примэрии</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Международное сотрудничество</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Личности г.Твардица</Link>
                <Link href="/news" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Новости г.Твардица</Link>
              </div>
            </li>

            {/* Гор.Совет dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-4 hover:bg-[#3d832b] transition-colors cursor-pointer">
                Гор.Совет <ChevronDown className="w-4 h-4 opacity-80" />
              </button>
              <div className="absolute top-full left-0 bg-[#252525] rounded-b shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[220px] z-50 py-2">
                <Link href="/council" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Городской совет</Link>
                <Link href="/council/decisions" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Решения</Link>
                <Link href="/council/meetings" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Заседания (Video)</Link>
              </div>
            </li>

            {/* Подведомственные учреждения dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-4 hover:bg-[#3d832b] transition-colors cursor-pointer">
                Подведомственные учреждения <ChevronDown className="w-4 h-4 opacity-80" />
              </button>
              <div className="absolute top-full left-0 bg-[#252525] rounded-b shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[320px] z-50 py-2">
                <div className="relative group/sub">
                  <Link href="#" className="flex items-center justify-between px-5 py-2.5 hover:bg-[#333] transition-colors">
                    Культурно-Спортивный Комплекс им. П.М. Парликова
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Музей</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Школа искусств</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Библиотеки</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Реабилитационный центр</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Социальный центр</Link>
                <div className="relative group/sub">
                  <Link href="#" className="flex items-center justify-between px-5 py-2.5 hover:bg-[#333] transition-colors">
                    Детский сад
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </li>

            {/* Образование dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-4 hover:bg-[#3d832b] transition-colors cursor-pointer">
                Образование <ChevronDown className="w-4 h-4 opacity-80" />
              </button>
              <div className="absolute top-full left-0 bg-[#252525] rounded-b shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[240px] z-50 py-2">
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Теоретический лицей</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Музыкальный колледж</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">ДЮСШ спорт</Link>
              </div>
            </li>

            {/* Твардисан dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-4 hover:bg-[#3d832b] transition-colors cursor-pointer">
                Твардисан <ChevronDown className="w-4 h-4 opacity-80" />
              </button>
              <div className="absolute top-full left-0 bg-[#252525] rounded-b shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px] z-50 py-2">
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">О предприятии</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Услуги</Link>
                <Link href="#" className="block px-5 py-2.5 hover:bg-[#333] transition-colors">Контакты</Link>
              </div>
            </li>

          </ul>
        </div>
      </nav>

      {/* ═══ Mobile Navigation Menu ═══ */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] sm:top-[128px] bg-[#252525] text-white z-40 overflow-y-auto">
          <ul className="flex flex-col w-full text-base font-medium">
            
            {/* Mobile Основное */}
            <li>
              <button 
                className="flex items-center justify-between w-full px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => toggleMobileSection('main')}
              >
                Основное
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpenSection === 'main' ? 'rotate-180' : ''}`} />
              </button>
              {mobileMenuOpenSection === 'main' && (
                <div className="bg-[#1a1a1a] flex flex-col">
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Президентура Республики Молдова</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>История города</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Наш храм</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Оперативный отдел</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Деятельность</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Полезная информация</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Центр Здоровья</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Объявления</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Поздравления</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Соболезнования</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Региональные новости</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Новости Молдовы</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Новости Болгарии</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Новости Украины</Link>
                </div>
              )}
            </li>

            {/* Mobile Примэрия */}
            <li>
              <button 
                className="flex items-center justify-between w-full px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => toggleMobileSection('city-hall')}
              >
                Примэрия
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpenSection === 'city-hall' ? 'rotate-180' : ''}`} />
              </button>
              {mobileMenuOpenSection === 'city-hall' && (
                <div className="bg-[#1a1a1a] flex flex-col">
                  <Link href="/city-hall/mayor" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Примар</Link>
                  <Link href="/city-hall/departments" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Аппарат примэрии</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Международное сотрудничество</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Личности г.Твардица</Link>
                  <Link href="/news" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Новости г.Твардица</Link>
                </div>
              )}
            </li>

            {/* Mobile Гор.Совет */}
            <li>
              <button 
                className="flex items-center justify-between w-full px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => toggleMobileSection('council')}
              >
                Гор.Совет
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpenSection === 'council' ? 'rotate-180' : ''}`} />
              </button>
              {mobileMenuOpenSection === 'council' && (
                <div className="bg-[#1a1a1a] flex flex-col">
                  <Link href="/council" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Городской совет</Link>
                  <Link href="/council/decisions" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Решения</Link>
                  <Link href="/council/meetings" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Заседания (Video)</Link>
                </div>
              )}
            </li>

            {/* Mobile Подведомственные учреждения */}
            <li>
              <button 
                className="flex items-center justify-between w-full px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => toggleMobileSection('structure')}
              >
                Подведомственные учреждения
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpenSection === 'structure' ? 'rotate-180' : ''}`} />
              </button>
              {mobileMenuOpenSection === 'structure' && (
                <div className="bg-[#1a1a1a] flex flex-col">
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>КСК им. П.М. Парликова</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Музей</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Школа искусств</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Библиотеки</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Реабилитационный центр</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Социальный центр</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Детский сад</Link>
                </div>
              )}
            </li>

            {/* Mobile Образование */}
            <li>
              <button 
                className="flex items-center justify-between w-full px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => toggleMobileSection('education')}
              >
                Образование
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpenSection === 'education' ? 'rotate-180' : ''}`} />
              </button>
              {mobileMenuOpenSection === 'education' && (
                <div className="bg-[#1a1a1a] flex flex-col">
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Теоретический лицей</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Музыкальный колледж</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>ДЮСШ спорт</Link>
                </div>
              )}
            </li>

            {/* Mobile Твардисан */}
            <li>
              <button 
                className="flex items-center justify-between w-full px-6 py-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                onClick={() => toggleMobileSection('tvardisan')}
              >
                Твардисан
                <ChevronDown className={`w-5 h-5 transition-transform ${mobileMenuOpenSection === 'tvardisan' ? 'rotate-180' : ''}`} />
              </button>
              {mobileMenuOpenSection === 'tvardisan' && (
                <div className="bg-[#1a1a1a] flex flex-col">
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>О предприятии</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Услуги</Link>
                  <Link href="#" className="pl-10 pr-6 py-3 border-b border-white/5 hover:text-[#4d9e38]" onClick={toggleMobileMenu}>Контакты</Link>
                </div>
              )}
            </li>

          </ul>
          
          <div className="p-6 mt-auto">
            <div className="flex items-center gap-4">
               <a href="https://www.facebook.com/primariatvardita" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#4d9e38]">
                 <FacebookIcon className="w-6 h-6" />
               </a>
               <a href="https://www.youtube.com/@primariatvardita" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#4d9e38]">
                 <YoutubeIcon className="w-6 h-6" />
               </a>
            </div>
            <div className="mt-6 flex gap-2 text-sm font-semibold">
              <button className="text-[#4d9e38] hover:underline px-3 py-1 bg-white/5 rounded-md">RU</button>
              <button className="text-white hover:text-[#4d9e38] hover:underline px-3 py-1 hover:bg-white/5 rounded-md">RO</button>
              <button className="text-white hover:text-[#4d9e38] hover:underline px-3 py-1 hover:bg-white/5 rounded-md">BG</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Main Content ═══ */}
      <main className="flex-grow">
        {children}
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="bg-heading text-white mt-16">
        {/* Main footer content */}
        <div className="container-site py-12 md:py-16">
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
          <div className="container-site py-5 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 text-center md:text-left gap-3 md:gap-0">
            <span>© {new Date().getFullYear()} Примэрия города Твардица. Все права защищены.</span>
            <Link href="/login" className="hover:text-white transition-colors">
              Вход для администраторов
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
