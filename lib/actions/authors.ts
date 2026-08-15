'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db';
import { getAdminSession } from '../session';

export async function createAuthorAction(
  name: string,
  role: string,
  bio?: string,
  avatarUrl?: string
) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  if (!name.trim() || !role.trim()) {
    return { success: false, error: 'Name and role are required.' };
  }

  const author = await db.author.create({
    data: {
      name: name.trim(),
      role: role.trim(),
      bio: bio?.trim() || null,
      avatarUrl: avatarUrl || null,
    },
  });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'CREATE_AUTHOR',
      resource: 'Author',
      resourceId: author.id,
      details: `Created author ${author.name}`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/authors');
  return { success: true, author };
}

export async function updateAuthorAction(
  id: string,
  name: string,
  role: string,
  bio?: string,
  avatarUrl?: string
) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const author = await db.author.update({
    where: { id },
    data: {
      name: name.trim(),
      role: role.trim(),
      bio: bio?.trim() || null,
      avatarUrl: avatarUrl || null,
    },
  });

  revalidatePath('/cw-control-x7k9m2/authors');
  return { success: true, author };
}

export async function deleteAuthorAction(id: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  await db.author.delete({ where: { id } });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'DELETE_AUTHOR',
      resource: 'Author',
      resourceId: id,
      details: `Deleted author ${id}`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/authors');
  return { success: true };
}
