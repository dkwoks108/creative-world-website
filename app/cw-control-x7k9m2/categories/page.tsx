import React from 'react';
import { FolderTree, Plus, Edit, Trash2 } from 'lucide-react';
import { db } from '@/lib/db';
import { CategoryManagerClient } from '@/components/admin/CategoryManagerClient';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return <CategoryManagerClient initialCategories={categories} />;
}
