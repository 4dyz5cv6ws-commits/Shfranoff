import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/shared/lib/prisma';
import { requireAdmin } from '@/features/auth/lib/require-admin';

const schema = z.object({ status: z.enum(['NEW', 'CONTACTED', 'CONFIRMED', 'DECLINED']) });

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Некорректный статус' }, { status: 422 });
  }

  try {
    await prisma.banquetRequest.update({
      where: { id: params.id },
      data: { status: parsed.data.status }
    });
  } catch {
    return NextResponse.json({ error: 'Заявка не найдена' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
