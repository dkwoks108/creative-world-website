'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db';
import { getAdminSession } from '../session';
import { sanitizeHtml } from '../utils';

export async function createPostAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized session.' };

  const rawTitle = formData.get('title')?.toString().trim() || '';
  const rawSlug = formData.get('slug')?.toString().trim() || '';

  const slug = (rawSlug || rawTitle)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  if (!rawTitle) {
    return { success: false, error: 'Title is required.' };
  }

  // Ensure unique slug
  const existing = await db.post.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

  try {
    const post = await db.post.create({
      data: {
        title: rawTitle,
        slug: finalSlug,
        excerpt: formData.get('excerpt')?.toString() || null,
        content: sanitizeHtml(formData.get('content')?.toString() || ''),
        categoryId: formData.get('categoryId')?.toString() || null,
        authorId: formData.get('authorId')?.toString() || null,
        featuredImage: formData.get('featuredImage')?.toString() || null,
        featuredImageAlt: formData.get('featuredImageAlt')?.toString() || null,
        imageCaption: formData.get('imageCaption')?.toString() || null,
        status: (formData.get('status')?.toString() as any) || 'DRAFT',
        publishAt: formData.get('publishAt') ? new Date(formData.get('publishAt')!.toString()) : new Date(),
        seoTitle: formData.get('seoTitle')?.toString() || null,
        metaDescription: formData.get('metaDescription')?.toString() || null,
        canonicalUrl: formData.get('canonicalUrl')?.toString() || null,
        ogTitle: formData.get('ogTitle')?.toString() || null,
        ogDescription: formData.get('ogDescription')?.toString() || null,
        ogImage: formData.get('ogImage')?.toString() || null,
        noIndex: formData.get('noIndex') === 'true',
        noFollow: formData.get('noFollow') === 'true',
        primaryKeyword: formData.get('primaryKeyword')?.toString() || null,
        secondaryKeywords: formData.get('secondaryKeywords')?.toString() || null,
        faqsJson: formData.get('faqsJson')?.toString() || null,
        lastEditor: session.email,
      },
    });

    await db.auditLog.create({
      data: {
        userId: session.userId,
        action: 'CREATE_POST',
        resource: 'Post',
        resourceId: post.id,
        details: `Created article "${post.title}" (${post.status})`,
      },
    });

    revalidatePath('/insights');
    return { success: true, postId: post.id, slug: post.slug };
  } catch (err) {
    console.error('Create post error:', err);
    return { success: false, error: 'Failed to create blog post.' };
  }
}

export async function updatePostAction(id: string, formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized session.' };

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) return { success: false, error: 'Post not found.' };

  const rawTitle = formData.get('title')?.toString().trim() || existing.title;
  const rawSlug = formData.get('slug')?.toString().trim() || existing.slug;

  const newSlug = rawSlug
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  // Save current version to revision history before updating
  await db.postRevision.create({
    data: {
      postId: existing.id,
      title: existing.title,
      content: existing.content,
      seoTitle: existing.seoTitle,
      metaDescription: existing.metaDescription,
      createdBy: session.email,
    },
  });

  // If published slug is changing, create redirect safety entry
  if (existing.slug !== newSlug && existing.status === 'PUBLISHED') {
    await db.redirect.upsert({
      where: { sourcePath: `/insights/${existing.slug}` },
      update: { targetPath: `/insights/${newSlug}` },
      create: {
        sourcePath: `/insights/${existing.slug}`,
        targetPath: `/insights/${newSlug}`,
        statusCode: 301,
      },
    });
  }

  try {
    const updated = await db.post.update({
      where: { id },
      data: {
        title: rawTitle,
        slug: newSlug,
        excerpt: formData.get('excerpt')?.toString() || null,
        content: sanitizeHtml(formData.get('content')?.toString() || ''),
        categoryId: formData.get('categoryId')?.toString() || null,
        authorId: formData.get('authorId')?.toString() || null,
        featuredImage: formData.get('featuredImage')?.toString() || null,
        featuredImageAlt: formData.get('featuredImageAlt')?.toString() || null,
        imageCaption: formData.get('imageCaption')?.toString() || null,
        status: (formData.get('status')?.toString() as any) || existing.status,
        publishAt: formData.get('publishAt') ? new Date(formData.get('publishAt')!.toString()) : existing.publishAt,
        seoTitle: formData.get('seoTitle')?.toString() || null,
        metaDescription: formData.get('metaDescription')?.toString() || null,
        canonicalUrl: formData.get('canonicalUrl')?.toString() || null,
        ogTitle: formData.get('ogTitle')?.toString() || null,
        ogDescription: formData.get('ogDescription')?.toString() || null,
        ogImage: formData.get('ogImage')?.toString() || null,
        noIndex: formData.get('noIndex') === 'true',
        noFollow: formData.get('noFollow') === 'true',
        primaryKeyword: formData.get('primaryKeyword')?.toString() || null,
        secondaryKeywords: formData.get('secondaryKeywords')?.toString() || null,
        faqsJson: formData.get('faqsJson')?.toString() || null,
        lastEditor: session.email,
      },
    });

    await db.auditLog.create({
      data: {
        userId: session.userId,
        action: 'UPDATE_POST',
        resource: 'Post',
        resourceId: updated.id,
        details: `Updated article "${updated.title}"`,
      },
    });

    revalidatePath('/insights');
    revalidatePath(`/insights/${updated.slug}`);
    return { success: true, post: updated };
  } catch (err) {
    console.error('Update post error:', err);
    return { success: false, error: 'Failed to update blog post.' };
  }
}

