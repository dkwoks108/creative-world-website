import { NextResponse } from 'next/server';
import { deleteAdminSession, getAdminPanelPath } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST() {
  await deleteAdminSession();
  const adminPath = getAdminPanelPath();
  return NextResponse.redirect(new URL(`${adminPath}/login`, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), 303);
}
