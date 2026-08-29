import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};
    if (status && status !== 'All') {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { companyName: { contains: search } },
        { service: { contains: search } },
      ];
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        events: {
          orderBy: { createdAt: 'desc' },
        },
        followups: {
          orderBy: { dueDate: 'asc' },
        },
      },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error('GET /api/admin/inquiries error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, companyName, service, budget, message, source, utmSource, utmMedium, utmCampaign } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email, and message are required' }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        companyName,
        service,
        budget,
        message,
        source: source || 'Website Form',
        utmSource,
        utmMedium,
        utmCampaign,
        status: 'New',
        events: {
          create: [
            {
              eventType: 'CREATED',
              description: 'Inquiry submitted',
              createdBy: 'System',
            },
          ],
        },
      },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('POST /api/admin/inquiries error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create inquiry' }, { status: 500 });
  }
}
