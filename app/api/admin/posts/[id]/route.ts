import { NextResponse } from 'next/server';
import { prisma } from '@/lib/site-settings';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { category: true, revisions: { orderBy: { createdAt: 'desc' } } },
    });
    if (!post) return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, status, blocks, categoryId, featuredImage, seoTitle, metaDescription } = body;

    const contentStr = typeof blocks === 'string' ? blocks : JSON.stringify(blocks || []);

    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        excerpt,
        content: contentStr,
        status,
        categoryId: categoryId || undefined,
        featuredImage,
        seoTitle,
        metaDescription,
      },
    });

    // Add revision checkpoint on edit
    await prisma.postRevision.create({
      data: {
        postId: updatedPost.id,
        title: updatedPost.title,
        content: updatedPost.content,
        createdBy: 'Admin User',
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: 'admin-1',
        userName: 'Admin User',
        action: 'UPDATE_POST',
        resource: 'Post',
        resourceId: updatedPost.id,
        details: `Updated post: ${updatedPost.title}`,
      },
    });

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({ where: { id: params.id } });
    if (post) {
      await prisma.postRevision.deleteMany({ where: { postId: params.id } });
      await prisma.post.delete({ where: { id: params.id } });

      await prisma.auditLog.create({
        data: {
          userId: 'admin-1',
          userName: 'Admin User',
          action: 'DELETE_POST',
          resource: 'Post',
          resourceId: params.id,
          details: `Deleted post: ${post.title}`,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 500 });
  }
}
