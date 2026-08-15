'use server';

import { redirect } from 'next/navigation';
import { db } from '../db';
import { verifyPassword, checkRateLimit, recordFailedAttempt, resetRateLimit } from '../auth';
import { createAdminSession, deleteAdminSession, getAdminPanelPath } from '../session';

export async function loginServerAction(formData: FormData) {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  // Rate limiting check
  const rateLimitKey = `login:${email}`;
  const rateCheck = checkRateLimit(rateLimitKey);
  if (!rateCheck.allowed) {
    return {
      success: false,
      error: `Too many failed login attempts. Please try again in ${rateCheck.retryAfterSeconds} seconds.`,
    };
  }

  try {
    const adminUser = await db.adminUser.findUnique({
      where: { email },
    });

    if (!adminUser) {
      recordFailedAttempt(rateLimitKey);
      return { success: false, error: 'Invalid email or password.' };
    }

    const isMatch = await verifyPassword(password, adminUser.passwordHash);
    if (!isMatch) {
      recordFailedAttempt(rateLimitKey);
      return { success: false, error: 'Invalid email or password.' };
    }

    // Reset rate limit on success
    resetRateLimit(rateLimitKey);

    // Create session token & cookie
    await createAdminSession(adminUser.id, adminUser.email, adminUser.role);

    // Audit log
    await db.auditLog.create({
      data: {
        userId: adminUser.id,
        action: 'LOGIN',
        resource: 'Auth',
        details: `Successful login for ${adminUser.email}`,
      },
    });

    const adminPath = getAdminPanelPath();
    redirect(`${adminPath}/dashboard`);
  } catch (err) {
    // Re-throw NEXT_REDIRECT error if redirect occurred
    if (err && typeof err === 'object' && 'digest' in err && typeof (err as { digest?: string }).digest === 'string' && (err as { digest: string }).digest.startsWith('NEXT_REDIRECT')) {
      throw err;
    }
    console.error('Login action error:', err);
    return { success: false, error: 'An unexpected error occurred during login.' };
  }
}

export async function logoutServerAction() {
  await deleteAdminSession();
  const adminPath = getAdminPanelPath();
  redirect(`${adminPath}/login`);
}

export async function touchAdminSessionAction(): Promise<boolean> {
  const { touchAdminSession } = await import('../session');
  return await touchAdminSession();
}

export async function getAdminPanelPathAction(): Promise<string> {
  return getAdminPanelPath();
}