export async function autosavePostAction(id: string, payload: any) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  try {
    const post = await db.post.update({
      where: { id },
      data: {
        title: payload.title,
        excerpt: payload.excerpt,
        content: payload.content,
        seoTitle: payload.seoTitle,
        metaDescription: payload.metaDescription,
        lastEditor: session.email,
      },
    });

    return { success: true, updatedAt: post.updatedAt };
  } catch (err) {
    return { success: false, error: 'Autosave failed' };
  }
}

export async function setPostStatusAction(id: string, status: 'PUBLISHED' | 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'ARCHIVED') {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const post = await db.post.update({
    where: { id },
    data: {
      status,
      publishAt: status === 'PUBLISHED' ? new Date() : undefined,
      lastEditor: session.email,
    },
  });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: `${status}_POST`,
      resource: 'Post',
      resourceId: post.id,
      details: `Set status of "${post.title}" to ${status}`,
    },
  });

  revalidatePath('/insights');
  revalidatePath(`/insights/${post.slug}`);
  return { success: true };
}

export async function duplicatePostAction(id: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) return { success: false, error: 'Post not found.' };

  const newSlug = `${existing.slug}-copy-${Date.now().toString().slice(-4)}`;
  const duplicated = await db.post.create({
    data: {
      title: `${existing.title} (Copy)`,
      slug: newSlug,
      excerpt: existing.excerpt,
      content: existing.content,
      authorId: existing.authorId,
      categoryId: existing.categoryId,
      featuredImage: existing.featuredImage,
      featuredImageAlt: existing.featuredImageAlt,
      imageCaption: existing.imageCaption,
      status: 'DRAFT',
      seoTitle: existing.seoTitle,
      metaDescription: existing.metaDescription,
      lastEditor: session.email,
    },
  });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'DUPLICATE_POST',
      resource: 'Post',
      resourceId: duplicated.id,
      details: `Duplicated post "${existing.title}"`,
    },
  });

  revalidatePath('/insights');
  return { success: true, newPostId: duplicated.id };
}

export async function restoreRevisionAction(postId: string, revisionId: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const revision = await db.postRevision.findUnique({ where: { id: revisionId } });
  if (!revision) return { success: false, error: 'Revision snapshot not found.' };

  const updated = await db.post.update({
    where: { id: postId },
    data: {
      title: revision.title,
      content: revision.content,
      seoTitle: revision.seoTitle,
      metaDescription: revision.metaDescription,
      lastEditor: session.email,
    },
  });

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'RESTORE_REVISION',
      resource: 'Post',
      resourceId: postId,
      details: `Restored post "${updated.title}" from revision snapshot ${revisionId}`,
    },
  });

  revalidatePath('/insights');
  revalidatePath(`/insights/${updated.slug}`);
  return { success: true, post: updated };
}

export async function bulkPostAction(ids: string[], action: 'PUBLISH' | 'UNPUBLISH' | 'ARCHIVE' | 'RESTORE' | 'DELETE') {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  if (!ids || ids.length === 0) return { success: false, error: 'No posts selected.' };

  if (action === 'DELETE') {
    await db.post.deleteMany({ where: { id: { in: ids } } });
  } else {
    let targetStatus = 'DRAFT';
    if (action === 'PUBLISH') targetStatus = 'PUBLISHED';
    if (action === 'ARCHIVE') targetStatus = 'ARCHIVED';
    if (action === 'RESTORE' || action === 'UNPUBLISH') targetStatus = 'DRAFT';

    await db.post.updateMany({
      where: { id: { in: ids } },
      data: {
        status: targetStatus,
        lastEditor: session.email,
      },
    });
  }

  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: `BULK_${action}`,
      resource: 'Post',
      details: `Applied bulk ${action} to ${ids.length} post(s)`,
    },
  });

  revalidatePath('/insights');
  return { success: true };
}

export async function deletePostAction(id: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  await db.post.delete({ where: { id } });
  await db.auditLog.create({
    data: {
      userId: session.userId,
      action: 'DELETE_POST',
      resource: 'Post',
      resourceId: id,
      details: `Permanently deleted post ${id}`,
    },
  });

  revalidatePath('/insights');
  return { success: true };
}
