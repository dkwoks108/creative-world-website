'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db';
import { getAdminSession } from '../session';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function createTagAction(name: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  if (!name.trim()) return { success: false, error: 'Tag name is required.' };

  const slug = slugify(name);
  const existing = await db.tag.findFirst({
    where: { OR: [{ name: name.trim() }, { slug }] },
  });

  if (existing) {
    return { success: false, error: 'A tag with this name already exists.', tag: existing };
  }

  const tag = await db.tag.create({
    data: {
      name: name.trim(),
      slug,
    },
  });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'CREATE_TAG',
      resource: 'Tag',
      resourceId: tag.id,
      details: `Created tag ${tag.name}`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/tags');
  return { success: true, tag };
}

export async function updateTagAction(id: string, name: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const slug = slugify(name);
  const tag = await db.tag.update({
    where: { id },
    data: { name: name.trim(), slug },
  });

  revalidatePath('/cw-control-x7k9m2/tags');
  return { success: true, tag };
}

export async function deleteTagAction(id: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  await db.tag.delete({ where: { id } });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'DELETE_TAG',
      resource: 'Tag',
      resourceId: id,
      details: `Deleted tag ${id}`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/tags');
  return { success: true };
}
