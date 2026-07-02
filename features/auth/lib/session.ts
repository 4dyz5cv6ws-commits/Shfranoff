import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AdminTokenPayload, verifyAdminToken } from './jwt';
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from './constants';

export { SESSION_COOKIE };

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
}

/**
 * Server-side helper для server components/pages в /admin — доп. слой
 * защиты поверх middleware (defense in depth): даже если middleware
 * когда-нибудь пропустят или неправильно настроят matcher, страница
 * всё равно сама проверит сессию перед рендером данных.
 */
export async function getCurrentAdmin(): Promise<AdminTokenPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
