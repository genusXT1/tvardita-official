import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ChevronRight, Building2 } from 'lucide-react';

export default function ContactsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="bg-section border-b border-border-light">
        <div className="container-site py-8">
          <div className="flex items-center text-sm text-foreground-muted mb-4 gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-heading font-medium">Контакты</span>
          </div>
          <h1 className="text-3xl font-extrabold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
            Контакты Примэрии
          </h1>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact Cards */}
          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                title: 'Адрес',
                lines: ['MD-7422, Республика Молдова', 'Тараклийский район', 'г. Твардица, ул. Фрунзе 1'],
              },
              {
                icon: Phone,
                title: 'Телефоны',
                lines: ['Приемная: +373 (291) 62-2-36', 'Бухгалтерия: +373 (291) 62-2-38'],
              },
              {
                icon: Mail,
                title: 'Электронная почта',
                lines: ['primaria.tvardita@gmail.com'],
                isLink: true,
              },
              {
                icon: Clock,
                title: 'График работы',
                lines: ['Понедельник – Пятница: 08:00 – 17:00', 'Обеденный перерыв: 12:00 – 13:00', 'Суббота, Воскресенье: Выходной'],
              },
            ].map((contact) => (
              <div key={contact.title} className="bg-white rounded-xl border border-border-light p-6 flex items-start gap-5 shadow-sm card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <contact.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-heading text-lg mb-2">{contact.title}</h3>
                  {contact.lines.map((line, i) => (
                    contact.isLink ? (
                      <a key={i} href={`mailto:${line}`} className="block text-primary hover:underline font-medium">{line}</a>
                    ) : (
                      <p key={i} className="text-foreground-muted leading-relaxed">{line}</p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-border-light flex items-center justify-center min-h-[400px] shadow-sm">
            <div className="text-center">
              <Building2 className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <p className="text-foreground-muted font-medium">Карта будет здесь</p>
              <p className="text-sm text-text-muted mt-1">г. Твардица, ул. Фрунзе 1</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
