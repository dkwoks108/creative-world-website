import React from 'react';
import { db } from '@/lib/db';
import { PostListClient } from '@/components/admin/PostListClient';

export const revalidate = 0;

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({
    include: {
      category: true,
      author: true,
      tags: {
        include: { tag: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const categories = await db.category.findMany({
    where: { isArchived: false },
    orderBy: { name: 'asc' },
  });

  const authors = await db.author.findMany({
    orderBy: { name: 'asc' },
  });

  return <PostListClient initialPosts={posts} categories={categories} authors={authors} />;
}
