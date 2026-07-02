import { sendEmail } from '@/shared/lib/mailer';
import { Order } from '@/features/orders/types';
import { Booking } from '@/features/booking/types';
import { BanquetRequest } from '@/features/banquet/types';
import { newOrderAdminEmail } from '../templates/order-admin';
import { newBookingAdminEmail } from '../templates/booking-admin';
import { newBanquetAdminEmail, banquetConfirmationEmail } from '../templates/banquet';

function notifyEmail(): string | null {
  return process.env.RESTAURANT_NOTIFY_EMAIL ?? null;
}

export async function notifyNewOrder(order: Order): Promise<void> {
  const to = notifyEmail();
  if (!to) return;
  const { subject, html } = newOrderAdminEmail(order);
  await sendEmail({ to, subject, html });
}

export async function notifyNewBooking(booking: Booking): Promise<void> {
  const to = notifyEmail();
  if (!to) return;
  const { subject, html } = newBookingAdminEmail(booking);
  await sendEmail({ to, subject, html });
}

export async function notifyNewBanquetRequest(request: BanquetRequest): Promise<void> {
  const to = notifyEmail();
  if (to) {
    const { subject, html } = newBanquetAdminEmail(request);
    await sendEmail({ to, subject, html });
  }

  // Гостю отправляем подтверждение, только если он оставил email (поле необязательное)
  if (request.email) {
    const { subject, html } = banquetConfirmationEmail(request);
    await sendEmail({ to: request.email, subject, html });
  }
}
