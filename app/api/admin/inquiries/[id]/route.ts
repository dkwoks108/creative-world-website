import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: params.id },
      include: {
        events: { orderBy: { createdAt: 'desc' } },
        followups: { orderBy: { dueDate: 'asc' } },
        notes: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!inquiry) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('GET /api/admin/inquiries/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch inquiry details' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, note, eventDescription, eventType, followupDate, followupNotes } = body;

    const existing = await prisma.inquiry.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }

    const updates: any = {};
    if (status && status !== existing.status) {
      updates.status = status;
      if (status === 'Contacted') updates.lastContacted = new Date();
    }

    // Update status and append event if changed
    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: {
        ...updates,
        events: status && status !== existing.status ? {
          create: {
            eventType: eventType || status.toUpperCase().replace(/\s+/g, '_'),
            description: eventDescription || `Status changed from ${existing.status} to ${status}`,
            createdBy: 'Admin',
          },
        } : undefined,
      },
    });

    // Append custom note if provided
    if (note) {
      await prisma.inquiryNote.create({
        data: {
          inquiryId: params.id,
          content: note,
          createdBy: 'Admin',
        },
      });
    }

    // Append followup if provided
    if (followupDate) {
      await prisma.inquiryFollowup.create({
        data: {
          inquiryId: params.id,
          dueDate: new Date(followupDate),
          notes: followupNotes || 'Scheduled follow-up call',
          createdBy: 'Admin',
        },
      });
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('PATCH /api/admin/inquiries/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.inquiry.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/inquiries/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
