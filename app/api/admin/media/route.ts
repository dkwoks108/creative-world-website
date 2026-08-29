import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET() {
  try {
    const mediaItems = await prisma.post.findMany({
      select: {
        id: true,
        featuredImage: true,
        featuredImageAlt: true,
        title: true,
        createdAt: true,
      },
      where: {
        featuredImage: { not: null },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Provide default media assets if empty
    const mediaList = [
      { id: 'm1', url: '/hero-poster.jpg', title: 'Agency Hero Poster', altText: 'Creativee World Digital Agency', mediaType: 'image' },
      { id: 'm2', url: '/logo-symbol.png', title: 'Agency Logo Mark', altText: 'Creativee Logo Symbol', mediaType: 'image' },
      { id: 'm3', url: '/work-case-1.jpg', title: 'Case Study Preview', altText: 'Luxury Real Estate Web Case', mediaType: 'image' },
      ...mediaItems.map((item) => ({
        id: item.id,
        url: item.featuredImage || '',
        title: item.title,
        altText: item.featuredImageAlt || item.title,
        mediaType: 'image',
      })),
    ];

    return NextResponse.json({ success: true, media: mediaList });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch media library' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, title, altText, caption } = body;
    if (!url) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }
    return NextResponse.json({
      success: true,
      item: { id: `m-${Date.now()}`, url, title: title || 'Uploaded Asset', altText, caption },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to upload media asset' }, { status: 500 });
  }
}
