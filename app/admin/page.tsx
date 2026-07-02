import { prisma } from '@/shared/lib/prisma';

export default async function AdminDashboardPage() {
  const todayISO = new Date().toISOString().slice(0, 10);

  const [ordersToday, newOrders, bookingsToday, newBanquetRequests, menuItemsCount, avgRating] =
    await Promise.all([
      prisma.order.count({ where: { createdAt: { gte: new Date(`${todayISO}T00:00:00.000Z`) } } }),
      prisma.order.count({ where: { status: 'NEW' } }),
      prisma.booking.count({ where: { date: todayISO, status: 'CONFIRMED' } }),
      prisma.banquetRequest.count({ where: { status: 'NEW' } }),
      prisma.menuItem.count({ where: { isAvailable: true } }),
      prisma.review.aggregate({ _avg: { rating: true } })
    ]);

  const cards = [
    { label: 'Заказов сегодня', value: ordersToday },
    { label: 'Новых заказов в очереди', value: newOrders },
    { label: 'Броней на сегодня', value: bookingsToday },
    { label: 'Новых банкетных заявок', value: newBanquetRequests },
    { label: 'Блюд в меню', value: menuItemsCount },
    { label: 'Средний рейтинг', value: (avgRating._avg.rating ?? 0).toFixed(1) }
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-cream">Обзор</h1>
      <p className="mt-1 text-sm text-muted">Ключевые цифры на сегодня, {formatDateRu(todayISO)}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-line bg-surface p-6">
            <div className="font-display text-3xl text-saffron">{card.value}</div>
            <div className="mt-1 text-sm text-muted">{card.label}</div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted">
        Статусы заказов/броней/банкетов и доступность блюд меняются прямо в
        соответствующих разделах слева — изменения применяются сразу.
      </p>
    </div>
  );
}

function formatDateRu(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}
