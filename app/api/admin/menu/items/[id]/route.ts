import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { invalidateCache } from '@/shared/lib/redis';
import { requireAdmin } from '@/features/auth/lib/require-admin';
import { menuItemPatchSchema } from '@/features/menu/admin-schema';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = menuItemPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Ошибка валидации', issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  try {
    await prisma.menuItem.update({ where: { id: params.id }, data: parsed.data });
  } catch {
    return NextResponse.json({ error: 'Блюдо не найдено' }, { status: 404 });
  }

  await invalidateCache('menu:v1');
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin(_request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await prisma.menuItem.delete({ where: { id: params.id } });
  } catch (e) {
    const code = (e as { code?: string }).code;
    if (code === 'P2025') {
      return NextResponse.json({ error: 'Блюдо не найдено' }, { status: 404 });
    }
    if (code === 'P2003') {
      // FK-ограничение: на блюдо ссылаются строки уже оформленных заказов —
      // удалять историю нельзя, вместо этого предлагаем скрыть блюдо
      return NextResponse.json(
        { error: 'Блюдо есть в старых заказах — нельзя удалить. Отметьте его недоступным.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Не удалось удалить блюдо' }, { status: 500 });
  }

  await invalidateCache('menu:v1');
  return NextResponse.json({ ok: true });
}
