import { TimeSlot } from '../types';
import { generateSlotsForDate } from './time-slots';
import { getBookingsForDate } from './bookings-store';

const HALL_CAPACITY = 60; // вместимость зала, гостей одновременно

export async function getAvailableSlots(date: string, guests: number): Promise<TimeSlot[]> {
  const slots = generateSlotsForDate(date);
  const dayBookings = await getBookingsForDate(date);

  return slots.map((time) => {
    const bookedGuests = dayBookings
      .filter((b) => b.time === time)
      .reduce((sum, b) => sum + b.guests, 0);

    return { time, available: bookedGuests + guests <= HALL_CAPACITY };
  });
}

export async function hasCapacity(date: string, time: string, guests: number): Promise<boolean> {
  const dayBookings = await getBookingsForDate(date);
  const bookedGuests = dayBookings
    .filter((b) => b.time === time)
    .reduce((sum, b) => sum + b.guests, 0);

  return bookedGuests + guests <= HALL_CAPACITY;
}

