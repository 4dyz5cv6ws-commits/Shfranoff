import { prisma } from '@/shared/lib/prisma';
import { CancelBookingButton } from '@/features/booking/components/admin/CancelBookingButton';

export default async function AdminBookingsPage() {
  const todayISO = new Date().toISOString().slice(0, 10);

  const bookings = await prisma.booking.findMany({
    where: { date: { gte: todayISO }, status: 'CONFIRMED' },
    orderBy: [{ date: 'asc' }, { time: 'asc' }],
    take: 100
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-cream">Брони</h1>
      <p className="mt-1 text-sm text-muted">Предстоящие подтверждённые брони</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Время</th>
              <th className="px-4 py-3">Гостей</th>
              <th className="px-4 py-3">Клиент</th>
              <th className="px-4 py-3">Комментарий</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-line">
                <td className="px-4 py-3 text-cream/80">{formatDateRu(booking.date)}</td>
                <td className="px-4 py-3 text-cream">{booking.time}</td>
                <td className="px-4 py-3 text-cream/80">{booking.guests}</td>
                <td className="px-4 py-3 text-cream/80">
                  {booking.customerName}
                  <div className="text-xs text-muted">{booking.phone}</div>
                </td>
                <td className="px-4 py-3 text-muted">{booking.comment ?? '—'}</td>
                <td className="px-4 py-3 text-right">
                  <CancelBookingButton bookingId={booking.id} />
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Предстоящих броней нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDateRu(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}
