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

export async function createCategoryAction(name: string, description?: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  if (!name.trim()) return { success: false, error: 'Category name is required.' };

  const slug = slugify(name);
  const existing = await db.category.findFirst({
    where: { OR: [{ name: name.trim() }, { slug }] },
  });

  if (existing) {
    return { success: false, error: 'A category with this name already exists.' };
  }

  const category = await db.category.create({
    data: {
      name: name.trim(),
      slug,
      description: description?.trim() || null,
    },
  });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'CREATE_CATEGORY',
      resource: 'Category',
      resourceId: category.id,
      details: `Created category ${category.name}`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/categories');
  return { success: true, category };
}

export async function updateCategoryAction(
  id: string,
  name: string,
  description?: string,
  isArchived?: boolean
) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const slug = slugify(name);

  const category = await db.category.update({
    where: { id },
    data: {
      name: name.trim(),
      slug,
      description: description?.trim() || null,
      isArchived: isArchived ?? false,
    },
  });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'UPDATE_CATEGORY',
      resource: 'Category',
      resourceId: id,
      details: `Updated category ${category.name}`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/categories');
  return { success: true, category };
}

export async function deleteCategoryAction(id: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  // Check if published posts still rely on this category
  const count = await db.post.count({
    where: { categoryId: id, status: 'PUBLISHED' },
  });

  if (count > 0) {
    return {
      success: false,
      error: `Cannot delete category: ${count} published post(s) currently belong to it. Please reassign them first.`,
    };
  }

  await db.category.delete({ where: { id } });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'DELETE_CATEGORY',
      resource: 'Category',
      resourceId: id,
      details: `Deleted category ${id}`,
    },
  });

  revalidatePath('/cw-control-x7k9m2/categories');
  return { success: true };
}
