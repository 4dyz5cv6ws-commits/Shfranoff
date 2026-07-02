import { randomUUID } from 'crypto';
import { prisma } from '@/shared/lib/prisma';
import { BookingInput } from '../schema';
import { Booking } from '../types';
import { hasCapacity } from './availability';
import { notifyNewBooking } from '@/features/notifications/lib/notify';

export type CreateBookingResult = { ok: true; booking: Booking } | { ok: false; error: string };

// Примечание: проверка вместимости и запись брони — два отдельных запроса,
// не одна атомарная транзакция. Для нынешней нагрузки (ресторан, не биржа)
// риск гонки двух броней на последний стол в одну секунду пренебрежимо мал,
// но в модуле "Admin panel" стоит перейти на SERIALIZABLE-транзакцию Prisma,
// если это станет проблемой на практике.
export async function createBooking(input: BookingInput): Promise<CreateBookingResult> {
  if (!(await hasCapacity(input.date, input.time, input.guests))) {
    return { ok: false, error: 'Это время только что заняли. Выберите другое.' };
  }

  const created = await prisma.booking.create({
    data: {
      publicId: randomUUID().slice(0, 8).toUpperCase(),
      date: input.date,
      time: input.time,
      guests: input.guests,
      customerName: input.customerName,
      phone: input.phone,
      comment: input.comment,
      status: 'CONFIRMED'
    }
  });

  const booking: Booking = {
    id: created.publicId,
    createdAt: created.createdAt.toISOString(),
    date: created.date,
    time: created.time,
    guests: created.guests,
    customerName: created.customerName,
    phone: created.phone,
    comment: created.comment ?? undefined,
    status: 'confirmed'
  };

  await notifyNewBooking(booking);

  return { ok: true, booking };
}

