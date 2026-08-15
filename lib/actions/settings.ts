'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db';
import {
  requireAdmin,
  revokeUserSession,
  revokeAllOtherUserSessions,
  getActiveSessionsForUser,
} from '../session';
import { verifyPassword, hashPassword } from '../auth';

export async function changePasswordAction(formData: FormData) {
  const session = await requireAdmin();

  const currentPassword = formData.get('currentPassword')?.toString() || '';
  const newPassword = formData.get('newPassword')?.toString() || '';
  const confirmPassword = formData.get('confirmPassword')?.toString() || '';

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, error: 'All fields are required.' };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, error: 'New passwords do not match.' };
  }

  if (newPassword.length < 12) {
    return { success: false, error: 'New password must be at least 12 characters long.' };
  }

  const user = await db.adminUser.findUnique({ where: { id: session.userId } });
  if (!user) {
    return { success: false, error: 'User account not found.' };
  }

  const isCurrentValid = await verifyPassword(currentPassword, user.passwordHash);
  if (!isCurrentValid) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  const newHash = await hashPassword(newPassword);

  await db.adminUser.update({
    where: { id: user.id },
    data: { passwordHash: newHash },
  });

  // Revoke all other active sessions across browsers
  const revokedCount = await revokeAllOtherUserSessions(user.id);

  await db.auditLog.create({
    data: {
      userId: user.id,
      action: 'PASSWORD_CHANGED',
      resource: 'Security',
      details: `Password changed for ${user.email}. Revoked ${revokedCount} other active sessions.`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/settings');
  return { success: true, message: `Password updated successfully. Invalidation applied to ${revokedCount} other active sessions.` };
}

export async function getActiveSessionsAction() {
  const session = await requireAdmin();
  return await getActiveSessionsForUser(session.userId);
}

export async function revokeSingleSessionAction(sessionId: string) {
  const session = await requireAdmin();
  const success = await revokeUserSession(sessionId, session.userId);

  if (success) {
    await db.auditLog.create({
      data: {
        userId: session.userId,
        action: 'SESSION_REVOKED',
        resource: 'Security',
        resourceId: sessionId,
        details: `Revoked active session ${sessionId}`,
      },
    });
    revalidatePath('/cw-control-x7k9m2/settings');
  }

  return { success };
}

export async function revokeAllOtherSessionsAction() {
  const session = await requireAdmin();
  const count = await revokeAllOtherUserSessions(session.userId);

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'REVOKE_ALL_OTHER_SESSIONS',
      resource: 'Security',
      details: `Revoked ${count} other active sessions`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/settings');
  return { success: true, count };
}
