import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error('GET /api/admin/contacts error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, companyName, role, type, tags, notes } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }

    const contact = await prisma.contact.upsert({
      where: { email },
      update: { name, phone, companyName, role, type, tags, notes },
      create: { name, email, phone, companyName, role, type: type || 'Lead', tags, notes },
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error('POST /api/admin/contacts error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create contact' }, { status: 500 });
  }
}
