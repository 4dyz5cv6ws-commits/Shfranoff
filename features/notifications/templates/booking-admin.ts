import { Booking } from '@/features/booking/types';
import { emailLayout, row, table } from './layout';

export function newBookingAdminEmail(booking: Booking): { subject: string; html: string } {
  const body = table(
    row('Дата', booking.date) +
      row('Время', booking.time) +
      row('Гостей', String(booking.guests)) +
      row('Клиент', booking.customerName) +
      row('Телефон', booking.phone) +
      (booking.comment ? row('Комментарий', booking.comment) : '')
  );

  return {
    subject: `Новая бронь №${booking.id} — ${booking.date} ${booking.time}`,
    html: emailLayout(`Новая бронь на ${booking.date}`, body)
  };
}
