import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true, revisions: true },
    });
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, status, blocks, categoryId, featuredImage, seoTitle, metaDescription } = body;

    const post = await prisma.post.create({
      data: {
        title: title || 'Untitled Article',
        slug: slug || `post-${Date.now()}`,
        excerpt: excerpt || '',
        content: JSON.stringify(blocks || []),
        status: status || 'DRAFT',
        categoryId: categoryId || undefined,
        featuredImage,
        seoTitle,
        metaDescription,
        authorId: 'admin-1',
      },
    });

    // Create initial revision entry
    await prisma.postRevision.create({
      data: {
        postId: post.id,
        title: post.title,
        content: post.content,
        createdBy: 'Admin User',
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: 'admin-1',
        userName: 'Admin User',
        action: 'CREATE_POST',
        resource: 'Post',
        resourceId: post.id,
        details: `Created post: ${post.title}`,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create post' }, { status: 500 });
  }
}
