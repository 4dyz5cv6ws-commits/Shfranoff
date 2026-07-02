import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { loginSchema } from '@/features/auth/schema';
import { verifyPassword } from '@/features/auth/lib/password';
import { signAdminToken } from '@/features/auth/lib/jwt';
import { setSessionCookie } from '@/features/auth/lib/session';
import {
  isLoginRateLimited,
  registerFailedLogin,
  clearLoginAttempts
} from '@/features/auth/lib/rate-limit';

const GENERIC_ERROR = 'Неверный email или пароль';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Некорректный JSON' }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 422 });
  }

  const { email, password } = parsed.data;

  if (await isLoginRateLimited(email)) {
    return NextResponse.json(
      { error: 'Слишком много попыток. Попробуйте через 15 минут.' },
      { status: 429 }
    );
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });

  // Намеренно не различаем "нет такого email" и "неверный пароль" в ответе —
  // чтобы не давать атакующему подтверждение существования аккаунта.
  const passwordOk = admin ? await verifyPassword(password, admin.passwordHash) : false;

  if (!admin || !passwordOk) {
    await registerFailedLogin(email);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  await clearLoginAttempts(email);

  const token = await signAdminToken({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role
  });

  const response = NextResponse.json({ ok: true, name: admin.name });
  setSessionCookie(response, token);
  return response;
}
