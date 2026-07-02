import { prisma } from '@/shared/lib/prisma';
import { OrderStatusSelect } from '@/features/orders/components/admin/OrderStatusSelect';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-cream">Заказы</h1>
      <p className="mt-1 text-sm text-muted">Последние 50 заказов</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">№</th>
              <th className="px-4 py-3">Клиент</th>
              <th className="px-4 py-3">Способ</th>
              <th className="px-4 py-3">Сумма</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3">Создан</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-line">
                <td className="px-4 py-3 text-cream">{order.publicId}</td>
                <td className="px-4 py-3 text-cream/80">
                  {order.customerName}
                  <div className="text-xs text-muted">{order.phone}</div>
                </td>
                <td className="px-4 py-3 text-cream/80">
                  {order.deliveryType === 'DELIVERY' ? 'Доставка' : 'Самовывоз'}
                </td>
                <td className="px-4 py-3 text-saffron">{order.total} ₽</td>
                <td className="px-4 py-3">
                  <OrderStatusSelect orderId={order.id} status={order.status} />
                </td>
                <td className="px-4 py-3 text-muted">
                  {new Date(order.createdAt).toLocaleString('ru-RU')}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Заказов пока нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
