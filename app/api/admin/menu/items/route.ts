import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { invalidateCache } from '@/shared/lib/redis';
import { requireAdmin } from '@/features/auth/lib/require-admin';
import { menuItemAdminSchema } from '@/features/menu/admin-schema';

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = menuItemAdminSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Ошибка валидации', issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const item = await prisma.menuItem.create({
    data: { ...parsed.data, tags: parsed.data.tags ?? [] }
  });

  await invalidateCache('menu:v1');

  return NextResponse.json({ id: item.id }, { status: 201 });
}
