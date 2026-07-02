import { redis } from '@/shared/lib/redis';

const MAX_ATTEMPTS = 5;
const WINDOW_SECONDS = 15 * 60;

export async function isLoginRateLimited(email: string): Promise<boolean> {
  try {
    const key = `login-attempts:${email.toLowerCase()}`;
    const attempts = await redis.get(key);
    return Number(attempts ?? 0) >= MAX_ATTEMPTS;
  } catch {
    return false; // Redis недоступен — не блокируем логин из-за инфраструктуры
  }
}

export async function registerFailedLogin(email: string): Promise<void> {
  try {
    const key = `login-attempts:${email.toLowerCase()}`;
    const attempts = await redis.incr(key);
    if (attempts === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }
  } catch {
    // не критично
  }
}

export async function clearLoginAttempts(email: string): Promise<void> {
  try {
    await redis.del(`login-attempts:${email.toLowerCase()}`);
  } catch {
    // не критично
  }
}
