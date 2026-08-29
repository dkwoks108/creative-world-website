import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, caseStudies });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch case studies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, client, industry, summary, content, challenge, solution, results, image, status } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, error: 'Title and slug are required' }, { status: 400 });
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        title,
        slug,
        client,
        industry,
        summary,
        content,
        challenge,
        solution,
        results,
        image,
        status: status || 'Published',
      },
    });

    return NextResponse.json({ success: true, caseStudy });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create case study' }, { status: 500 });
  }
}
