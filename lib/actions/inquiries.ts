'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db';
import { getAdminSession } from '../session';

export async function updateInquiryStatusAction(id: string, status: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const inquiry = await db.inquiry.update({
    where: { id },
    data: { status },
  });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'UPDATE_INQUIRY_STATUS',
      resource: 'Inquiry',
      resourceId: id,
      details: `Updated status of inquiry from ${inquiry.name} to ${status}`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/inquiries');
  return { success: true };
}

export async function addInquiryNoteAction(inquiryId: string, content: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  if (!content.trim()) return { success: false, error: 'Note cannot be empty.' };

  const note = await db.inquiryNote.create({
    data: {
      inquiryId,
      content: content.trim(),
      createdBy: session.email,
    },
  });

  revalidatePath(`/cw-control-x7k9m2/inquiries/${inquiryId}`);
  return { success: true, note };
}

export async function deleteInquiryAction(id: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  await db.inquiry.delete({ where: { id } });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'DELETE_INQUIRY',
      resource: 'Inquiry',
      resourceId: id,
      details: `Deleted inquiry ${id}`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/inquiries');
  return { success: true };
}
