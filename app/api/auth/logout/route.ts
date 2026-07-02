import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/features/auth/lib/session';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
