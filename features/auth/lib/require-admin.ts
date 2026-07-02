import { NextRequest } from 'next/server';
import { AdminTokenPayload, verifyAdminToken } from './jwt';
import { SESSION_COOKIE } from './constants';

export async function requireAdmin(request: NextRequest): Promise<AdminTokenPayload | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
