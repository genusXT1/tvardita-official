'use client';

import { useState } from 'react';
import { submitAppeal } from '@/actions/appeals';
import { CheckCircle, Send } from 'lucide-react';

export default function AppealForm() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError('');

    const res = await submitAppeal(formData);

    setIsPending(false);

    if (res?.error) {
      setError(res.error);
    } else {
      setIsSuccess(true);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-heading mb-3">Обращение отправлено!</h3>
        <p className="text-foreground-muted max-w-md mx-auto mb-8 leading-relaxed">
          Спасибо за ваше обращение. Оно было зарегистрировано и передано в канцелярию Примэрии для рассмотрения.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="btn-outline py-2.5 px-6"
        >
          Отправить ещё одно
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-heading mb-2">ФИО *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Иванов Иван Иванович"
            className="w-full border border-border rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-heading mb-2">Телефон</label>
          <input
            type="tel"
            name="phone"
            placeholder="+373 XXX XX XXX"
            className="w-full border border-border rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-heading mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="ivan@example.com"
            className="w-full border border-border rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
          />
          <p className="text-xs text-text-muted mt-1.5">Для получения ответа по электронной почте</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-heading mb-2">Тема обращения *</label>
          <select
            name="topic"
            required
            className="w-full border border-border rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
          >
            <option value="Жалоба">Жалоба</option>
            <option value="Предложение">Предложение по благоустройству</option>
            <option value="Вопрос примару">Вопрос примару</option>
            <option value="Запрос информации">Запрос информации</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-heading mb-2">Текст обращения *</label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Опишите вашу проблему или предложение подробно..."
          className="w-full border border-border rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors resize-y"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary py-3 px-8 rounded-xl text-base disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
        >
          <Send className="w-5 h-5" />
          {isPending ? 'Отправка...' : 'Отправить обращение'}
        </button>
      </div>
    </form>
  );
}
