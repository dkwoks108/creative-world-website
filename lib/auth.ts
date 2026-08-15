import bcrypt from 'bcryptjs';

// In-memory rate limiting map for login protection
interface LoginAttempt {
  count: number;
  resetAt: number;
}

const loginAttemptsMap = new Map<string, LoginAttempt>();
const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const attempt = loginAttemptsMap.get(key);

  if (!attempt) {
    return { allowed: true };
  }

  if (now > attempt.resetAt) {
    loginAttemptsMap.delete(key);
    return { allowed: true };
  }

  if (attempt.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((attempt.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  return { allowed: true };
}

export function recordFailedAttempt(key: string): void {
  const now = Date.now();
  const attempt = loginAttemptsMap.get(key);

  if (!attempt || now > attempt.resetAt) {
    loginAttemptsMap.set(key, { count: 1, resetAt: now + COOLDOWN_MS });
  } else {
    attempt.count += 1;
  }
}

export function resetRateLimit(key: string): void {
  loginAttemptsMap.delete(key);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
