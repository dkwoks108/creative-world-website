import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error('GET /api/admin/pages error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, template, status, seoTitle, metaDescription, ogImage } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, error: 'Title and slug are required' }, { status: 400 });
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content: typeof content === 'string' ? content : JSON.stringify(content || []),
        excerpt,
        template: template || 'default',
        status: status || 'PUBLISHED',
        seoTitle,
        metaDescription,
        ogImage,
      },
    });

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error('POST /api/admin/pages error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create page' }, { status: 500 });
  }
}
