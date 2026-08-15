'use client';

import React, { useState } from 'react';
import { FolderTree, Plus, Edit, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from '@/lib/actions/categories';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isArchived: boolean;
  _count?: { posts: number };
}

interface CategoryManagerClientProps {
  initialCategories: CategoryItem[];
}

export function CategoryManagerClient({ initialCategories }: CategoryManagerClientProps) {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setToast(null);

    const res = await createCategoryAction(name, description);
    if (res.success && res.category) {
      setCategories([...categories, { ...res.category, _count: { posts: 0 } }]);
      setName('');
      setDescription('');
      setToast(`Created category "${res.category.name}"`);
    } else {
      setError(res.error || 'Failed to create category.');
    }
  };

  const handleUpdate = async (id: string) => {
    setError(null);
    setToast(null);

    const res = await updateCategoryAction(id, editName, editDesc);
    if (res.success && res.category) {
      setCategories(
        categories.map((c) => (c.id === id ? { ...c, ...res.category } : c))
      );
      setEditingId(null);
      setToast('Category updated!');
    } else {
      setError(res.error || 'Failed to update category.');
    }
  };

  const handleDelete = async (id: string, postCount: number) => {
    if (postCount > 0) {
      alert(`Cannot delete category with ${postCount} assigned post(s). Please reassign them first.`);
      return;
    }

    if (!confirm('Are you sure you want to delete this category?')) return;

    const res = await deleteCategoryAction(id);
    if (res.success) {
      setCategories(categories.filter((c) => c.id !== id));
      setToast('Category deleted.');
    } else {
      setError(res.error || 'Failed to delete category.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-ink tracking-tight">Category Taxonomy Manager</h1>
        <p className="text-xs sm:text-sm text-txt-secondary mt-0.5">
          Manage, create, and organize blog article categories
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
        {/* Create Form (4 cols) */}
        <form onSubmit={handleCreate} className="lg:col-span-4 bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-black/10 pb-3">
            <FolderTree className="w-4 h-4 text-brand-blue" />
            <h2 className="text-sm font-semibold text-ink">Add New Category</h2>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-txt-muted uppercase mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Performance Marketing"
              className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-txt-muted uppercase mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short taxonomy summary..."
              className="w-full p-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-ink text-white font-semibold text-xs rounded-xl hover:bg-black/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Category</span>
          </button>
        </form>

        {/* Categories Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#FAF9FC] border-b border-black/10 text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">
            All Categories ({categories.length})
          </div>

          <div className="divide-y divide-black/5">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 hover:bg-cream/40 transition-colors flex items-center justify-between gap-4 text-xs">
                {editingId === cat.id ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full h-8 px-2 bg-white border border-black/20 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full h-8 px-2 bg-white border border-black/20 rounded-lg text-xs"
                    />
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        className="px-3 py-1 bg-ink text-white text-[11px] font-semibold rounded-lg cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-200 text-ink text-[11px] font-semibold rounded-lg cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink">{cat.name}</span>
                        <span className="font-mono text-[10px] text-txt-muted">/{cat.slug}</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-mono text-[10px]">
                          {cat._count?.posts || 0} posts
                        </span>
                      </div>
                      {cat.description && <p className="text-txt-muted text-[11px] mt-0.5">{cat.description}</p>}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditName(cat.name);
                          setEditDesc(cat.description || '');
                        }}
                        className="p-1.5 text-txt-secondary hover:text-ink rounded-lg cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat._count?.posts || 0)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
