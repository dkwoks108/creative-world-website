import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET() {
  try {
    const headerMenu = await prisma.navigationMenu.findFirst({
      where: { location: 'header' },
      include: {
        items: { orderBy: { sortOrder: 'asc' } },
      },
    });

    return NextResponse.json({
      success: true,
      items: headerMenu ? headerMenu.items : [],
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch navigation' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body; // Array of items with { label, href, sortOrder }

    let headerMenu = await prisma.navigationMenu.findFirst({ where: { location: 'header' } });
    if (!headerMenu) {
      headerMenu = await prisma.navigationMenu.create({
        data: { name: 'Main Header', slug: 'main-header', location: 'header' },
      });
    }

    // Delete existing and re-insert
    await prisma.menuItem.deleteMany({ where: { menuId: headerMenu.id } });

    if (Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        await prisma.menuItem.create({
          data: {
            menuId: headerMenu.id,
            label: items[i].label,
            href: items[i].href,
            sortOrder: i + 1,
          },
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Navigation updated' });
  } catch (error) {
    console.error('POST /api/admin/navigation error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save navigation' }, { status: 500 });
  }
}
