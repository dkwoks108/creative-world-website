import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, businessName, website, primaryGoal, budgetRange, notes } = body;

    if (!fullName || !email) {
      return NextResponse.json({ success: false, error: 'Name and email are required.' }, { status: 400 });
    }

    const inquiry = await db.inquiry.create({
      data: {
        name: fullName,
        email,
        phone: phone || null,
        businessName: businessName || null,
        websiteUrl: website || null,
        goal: primaryGoal || 'Growth Audit Request',
        budget: budgetRange || null,
        message: notes || `Submitted Growth Audit request for ${primaryGoal || 'general growth'}.`,
        status: 'NEW',
        source: 'Growth Audit Form',
      },
    });

    return NextResponse.json({
      success: true,
      inquiryId: inquiry.id,
      message: 'Your inquiry was received by Ceativee World.',
    });
  } catch (err) {
    console.error('Inquiry API Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to record inquiry.' }, { status: 500 });
  }
}
