import { prisma } from '@/shared/lib/prisma';
import { Booking } from '../types';

export async function getBookingsForDate(date: string): Promise<Pick<Booking, 'time' | 'guests'>[]> {
  return prisma.booking.findMany({
    where: { date, status: 'CONFIRMED' },
    select: { time: true, guests: true }
  });
}

