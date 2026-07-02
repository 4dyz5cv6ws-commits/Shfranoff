import { NextRequest, NextResponse } from 'next/server';
import { orderSchema } from '@/features/orders/schema';
import { createOrder } from '@/features/orders/lib/create-order';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный JSON' }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Ошибка валидации', issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const result = await createOrder(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  return NextResponse.json(
    {
      orderId: result.order.id,
      status: result.order.status,
      total: result.order.total,
      estimatedMinutes: result.order.deliveryType === 'delivery' ? 60 : 30
    },
    { status: 201 }
  );
}
