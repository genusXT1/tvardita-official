import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Newspaper, Bell, FileText, MessageSquare, FolderTree, Settings, ExternalLink, LogOut } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Newspaper, label: 'Новости', href: '/admin/news' },
  { icon: Bell, label: 'Объявления', href: '/admin/announcements' },
  { icon: FileText, label: 'Документы', href: '/admin/documents' },
  { icon: FolderTree, label: 'Категории', href: '/admin/categories' },
  { icon: MessageSquare, label: 'Обращения', href: '/admin/appeals' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-section">

      {/* ═══ Sidebar ═══ */}
      <aside className="w-64 bg-white border-r border-border-light flex flex-col shadow-sm">
        {/* Logo */}
        <div className="p-5 border-b border-border-light">
          <Link href="/admin" className="flex items-center gap-3">
            <img src="/logo.png" alt="Герб" className="h-9 w-auto" />
            <div>
              <div className="font-bold text-heading text-sm leading-tight">Твардица</div>
              <div className="text-xs text-text-muted">Админ-панель</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground-muted hover:bg-primary-light hover:text-primary transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="p-3 border-t border-border-light space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-foreground-muted hover:bg-primary-light hover:text-primary transition-colors">
            <ExternalLink className="w-5 h-5" />
            На сайт
          </Link>
        </div>
      </aside>

      {/* ═══ Main area ═══ */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-border-light flex items-center justify-between px-8 shadow-sm">
          <div className="font-semibold text-heading text-lg">Панель управления</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground-muted">Администратор</span>
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
