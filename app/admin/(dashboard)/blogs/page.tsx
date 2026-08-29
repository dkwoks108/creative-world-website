"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Plus, Search, Trash2, Edit2, Globe, Eye, History, Sparkles } from "lucide-react";

interface PostItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
  category?: { name: string };
  revisions?: any[];
}

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "DRAFT" | "PUBLISHED">("ALL");

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === "ALL" ? true : p.status.toUpperCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0D121F] border border-[#1A2333] rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-[1px]">
            <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center text-cyan-400">
              <FileText size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              Blog & Insights Publishing Studio
            </h1>
            <p className="text-xs text-slate-400">
              WordPress/Gutenberg-style block editing, version history, and automatic frontend sync to `/insights`.
            </p>
          </div>
        </div>

        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all w-fit"
        >
          <Plus size={16} />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#0D121F] border border-[#1A2333] rounded-2xl">
        <div className="flex items-center gap-2 bg-[#090D14] p-1 rounded-xl border border-[#1A2333] text-xs">
          {(["ALL", "PUBLISHED", "DRAFT"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === tab
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab} ({tab === "ALL" ? posts.length : posts.filter((p) => p.status.toUpperCase() === tab).length})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or slug..."
            className="w-full pl-9 pr-3 py-2 bg-[#141B2B] border border-[#222E45] text-xs text-white rounded-xl focus:outline-none"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-[#0D121F] border border-[#1A2333] rounded-2xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading published articles...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No blog posts found. Click Write New Article to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#090D14] border-b border-[#1A2333] text-slate-400 uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Article Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Revisions</th>
                  <th className="px-6 py-3.5">Date Created</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2333]">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-[#141B2B]/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white max-w-xs">
                      <div>
                        <Link href={`/admin/blogs/${post.id}/edit`} className="hover:text-cyan-400 transition-colors">
                          {post.title}
                        </Link>
                        <p className="text-[11px] text-slate-500 font-mono font-normal">/insights/{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {post.category?.name || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      <span className="flex items-center gap-1">
                        <History size={12} className="text-cyan-400" />
                        {post.revisions?.length || 1} Revisions
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/insights/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-white"
                          title="View Live Page"
                        >
                          <Globe size={14} />
                        </Link>
                        <Link
                          href={`/admin/blogs/${post.id}/edit`}
                          className="p-1.5 text-slate-400 hover:text-cyan-400"
                          title="Edit in Gutenberg Block Editor"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400"
                          title="Delete Post"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
