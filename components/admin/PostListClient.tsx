/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Copy,
  Trash2,
  CheckSquare,
  Square,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import { setPostStatusAction, deletePostAction, duplicatePostAction, bulkPostAction } from '@/lib/actions/posts';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  featuredImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  publishAt: Date | null;
  lastEditor: string | null;
  category: { id: string; name: string } | null;
  author: { id: string; name: string } | null;
  tags: { tag: { id: string; name: string } }[];
}

interface PostListClientProps {
  initialPosts: PostItem[];
  categories: { id: string; name: string }[];
  authors: { id: string; name: string }[];
}

const PAGE_SIZE = 10;

export function PostListClient({ initialPosts, categories, authors }: PostListClientProps) {
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [statusTab, setStatusTab] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'updated' | 'a-z' | 'z-a'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkModal, setShowBulkModal] = useState<string | null>(null);

  // Filter & Search Logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Tab filter
      if (statusTab !== 'ALL' && post.status !== statusTab) return false;

      // Category filter
      if (selectedCategory !== 'ALL' && post.category?.id !== selectedCategory) return false;

      // Author filter
      if (selectedAuthor !== 'ALL' && post.author?.id !== selectedAuthor) return false;

      // Search term
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchSlug = post.slug.toLowerCase().includes(q);
        const matchCategory = post.category?.name.toLowerCase().includes(q);
        const matchAuthor = post.author?.name.toLowerCase().includes(q);
        const matchTags = post.tags.some((t) => t.tag.name.toLowerCase().includes(q));

        if (!matchTitle && !matchSlug && !matchCategory && !matchAuthor && !matchTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'updated') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortBy === 'a-z') return a.title.localeCompare(b.title);
      if (sortBy === 'z-a') return b.title.localeCompare(a.title);
      return 0;
    });
  }, [posts, statusTab, selectedCategory, selectedAuthor, search, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, currentPage]);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedPosts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedPosts.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkAction = async (action: 'PUBLISH' | 'UNPUBLISH' | 'ARCHIVE' | 'RESTORE' | 'DELETE') => {
    if (selectedIds.length === 0) return;

    const res = await bulkPostAction(selectedIds, action);
    if (res.success) {
      if (action === 'DELETE') {
        setPosts(posts.filter((p) => !selectedIds.includes(p.id)));
      } else {
        const targetStatus = action === 'PUBLISH' ? 'PUBLISHED' : action === 'ARCHIVE' ? 'ARCHIVED' : 'DRAFT';
        setPosts(
          posts.map((p) => (selectedIds.includes(p.id) ? { ...p, status: targetStatus } : p))
        );
      }
      setSelectedIds([]);
      setShowBulkModal(null);
    }
  };

  const handleDuplicate = async (id: string) => {
    const res = await duplicatePostAction(id);
    if (res.success && res.newPostId) {
      alert('Article duplicated successfully as a new Draft!');
      window.location.reload();
    }
  };

  const handleStatusChange = async (id: string, status: any) => {
    const res = await setPostStatusAction(id, status);
    if (res.success) {
      setPosts(posts.map((p) => (p.id === id ? { ...p, status } : p)));
    }
  };

  const handleDeleteOne = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this post?')) return;
    const res = await deletePostAction(id);
    if (res.success) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-ink tracking-tight">Blog CMS Dashboard</h1>
          <p className="text-xs sm:text-sm text-txt-secondary mt-0.5">
            Manage, filter, publish, and structure editorial insights
          </p>
        </div>

        <Link
          href="/cw-control-x7k9m2/posts/new"
          className="h-10 px-4 bg-ink text-white font-semibold text-xs rounded-xl hover:bg-black/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Article</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-black/10 overflow-x-auto pb-px">
        {['ALL', 'PUBLISHED', 'DRAFT', 'REVIEW', 'SCHEDULED', 'ARCHIVED'].map((tab) => {
          const count = tab === 'ALL' ? posts.length : posts.filter((p) => p.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => {
                setStatusTab(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 text-xs font-mono font-semibold rounded-t-xl transition-colors shrink-0 cursor-pointer flex items-center gap-2 ${
                statusTab === tab
                  ? 'bg-white border-t border-x border-black/10 text-ink shadow-sm'
                  : 'text-txt-muted hover:text-ink hover:bg-black/5'
              }`}
            >
              <span>{tab}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/5 text-[10px]">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-black/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-txt-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search title, slug, tag..."
            className="w-full h-9 pl-9 pr-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-medium text-ink focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Author Filter */}
          <select
            value={selectedAuthor}
            onChange={(e) => {
              setSelectedAuthor(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-medium text-ink focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Authors</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-medium text-ink focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="updated">Recently Updated</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-ink text-white rounded-xl flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 font-mono">
            <CheckSquare className="w-4 h-4 text-brand-cyan" />
            <span>{selectedIds.length} article(s) selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('PUBLISH')}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 font-semibold rounded-lg cursor-pointer"
            >
              Bulk Publish
            </button>
            <button
              onClick={() => handleBulkAction('UNPUBLISH')}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 font-semibold rounded-lg cursor-pointer"
            >
              Bulk Draft
            </button>
            <button
              onClick={() => handleBulkAction('ARCHIVE')}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-800 font-semibold rounded-lg cursor-pointer"
            >
              Bulk Archive
            </button>
            <button
              onClick={() => setShowBulkModal('DELETE')}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 font-semibold rounded-lg cursor-pointer"
            >
              Bulk Delete
            </button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FC] border-b border-black/10 font-mono text-txt-muted uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4 w-10">
                  <button onClick={toggleSelectAll} className="cursor-pointer">
                    {selectedIds.length === paginatedPosts.length && paginatedPosts.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-brand-blue" />
                    ) : (
                      <Square className="w-4 h-4 text-txt-muted" />
                    )}
                  </button>
                </th>
                <th className="p-4">Article</th>
                <th className="p-4">Status</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {paginatedPosts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-txt-muted font-mono text-xs">
                    No articles found matching filters.
                  </td>
                </tr>
              ) : (
                paginatedPosts.map((post) => {
                  const isSelected = selectedIds.includes(post.id);
                  return (
                    <tr key={post.id} className={`hover:bg-cream/30 transition-colors ${isSelected ? 'bg-blue-50/40' : ''}`}>
                      <td className="p-4">
                        <button onClick={() => toggleSelectOne(post.id)} className="cursor-pointer">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-brand-blue" />
                          ) : (
                            <Square className="w-4 h-4 text-txt-muted" />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-10 rounded-lg bg-cream border border-black/10 overflow-hidden shrink-0">
                            {post.featuredImage ? (
                              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-txt-muted">
                                <FileText className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div>
                            <Link href={`/cw-control-x7k9m2/posts/${post.id}/edit`} className="font-bold text-ink hover:underline line-clamp-1">
                              {post.title}
                            </Link>
                            <span className="font-mono text-[10px] text-txt-muted">/insights/{post.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                            post.status === 'PUBLISHED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : post.status === 'DRAFT'
                              ? 'bg-amber-100 text-amber-800'
                              : post.status === 'SCHEDULED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-txt-secondary">{post.category?.name || 'Unassigned'}</td>
                      <td className="p-4 font-medium text-txt-secondary">{post.author?.name || 'Team Editorial'}</td>
                      <td className="p-4 font-mono text-txt-muted text-[11px]">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/cw-control-x7k9m2/posts/${post.id}/edit`}
                            title="Edit Article"
                            className="p-1.5 text-txt-secondary hover:text-ink rounded-lg cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          {post.status === 'PUBLISHED' && (
                            <Link
                              href={`/insights/${post.slug}`}
                              target="_blank"
                              title="Preview Article"
                              className="p-1.5 text-txt-secondary hover:text-brand-blue rounded-lg cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          <button
                            onClick={() => handleDuplicate(post.id)}
                            title="Duplicate Article"
                            className="p-1.5 text-txt-secondary hover:text-brand-violet rounded-lg cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteOne(post.id)}
                            title="Delete Permanently"
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 bg-[#FAF9FC] border-t border-black/10 flex items-center justify-between gap-4 text-xs font-mono">
          <div className="text-txt-muted">
            Showing {filteredPosts.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–
            {Math.min(currentPage * PAGE_SIZE, filteredPosts.length)} of {filteredPosts.length} articles
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-1.5 border border-black/10 rounded-lg hover:bg-white disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-1.5 border border-black/10 rounded-lg hover:bg-white disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showBulkModal === 'DELETE' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl border border-black/10 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Bulk Delete</span>
            </div>
            <p className="text-xs text-txt-secondary">
              Are you sure you want to permanently delete <strong>{selectedIds.length}</strong> selected article(s)? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowBulkModal(null)}
                className="px-4 py-2 bg-gray-100 text-ink font-semibold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBulkAction('DELETE')}
                className="px-4 py-2 bg-red-600 text-white font-semibold text-xs rounded-xl cursor-pointer hover:bg-red-700"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
