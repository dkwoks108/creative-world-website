import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { getAdminPanelPath } from '@/lib/session';
import { InquiryDetailClient } from '@/components/admin/InquiryDetailClient';

export const revalidate = 0;

interface InquiryDetailPageProps {
  params: {
    id: string;
  };
}

export default async function InquiryDetailPage({ params }: InquiryDetailPageProps) {
  const adminPath = getAdminPanelPath();

  const inquiry = await db.inquiry.findUnique({
    where: { id: params.id },
    include: {
      notes: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!inquiry) {
    notFound();
  }

  return <InquiryDetailClient inquiry={inquiry} adminPath={adminPath} />;
}
