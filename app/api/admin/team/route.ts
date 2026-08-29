import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, members });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, designation, department, photoUrl, bio, email, linkedinUrl, status } = body;

    if (!name || !designation) {
      return NextResponse.json({ success: false, error: 'Name and designation are required' }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        designation,
        department,
        photoUrl,
        bio,
        email,
        linkedinUrl,
        status: status || 'Active',
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 500 });
  }
}
