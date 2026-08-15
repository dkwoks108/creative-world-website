'use client';

import React, { useState } from 'react';
import { Tag, Plus, Edit, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { createTagAction, updateTagAction, deleteTagAction } from '@/lib/actions/tags';

interface TagItem {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

interface TagManagerClientProps {
  initialTags: TagItem[];
}

export function TagManagerClient({ initialTags }: TagManagerClientProps) {
  const [tags, setTags] = useState<TagItem[]>(initialTags);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setToast(null);

    const res = await createTagAction(name);
    if (res.success && res.tag) {
      setTags([...tags, { ...res.tag, _count: { posts: 0 } }]);
      setName('');
      setToast(`Created tag "${res.tag.name}"`);
    } else {
      setError(res.error || 'Failed to create tag.');
    }
  };

  const handleUpdate = async (id: string) => {
    setError(null);
    setToast(null);

    const res = await updateTagAction(id, editName);
    if (res.success && res.tag) {
      setTags(tags.map((t) => (t.id === id ? { ...t, ...res.tag } : t)));
      setEditingId(null);
      setToast('Tag updated!');
    } else {
      setError(res.error || 'Failed to update tag.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;

    const res = await deleteTagAction(id);
    if (res.success) {
      setTags(tags.filter((t) => t.id !== id));
      setToast('Tag deleted.');
    } else {
      setError(res.error || 'Failed to delete tag.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ink tracking-tight">Blog Tag Taxonomy Manager</h1>
        <p className="text-xs sm:text-sm text-txt-secondary mt-0.5">
          Manage keywords and tags used across editorial articles
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
            <Tag className="w-4 h-4 text-brand-violet" />
            <h2 className="text-sm font-semibold text-ink">Add New Tag</h2>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-txt-muted uppercase mb-1">Tag Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jaipur Local Search"
              className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-ink text-white font-semibold text-xs rounded-xl hover:bg-black/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Tag</span>
          </button>
        </form>

        {/* Tags Grid */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
          <div className="text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">
            All Tags ({tags.length})
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag.id} className="p-2 bg-cream/50 rounded-xl border border-black/5 flex items-center gap-2 text-xs">
                {editingId === tag.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-7 px-2 bg-white border border-black/20 rounded text-xs"
                    />
                    <button onClick={() => handleUpdate(tag.id)} className="px-2 py-1 bg-ink text-white text-[10px] font-bold rounded">
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold text-ink">{tag.name}</span>
                    <span className="font-mono text-[10px] text-txt-muted">#{tag.slug}</span>
                    <button
                      onClick={() => {
                        setEditingId(tag.id);
                        setEditName(tag.name);
                      }}
                      className="text-txt-muted hover:text-ink cursor-pointer"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                    <button onClick={() => handleDelete(tag.id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
