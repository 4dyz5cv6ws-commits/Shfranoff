import { BanquetRequest, EVENT_TYPE_LABELS, BUDGET_LABELS } from '@/features/banquet/types';
import { emailLayout, row, table } from './layout';

export function newBanquetAdminEmail(request: BanquetRequest): { subject: string; html: string } {
  const body = table(
    row('Мероприятие', EVENT_TYPE_LABELS[request.eventType]) +
      row('Дата', request.date) +
      row('Гостей', String(request.guests)) +
      (request.budget ? row('Бюджет', BUDGET_LABELS[request.budget]) : '') +
      row('Клиент', request.customerName) +
      row('Телефон', request.phone) +
      (request.email ? row('Email', request.email) : '') +
      (request.comment ? row('Пожелания', request.comment) : '')
  );

  return {
    subject: `Новая банкетная заявка №${request.id}`,
    html: emailLayout('Новая банкетная заявка', body)
  };
}

export function banquetConfirmationEmail(request: BanquetRequest): { subject: string; html: string } {
  const body = `
    <p style="color:#9C9483;font-size:14px;line-height:1.6;">
      Спасибо! Мы получили заявку на ${EVENT_TYPE_LABELS[request.eventType].toLowerCase()}
      на ${request.date}, ${request.guests} гостей. Менеджер свяжется с вами
      в течение дня по телефону ${request.phone}, чтобы обсудить детали.
    </p>
    <p style="color:#9C9483;font-size:12px;margin-top:16px;">Номер заявки: ${request.id}</p>
  `;

  return {
    subject: 'Заявка на банкет получена — Шафраноф',
    html: emailLayout('Заявка получена', body)
  };
}
