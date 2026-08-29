import { NextResponse } from 'next/server';
import { getSiteSettings, getHeaderNavigation } from '@/lib/site-settings';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const navigation = await getHeaderNavigation();

    return NextResponse.json({
      success: true,
      settings,
      navigation,
    });
  } catch (error) {
    console.error('API /site-data error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site data' },
      { status: 500 }
    );
  }
}
