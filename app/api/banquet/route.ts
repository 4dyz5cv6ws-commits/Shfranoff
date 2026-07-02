import { NextRequest, NextResponse } from 'next/server';
import { banquetSchema } from '@/features/banquet/schema';
import { createBanquetRequest } from '@/features/banquet/lib/create-banquet-request';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный JSON' }, { status: 400 });
  }

  const parsed = banquetSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Ошибка валидации', issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const request_ = await createBanquetRequest(parsed.data);

  return NextResponse.json({ requestId: request_.id }, { status: 201 });
}
