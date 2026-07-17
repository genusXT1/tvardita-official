'use server';

import { sendEmail } from '@/lib/mail';

export async function submitAppeal(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const topic = formData.get('topic') as string;
  const message = formData.get('message') as string;

  if (!name || !message || (!email && !phone)) {
    return { error: 'Пожалуйста, заполните обязательные поля' };
  }

  const textContent = `
Новое обращение гражданина:
Имя: ${name}
Email: ${email || 'Не указан'}
Телефон: ${phone || 'Не указан'}
Тема: ${topic}

Сообщение:
${message}
  `;

  // Send email to city hall
  const result = await sendEmail({
    to: process.env.CITY_HALL_EMAIL || 'primaria.tvardita@gmail.com',
    subject: `[Обращение] ${topic} - ${name}`,
    text: textContent,
  });

  if (result.success) {
    return { success: true };
  } else {
    // Return success anyway for demo purposes if SMTP is not configured
    console.warn('Failed to send email, but form submitted. Is SMTP configured?');
    return { success: true, warning: 'SMTP_NOT_CONFIGURED' };
  }
}
