'use server';

import { revalidatePath } from 'next/cache';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { db } from '../db';
import { getAdminSession } from '../session';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadMediaAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const file = formData.get('file') as File | null;
  const altText = formData.get('altText')?.toString() || '';

  if (!file) {
    return { success: false, error: 'No file provided.' };
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext) || !ALLOWED_MIME_TYPES.includes(file.type)) {
    return { success: false, error: 'Invalid file format or extension. Allowed formats: WebP, PNG, JPEG, AVIF, SVG.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: 'File size exceeds 5MB limit.' };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, filename);

    // Save file to disk
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    const media = await db.media.create({
      data: {
        filename: file.name,
        url: publicUrl,
        mimeType: file.type,
        size: file.size,
        altText,
      },
    });

    await db.auditLog.create({
      data: {
        userId: session.userId,
        action: 'UPLOAD_MEDIA',
        resource: 'Media',
        resourceId: media.id,
        details: `Uploaded ${file.name} (${publicUrl})`,
      },
    });

    revalidatePath('/cw-control-x7k9m2/media');
    return { success: true, media };
  } catch (err) {
    console.error('Media upload error:', err);
    return { success: false, error: 'Failed to upload media file.' };
  }
}

export async function updateMediaAltAction(id: string, altText: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const updated = await db.media.update({
    where: { id },
    data: { altText },
  });

  revalidatePath('/cw-control-x7k9m2/media');
  return { success: true, media: updated };
}

export async function deleteMediaAction(id: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: 'Unauthorized.' };

  const media = await db.media.findUnique({ where: { id } });
  if (media) {
    // Attempt to remove file from disk if under /uploads
    if (media.url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', media.url);
      await unlink(filePath).catch(() => {});
    }

    await db.media.delete({ where: { id } });

    await db.auditLog.create({
      data: {
        userId: session.userId,
        action: 'DELETE_MEDIA',
        resource: 'Media',
        resourceId: id,
        details: `Deleted media file ${media.filename}`,
      },
    });
  }

  revalidatePath('/cw-control-x7k9m2/media');
  return { success: true };
}
