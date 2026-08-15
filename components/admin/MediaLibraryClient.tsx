'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Copy, Check, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';
import { uploadMediaAction, updateMediaAltAction, deleteMediaAction } from '@/lib/actions/media';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  altText: string | null;
  createdAt: string | Date;
}

interface MediaLibraryProps {
  initialMedia: MediaItem[];
}

export function MediaLibraryClient({ initialMedia }: MediaLibraryProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAltText, setEditAltText] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setToast(null);

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const res = await uploadMediaAction(formData);
      if (res.success && res.media) {
        setMediaList([res.media, ...mediaList]);
        setToast('File uploaded successfully!');
      } else {
        setToast(res.error || 'Upload failed.');
      }
    } catch {
      setToast('Upload failed due to network error.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAlt = async (id: string) => {
    try {
      const res = await updateMediaAltAction(id, editAltText);
      if (res.success) {
        setMediaList(
          mediaList.map((m) => (m.id === id ? { ...m, altText: editAltText } : m))
        );
        setEditingId(null);
        setToast('Alt text updated!');
      }
    } catch {
      setToast('Failed to update alt text.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;
    try {
      const res = await deleteMediaAction(id);
      if (res.success) {
        setMediaList(mediaList.filter((m) => m.id !== id));
        setToast('Media file deleted.');
      }
    } catch {
      setToast('Failed to delete media.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ink tracking-tight">Media Asset Library</h1>
          <p className="text-xs sm:text-sm text-txt-secondary mt-0.5">
            Upload, manage, and retrieve WebP/PNG images for articles and site sections
          </p>
        </div>

        <label className="inline-flex items-center justify-center gap-2 h-11 px-5 bg-ink text-white font-semibold text-sm rounded-xl hover:bg-black/90 active:scale-[0.99] transition-all cursor-pointer shadow-sm shrink-0">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
          <input
            type="file"
            accept="image/webp,image/png,image/jpeg,image/avif,image/svg+xml"
            onChange={handleUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {toast && (
        <div className="p-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-medium text-ink">
          {toast}
        </div>
      )}

      {/* Media Grid */}
      {mediaList.length === 0 ? (
        <div className="bg-white p-16 rounded-2xl border border-black/10 shadow-sm text-center space-y-3">
          <ImageIcon className="w-8 h-8 text-txt-muted mx-auto opacity-40" />
          <p className="text-sm font-semibold text-ink">No media uploaded yet</p>
          <p className="text-xs text-txt-muted max-w-sm mx-auto">
            Upload images to automatically generate asset URLs for your blog posts and site components.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden flex flex-col justify-between group">
              {/* Image Preview Container */}
              <div className="relative aspect-video bg-[#FAF9FC] border-b border-black/5 overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.altText || item.filename}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info & Alt Editor */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-ink truncate" title={item.filename}>
                    {item.filename}
                  </p>
                  <p className="text-[10px] font-mono text-txt-muted mt-0.5">
                    {(item.size / 1024).toFixed(1)} KB &bull; {item.mimeType.split('/')[1]?.toUpperCase()}
                  </p>

                  {editingId === item.id ? (
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        value={editAltText}
                        onChange={(e) => setEditAltText(e.target.value)}
                        placeholder="Alt text..."
                        className="w-full h-8 px-2 bg-[#FAF9FC] border border-black/10 rounded-lg text-xs"
                      />
                      <button
                        onClick={() => handleSaveAlt(item.id)}
                        className="w-full h-7 bg-ink text-white font-medium text-[11px] rounded-lg cursor-pointer"
                      >
                        Save Alt Text
                      </button>
                    </div>
                  ) : (
                    <p className="text-[11px] text-txt-secondary mt-1 line-clamp-2">
                      <span className="font-mono text-txt-muted uppercase text-[9px] mr-1">ALT:</span>
                      {item.altText || <span className="italic text-txt-muted">No alt text specified</span>}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-black/5 pt-3 mt-2">
                  <button
                    onClick={() => handleCopyUrl(item.id, item.url)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-brand-blue hover:underline cursor-pointer"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? 'Copied URL!' : 'Copy URL'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditAltText(item.altText || '');
                      }}
                      className="p-1.5 text-txt-secondary hover:text-ink rounded-lg transition-colors cursor-pointer"
                      title="Edit Alt Text"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Media"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
