import { randomUUID } from 'crypto';
import { prisma } from '@/shared/lib/prisma';
import { OrderInput } from '../schema';
import { Order, OrderLine } from '../types';
import { notifyNewOrder } from '@/features/notifications/lib/notify';

const FREE_DELIVERY_FROM = 2000;
const DELIVERY_FEE = 250;

export type CreateOrderResult =
  | { ok: true; order: Order }
  | { ok: false; error: string };

export async function createOrder(input: OrderInput): Promise<CreateOrderResult> {
  const ids = input.items.map((line) => line.id);
  const menuItems = await prisma.menuItem.findMany({ where: { id: { in: ids }, isAvailable: true } });

  const lines: Array<{ menuItemId: string; name: string; price: number; quantity: number }> = [];

  for (const line of input.items) {
    const menuItem = menuItems.find((item) => item.id === line.id);
    if (!menuItem) {
      return { ok: false, error: `Блюдо "${line.id}" больше не в меню` };
    }
    lines.push({ menuItemId: menuItem.id, name: menuItem.name, price: menuItem.price, quantity: line.quantity });
  }

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const deliveryFee =
    input.deliveryType === 'pickup' || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;

  const created = await prisma.order.create({
    data: {
      publicId: randomUUID().slice(0, 8).toUpperCase(),
      status: 'NEW',
      customerName: input.customerName,
      phone: input.phone,
      deliveryType: input.deliveryType === 'delivery' ? 'DELIVERY' : 'PICKUP',
      address: input.deliveryType === 'delivery' ? input.address : undefined,
      comment: input.comment,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      lines: { create: lines }
    },
    include: { lines: true }
  });

  const order: Order = {
    id: created.publicId,
    createdAt: created.createdAt.toISOString(),
    status: 'new',
    customerName: created.customerName,
    phone: created.phone,
    deliveryType: input.deliveryType,
    address: created.address ?? undefined,
    comment: created.comment ?? undefined,
    lines: created.lines.map((l): OrderLine => ({
      id: l.menuItemId,
      name: l.name,
      price: l.price,
      quantity: l.quantity
    })),
    subtotal: created.subtotal,
    deliveryFee: created.deliveryFee,
    total: created.total
  };

  await notifyNewOrder(order);

  return { ok: true, order };
}

