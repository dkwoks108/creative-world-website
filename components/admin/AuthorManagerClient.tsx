/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { User, Plus, Edit, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { createAuthorAction, updateAuthorAction, deleteAuthorAction } from '@/lib/actions/authors';

interface AuthorItem {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatarUrl: string | null;
  _count?: { posts: number };
}

interface AuthorManagerClientProps {
  initialAuthors: AuthorItem[];
}

export function AuthorManagerClient({ initialAuthors }: AuthorManagerClientProps) {
  const [authors, setAuthors] = useState<AuthorItem[]>(initialAuthors);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setToast(null);

    const res = await createAuthorAction(name, role, bio, avatarUrl);
    if (res.success && res.author) {
      setAuthors([...authors, { ...res.author, _count: { posts: 0 } }]);
      setName('');
      setRole('');
      setBio('');
      setAvatarUrl('');
      setToast(`Created author profile "${res.author.name}"`);
    } else {
      setError(res.error || 'Failed to create author.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this author?')) return;

    const res = await deleteAuthorAction(id);
    if (res.success) {
      setAuthors(authors.filter((a) => a.id !== id));
      setToast('Author deleted.');
    } else {
      setError(res.error || 'Failed to delete author.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ink tracking-tight">Editorial Author Profile Manager</h1>
        <p className="text-xs sm:text-sm text-txt-secondary mt-0.5">
          Manage authors, avatars, roles, and bios attached to blog posts
        </p>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Create Form */}
        <form onSubmit={handleCreate} className="lg:col-span-4 bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-black/10 pb-3">
            <User className="w-4 h-4 text-brand-blue" />
            <h2 className="text-sm font-semibold text-ink">Add New Author</h2>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-txt-muted uppercase mb-1">Author Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikram Sharma"
              className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-txt-muted uppercase mb-1">Role / Title *</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Head of Search Strategy"
              className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-txt-muted uppercase mb-1">Avatar Image URL</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="/uploads/author-avatar.webp"
              className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-txt-muted uppercase mb-1">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Short bio..."
              className="w-full p-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-ink text-white font-semibold text-xs rounded-xl hover:bg-black/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Author</span>
          </button>
        </form>

        {/* Authors List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden divide-y divide-black/5">
          <div className="p-4 bg-[#FAF9FC] text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">
            All Authors ({authors.length})
          </div>

          {authors.map((author) => (
            <div key={author.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center font-bold text-ink text-sm overflow-hidden border border-black/10 shrink-0">
                  {author.avatarUrl ? (
                    <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
                  ) : (
                    author.name.charAt(0)
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink text-sm">{author.name}</span>
                    <span className="text-xs text-txt-muted font-mono">({author.role})</span>
                  </div>
                  {author.bio && <p className="text-xs text-txt-secondary line-clamp-1 mt-0.5">{author.bio}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[10px]">
                  {author._count?.posts || 0} articles
                </span>
                <button
                  onClick={() => handleDelete(author.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
