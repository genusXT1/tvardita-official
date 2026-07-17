import AppealForm from './AppealForm';
import Link from 'next/link';
import { ChevronRight, AlertCircle, Shield } from 'lucide-react';

export default function AppealsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="bg-section border-b border-border-light">
        <div className="container-site py-8">
          <div className="flex items-center text-sm text-foreground-muted mb-4 gap-2">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-heading font-medium">Обращения граждан</span>
          </div>
          <h1 className="text-3xl font-extrabold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
            Электронная приёмная
          </h1>
          <p className="text-foreground-muted mt-2 max-w-2xl">
            Отправьте официальное обращение, жалобу или предложение в Примэрию города Твардица
          </p>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="max-w-3xl mx-auto">

          {/* Info block */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-800 mb-2">Порядок рассмотрения обращений</h3>
              <p className="text-blue-700 text-sm leading-relaxed mb-1">
                Все обращения рассматриваются в соответствии с Законом Республики Молдова о подаче петиций.
              </p>
              <p className="text-blue-700 text-sm leading-relaxed">
                Срок рассмотрения составляет до <strong>30 рабочих дней</strong>. Анонимные обращения не рассматриваются.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl border border-border-light p-8 md:p-10 shadow-sm">
            <h2 className="text-xl font-bold text-heading mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Форма обращения
            </h2>
            <AppealForm />
          </div>
        </div>
      </div>
    </>
  );
}
