import React from 'react';
import { db } from '@/lib/db';
import { AuthorManagerClient } from '@/components/admin/AuthorManagerClient';

export const revalidate = 0;

export default async function AdminAuthorsPage() {
  const authors = await db.author.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return <AuthorManagerClient initialAuthors={authors} />;
}
