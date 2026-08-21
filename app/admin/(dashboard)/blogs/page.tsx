"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
    Eye, EyeOff, Loader2, Plus, Pencil, Trash2, Search,
    Filter, MoreHorizontal, CheckCircle2, ChevronDown, Sparkles, Globe
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/blogs");
            if (res.ok) {
                const data = await res.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error("Failed to fetch blogs", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Published' || currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';

        setBlogs(prev => prev.map(b =>
            b.id === id ? { ...b, status: newStatus } : b
        ));

        await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;

        setBlogs(prev => prev.filter(b => b.id !== id));
        await fetch(`/api/blogs/${id}`, { method: "DELETE" });
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectAll = () => {
        if (selectedIds.size === filteredBlogs.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredBlogs.map(b => b.id)));
        }
    };

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesSearch = (blog.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (blog.slug || "").toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || (blog.status || "").toLowerCase() === statusFilter.toLowerCase();
            return matchesSearch && matchesStatus;
        });
    }, [blogs, searchQuery, statusFilter]);

    const stats = useMemo(() => ({
        total: blogs.length,
        published: blogs.filter(b => (b.status || "").toUpperCase() === "PUBLISHED").length,
        views: blogs.reduce((acc, b) => acc + (b.views || 0), 0)
    }), [blogs]);

    return (
        <div className="flex flex-col h-full w-full bg-[#090D14] text-white">
            <div className="flex flex-col h-full overflow-hidden space-y-6">
                {/* Header */}
                <div className="p-6 bg-[#111622] border border-[#1E293B] rounded-2xl shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white font-poppins flex items-center gap-2">
                                <Sparkles className="text-cyan-400" size={24} />
                                Articles & Insights CMS
                            </h1>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                    <CheckCircle2 size={14} /> {stats.published} Published
                                </span>
                                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                                    <Pencil size={14} /> {stats.total - stats.published} Drafts
                                </span>
                                <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                                    <Eye size={14} /> {stats.views.toLocaleString()} Total Views
                                </span>
                            </div>
                        </div>
                        <Link href="/admin/blogs/new">
                            <Button className="gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/20 px-5 py-2.5 rounded-xl">
                                <Plus size={18} /> Write New Article
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-[#111622] border border-[#1E293B] p-4 rounded-2xl">
                    <div className="flex items-center gap-3 w-full md:flex-1">
                        <div className="relative flex-1 md:max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search articles by title or slug..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="default" className="gap-2 border-[#1E293B] bg-[#0D121F] text-slate-300 hover:text-white rounded-xl min-w-[140px] justify-between">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Filter size={14} className="text-cyan-400" />
                                        <span>
                                            {statusFilter === 'all' ? 'All Status' : statusFilter === 'published' ? 'Published' : 'Drafts'}
                                        </span>
                                    </div>
                                    <ChevronDown size={14} className="opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-40 bg-[#111622] border-[#1E293B] text-white">
                                <DropdownMenuItem onClick={() => setStatusFilter('all')} className="cursor-pointer hover:bg-cyan-500/10">
                                    All Posts
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter('published')} className="cursor-pointer hover:bg-cyan-500/10">
                                    Published
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter('draft')} className="cursor-pointer hover:bg-cyan-500/10">
                                    Drafts
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Table Content */}
                <div className="flex-1 overflow-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                            <Loader2 className="animate-spin text-cyan-400 w-8 h-8 mb-4" />
                            <p className="text-xs">Loading CMS articles...</p>
                        </div>
                    ) : (
                        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-[#0D121F] text-slate-400 font-semibold border-b border-[#1A2333]">
                                    <tr>
                                        <th className="p-4 w-12 text-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-[#1E293B] bg-transparent text-cyan-400 cursor-pointer"
                                                onChange={selectAll}
                                                checked={filteredBlogs.length > 0 && selectedIds.size === filteredBlogs.length}
                                            />
                                        </th>
                                        <th className="p-4 min-w-[280px]">Article Details</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-right">Views</th>
                                        <th className="p-4 text-right">Date</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2333]">
                                    {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => {
                                        const isPub = (blog.status || "").toUpperCase() === 'PUBLISHED';
                                        return (
                                            <tr key={blog.id} className="hover:bg-[#0D121F]/60 transition-colors">
                                                <td className="p-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-[#1E293B] bg-transparent text-cyan-400 cursor-pointer"
                                                        checked={selectedIds.has(blog.id)}
                                                        onChange={() => toggleSelection(blog.id)}
                                                    />
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <Link href={`/admin/blogs/${blog.id}`} className="font-semibold text-white hover:text-cyan-400 transition-colors line-clamp-1 text-sm mb-1">
                                                            {blog.title}
                                                        </Link>
                                                        <span className="text-[10px] text-slate-500 font-mono">/{blog.slug}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-slate-300">
                                                    <span className="px-2 py-1 rounded-md bg-[#0D121F] border border-[#1E293B] text-[10px] font-medium">
                                                        {blog.category?.name || blog.category_name || "Websites"}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {isPub ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                            Draft
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-right font-mono text-slate-400">
                                                    {(blog.views || 0).toLocaleString()}
                                                </td>
                                                <td className="p-4 text-right text-slate-500 text-[10px] font-mono">
                                                    {new Date(blog.created_at || Date.now()).toLocaleDateString()}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Link href={`/insights/${blog.slug}`} target="_blank">
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-cyan-400">
                                                                <Globe size={14} />
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/admin/blogs/${blog.id}`}>
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-white">
                                                                <Pencil size={14} />
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            onClick={() => handleDelete(blog.id)}
                                                            className="h-7 w-7 text-slate-500 hover:text-red-400"
                                                        >
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }) : (
                                        <tr>
                                            <td colSpan={7} className="p-12 text-center text-slate-500">
                                                No articles found matching filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
