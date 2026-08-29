import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await prisma.service.findUnique({ where: { id: params.id } });
    if (!service) return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ success: true, service });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const service = await prisma.service.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ success: true, service });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check dependencies in CaseStudy or Inquiry before deletion
    const existingService = await prisma.service.findUnique({ where: { id: params.id } });
    if (existingService) {
      const linkedCaseStudies = await prisma.caseStudy.count({
        where: { industry: { contains: existingService.name } },
      });
      if (linkedCaseStudies > 0) {
        return NextResponse.json(
          { success: false, error: `Cannot delete: Service is linked to ${linkedCaseStudies} portfolio case studies. Archive service instead.` },
          { status: 400 }
        );
      }
    }

    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete service' }, { status: 500 });
  }
}
