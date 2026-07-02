import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/features/booking/schema';
import { createBooking } from '@/features/booking/lib/create-booking';
import { getAvailableSlots } from '@/features/booking/lib/availability';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const guests = Number(searchParams.get('guests') ?? '2');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Некорректная дата' }, { status: 400 });
  }

  const slots = await getAvailableSlots(date, guests);
  return NextResponse.json({ slots });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный JSON' }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Ошибка валидации', issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const result = await createBooking(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  return NextResponse.json(
    {
      bookingId: result.booking.id,
      date: result.booking.date,
      time: result.booking.time,
      guests: result.booking.guests
    },
    { status: 201 }
  );
}
