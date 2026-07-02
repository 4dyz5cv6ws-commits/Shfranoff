import { prisma } from '@/shared/lib/prisma';

export default async function AdminAnalyticsPage() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [recentOrders, topLines] = await Promise.all([
    prisma.order.findMany({
      where: { createdAt: { gte: sevenDaysAgo }, status: { not: 'CANCELLED' } },
      select: { total: true, createdAt: true }
    }),
    prisma.orderLine.groupBy({
      by: ['name'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5
    })
  ]);

  const revenueByDay = new Map<string, number>();
  for (const order of recentOrders) {
    const day = order.createdAt.toISOString().slice(0, 10);
    revenueByDay.set(day, (revenueByDay.get(day) ?? 0) + order.total);
  }

  const totalRevenue = recentOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <h1 className="font-display text-2xl text-cream">Аналитика</h1>
      <p className="mt-1 text-sm text-muted">За последние 7 дней</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="font-display text-3xl text-saffron">{totalRevenue} ₽</div>
          <div className="mt-1 text-sm text-muted">Выручка ({recentOrders.length} заказов)</div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="font-display text-3xl text-saffron">
            {recentOrders.length ? Math.round(totalRevenue / recentOrders.length) : 0} ₽
          </div>
          <div className="mt-1 text-sm text-muted">Средний чек</div>
        </div>
      </div>

      <h2 className="mb-3 mt-8 font-display text-lg text-cream">Топ-5 блюд по количеству</h2>
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[400px] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Блюдо</th>
              <th className="px-4 py-3">Продано, шт</th>
            </tr>
          </thead>
          <tbody>
            {topLines.map((line) => (
              <tr key={line.name} className="border-t border-line">
                <td className="px-4 py-3 text-cream/80">{line.name}</td>
                <td className="px-4 py-3 text-saffron">{line._sum.quantity}</td>
              </tr>
            ))}
            {topLines.length === 0 && (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-muted">
                  Данных пока недостаточно
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
