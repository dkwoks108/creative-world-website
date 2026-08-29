import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, company, designation, photoUrl, rating, quote, status } = body;

    if (!clientName || !quote) {
      return NextResponse.json({ success: false, error: 'Client name and quote are required' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        company,
        designation,
        photoUrl,
        rating: rating || 5,
        quote,
        status: status || 'Approved',
      },
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 });
  }
}
