import { SignJWT, jwtVerify } from 'jose';
import { cookies, headers } from 'next/headers';
import { createHash } from 'crypto';
import { db } from './db';

const COOKIE_NAME = 'cw_admin_session';
const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'creativee-world-super-secret-session-key-2026-jaipur-growth'
);

const IDLE_TIMEOUT_MINUTES = parseInt(process.env.ADMIN_IDLE_TIMEOUT_MINUTES || '30', 10);
const ABSOLUTE_MAX_HOURS = parseInt(process.env.ADMIN_SESSION_MAX_HOURS || '12', 10);

export interface AdminSessionPayload {
  sessionId: string;
  userId: string;
  email: string;
  role: string;
  exp?: number;
}

export interface ActiveSessionItem {
  id: string;
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
  absoluteExpiresAt: Date;
  userAgent: string | null;
  isCurrent: boolean;
}

function hashIP(ip: string | null): string | null {
  if (!ip) return null;
  return createHash('sha256').update(ip + (process.env.SESSION_SECRET || 'salt')).digest('hex').substring(0, 16);
}

export async function createAdminSession(userId: string, email: string, role: string): Promise<string> {
  const now = new Date();
  const idleExpiresAt = new Date(now.getTime() + IDLE_TIMEOUT_MINUTES * 60 * 1000);
  const absoluteExpiresAt = new Date(now.getTime() + ABSOLUTE_MAX_HOURS * 60 * 60 * 1000);

  // Extract client metadata safely
  let userAgent: string | null = null;
  let ipHash: string | null = null;
  try {
    const reqHeaders = headers();
    userAgent = reqHeaders.get('user-agent') || null;
    const clientIP = reqHeaders.get('x-forwarded-for')?.split(',')[0] || reqHeaders.get('x-real-ip') || null;
    ipHash = hashIP(clientIP);
  } catch {
    // Headers not available in non-request contexts
  }

  // Temporary ID for token payload link
  const sessionId = createHash('sha256').update(`${userId}-${now.getTime()}-${Math.random()}`).digest('hex');

  const token = await new SignJWT({ sessionId, userId, email, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${ABSOLUTE_MAX_HOURS}h`)
    .sign(SECRET_KEY);

  // Persist session record in DB
  await db.session.create({
    data: {
      userId,
      token,
      expiresAt: idleExpiresAt,
      lastActivityAt: now,
      absoluteExpiresAt,
      userAgent,
      ipHash,
    },
  });

  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: absoluteExpiresAt,
  });

  return token;
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    const payload = verified.payload as unknown as AdminSessionPayload;

    const dbSession = await db.session.findUnique({
      where: { token },
    });

    const now = new Date();

    if (
      !dbSession ||
      dbSession.revokedAt !== null ||
      dbSession.absoluteExpiresAt < now ||
      dbSession.expiresAt < now
    ) {
      return null;
    }

    // Sliding session update: update lastActivityAt and extend idle timeout up to absoluteExpiresAt
    const newIdleExpiresAt = new Date(
      Math.min(now.getTime() + IDLE_TIMEOUT_MINUTES * 60 * 1000, dbSession.absoluteExpiresAt.getTime())
    );

    await db.session.update({
      where: { id: dbSession.id },
      data: {
        lastActivityAt: now,
        expiresAt: newIdleExpiresAt,
      },
    });

    return {
      sessionId: dbSession.id,
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('UNAUTHORIZED: Admin session required.');
  }
  return session;
}

export async function touchAdminSession(): Promise<boolean> {
  const session = await getAdminSession();
  return !!session;
}

export async function deleteAdminSession(): Promise<void> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    try {
      await db.session.update({
        where: { token },
        data: { revokedAt: new Date() },
      }).catch(() => {});
    } catch {
      // ignore
    }
  }

  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
}

export async function getActiveSessionsForUser(userId: string): Promise<ActiveSessionItem[]> {
  const cookieStore = cookies();
  const currentToken = cookieStore.get(COOKIE_NAME)?.value;
  const now = new Date();

  const sessions = await db.session.findMany({
    where: {
      userId,
      revokedAt: null,
      absoluteExpiresAt: { gt: now },
      expiresAt: { gt: now },
    },
    orderBy: { lastActivityAt: 'desc' },
  });

  return sessions.map((s) => ({
    id: s.id,
    createdAt: s.createdAt,
    lastActivityAt: s.lastActivityAt,
    expiresAt: s.expiresAt,
    absoluteExpiresAt: s.absoluteExpiresAt,
    userAgent: s.userAgent,
    isCurrent: s.token === currentToken,
  }));
}

export async function revokeUserSession(sessionId: string, userId: string): Promise<boolean> {
  const session = await db.session.findFirst({
    where: { id: sessionId, userId },
  });

  if (!session) return false;

  await db.session.update({
    where: { id: sessionId },
    data: { revokedAt: new Date() },
  });

  return true;
}

export async function revokeAllOtherUserSessions(userId: string): Promise<number> {
  const cookieStore = cookies();
  const currentToken = cookieStore.get(COOKIE_NAME)?.value;

  const result = await db.session.updateMany({
    where: {
      userId,
      revokedAt: null,
      token: { not: currentToken || '' },
    },
    data: { revokedAt: new Date() },
  });

  return result.count;
}

export async function revokeAllUserSessions(userId: string): Promise<number> {
  const result = await db.session.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: { revokedAt: new Date() },
  });

  return result.count;
}

export function getAdminPanelPath(): string {
  const path = process.env.ADMIN_PANEL_PATH || '/cw-control-x7k9m2';
  return path.startsWith('/') ? path : `/${path}`;
}

