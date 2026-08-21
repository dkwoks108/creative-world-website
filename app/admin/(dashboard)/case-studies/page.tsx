"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, FolderKanban, Sparkles, X } from "lucide-react";

export default function AdminCaseStudies() {
    const [studies, setStudies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingStudy, setEditingStudy] = useState<any | null>(null);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        client: "",
        industry: "E-Commerce",
        summary: "",
        metrics: "+280% Revenue Surge",
        status: "Published",
    });

    useEffect(() => {
        fetchStudies();
    }, []);

    const fetchStudies = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/case-studies");
            if (res.ok) {
                const data = await res.json();
                setStudies(data);
            }
        } catch (error) {
            console.error("Failed to fetch case studies", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAdd = () => {
        setEditingStudy(null);
        setForm({
            title: "",
            slug: "",
            client: "",
            industry: "E-Commerce",
            summary: "",
            metrics: "+280% Revenue Surge",
            status: "Published",
        });
        setModalOpen(true);
    };

    const handleOpenEdit = (study: any) => {
        setEditingStudy(study);
        setForm({
            title: study.title || "",
            slug: study.slug || "",
            client: study.client || "",
            industry: study.industry || "E-Commerce",
            summary: study.summary || "",
            metrics: study.metrics || "+280% Growth",
            status: study.status || "Published",
        });
        setModalOpen(true);
    };

    const handleTitleChange = (val: string) => {
        const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        setForm(prev => ({
            ...prev,
            title: val,
            slug: editingStudy ? prev.slug : generatedSlug
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingStudy) {
            const res = await fetch("/api/admin/case-studies", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editingStudy.id, ...form }),
            });
            if (res.ok) {
                fetchStudies();
                setModalOpen(false);
            }
        } else {
            const res = await fetch("/api/admin/case-studies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                fetchStudies();
                setModalOpen(false);
            }
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
        setStudies(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
        await fetch("/api/admin/case-studies", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: newStatus }),
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this case study?")) return;
        setStudies(prev => prev.filter(s => s.id !== id));
        await fetch(`/api/admin/case-studies?id=${id}`, { method: "DELETE" });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 text-white pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <FolderKanban className="text-cyan-400" size={24} />
                        Case Studies & Portfolio CMS
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Showcase client transformation stories and verified metrics</p>
                </div>
                <Button 
                    onClick={handleOpenAdd}
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold gap-2 shadow-lg shadow-cyan-500/20 px-5 py-2.5 rounded-xl"
                >
                    <Plus size={18} /> Add Case Study
                </Button>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-6 w-full max-w-lg shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-[#1A2333] pb-4">
                            <h2 className="text-base font-bold text-white flex items-center gap-2">
                                <Sparkles className="text-cyan-400" size={18} />
                                {editingStudy ? "Edit Case Study" : "Add Case Study"}
                            </h2>
                            <button type="button" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">Project / Case Title *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="e.g., Scaling Luxury Fashion Brand to 10x ROI"
                                    value={form.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">Client Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="Royal Heritage Jewels"
                                        value={form.client}
                                        onChange={(e) => setForm({ ...form, client: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">Industry</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="Jewelry / E-Commerce"
                                        value={form.industry}
                                        onChange={(e) => setForm({ ...form, industry: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">Key Results Metrics</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
                                    placeholder="+340% Revenue | 5.2x ROAS"
                                    value={form.metrics}
                                    onChange={(e) => setForm({ ...form, metrics: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">Executive Summary</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="High-impact challenge and solution summary..."
                                    value={form.summary}
                                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                                <select
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                                    value={form.status}
                                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                                >
                                    <option value="Published">Published (Live)</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-[#1A2333]">
                            <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="border-[#1E293B] text-slate-300">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold px-6 shadow-lg shadow-cyan-500/20">
                                {editingStudy ? "Save Changes" : "Create Case Study"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />
                </div>
            ) : (
                <div className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0D121F] text-slate-400 font-semibold border-b border-[#1A2333]">
                            <tr>
                                <th className="p-4">Case Study</th>
                                <th className="p-4">Client</th>
                                <th className="p-4">Industry</th>
                                <th className="p-4">Verified Metrics</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2333]">
                            {studies.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">No case studies created yet.</td>
                                </tr>
                            ) : (
                                studies.map(study => (
                                    <tr key={study.id} className="hover:bg-[#0D121F]/60 transition-colors">
                                        <td className="p-4 font-semibold text-white text-sm">{study.title}</td>
                                        <td className="p-4 text-slate-300">{study.client || "-"}</td>
                                        <td className="p-4 text-slate-400 text-xs">{study.industry || "-"}</td>
                                        <td className="p-4 font-mono text-cyan-400 font-semibold">{study.metrics || "-"}</td>
                                        <td className="p-4">
                                            {study.status === 'Published' ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenEdit(study)}
                                                    className="h-8 w-8 text-slate-400 hover:text-white"
                                                >
                                                    <Pencil size={14} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleStatus(study.id, study.status)}
                                                    className="h-8 w-8 text-slate-400 hover:text-cyan-400"
                                                >
                                                    {study.status === 'Published' ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(study.id)}
                                                    className="h-8 w-8 text-slate-500 hover:text-red-400"
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
