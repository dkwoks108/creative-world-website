import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { getAdminPanelPath } from '@/lib/session';
import { PostForm } from '@/components/admin/PostForm';

export const revalidate = 0;

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const adminPath = getAdminPanelPath();

  const [post, categories, authors] = await Promise.all([
    db.post.findUnique({
      where: { id: params.id },
      include: { category: true, author: true },
    }),
    db.category.findMany({ orderBy: { name: 'asc' } }),
    db.author.findMany({ orderBy: { name: 'asc' } }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <PostForm
      initialData={post}
      categories={categories}
      authors={authors}
      adminPath={adminPath}
    />
  );
}
