import React from 'react';
import { db } from '@/lib/db';
import { MediaLibraryClient } from '@/components/admin/MediaLibraryClient';

export const revalidate = 0;

export default async function AdminMediaPage() {
  const media = await db.media.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <MediaLibraryClient initialMedia={media} />;
}
