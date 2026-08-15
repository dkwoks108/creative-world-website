import React from 'react';
import { db } from '@/lib/db';
import { TagManagerClient } from '@/components/admin/TagManagerClient';

export const revalidate = 0;

export default async function AdminTagsPage() {
  const tags = await db.tag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return <TagManagerClient initialTags={tags} />;
}
