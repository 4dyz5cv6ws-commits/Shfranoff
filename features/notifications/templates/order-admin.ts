import { Order } from '@/features/orders/types';
import { emailLayout, row, table } from './layout';

export function newOrderAdminEmail(order: Order): { subject: string; html: string } {
  const itemsRows = order.lines
    .map((l) => row(`${l.name} × ${l.quantity}`, `${l.price * l.quantity} ₽`))
    .join('');

  const body = `
    ${table(
      row('Клиент', order.customerName) +
        row('Телефон', order.phone) +
        row('Способ', order.deliveryType === 'delivery' ? 'Доставка' : 'Самовывоз') +
        (order.address ? row('Адрес', order.address) : '') +
        (order.comment ? row('Комментарий', order.comment) : '')
    )}
    <div style="margin:16px 0;border-top:1px solid #2A2419;"></div>
    ${table(itemsRows)}
    <div style="margin:16px 0;border-top:1px solid #2A2419;"></div>
    ${table(row('Итого', `<span style="color:#D89B3C;">${order.total} ₽</span>`))}
  `;

  return {
    subject: `Новый заказ №${order.id} — ${order.total} ₽`,
    html: emailLayout(`Новый заказ №${order.id}`, body)
  };
}
