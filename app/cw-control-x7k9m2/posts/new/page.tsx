import React from 'react';
import { db } from '@/lib/db';
import { getAdminPanelPath } from '@/lib/session';
import { PostForm } from '@/components/admin/PostForm';

export const revalidate = 0;

export default async function NewPostPage() {
  const adminPath = getAdminPanelPath();

  const [categories, authors] = await Promise.all([
    db.category.findMany({ orderBy: { name: 'asc' } }),
    db.author.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return <PostForm categories={categories} authors={authors} adminPath={adminPath} />;
}
