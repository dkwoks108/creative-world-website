"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, Loader2, Pencil, Trash2, Plus, Layers, Sparkles, CheckCircle2, X } from "lucide-react";

export default function AdminServices() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<any | null>(null);

    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        icon: "Globe",
        status: "Published",
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/services');
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAdd = () => {
        setEditingService(null);
        setForm({
            name: "",
            slug: "",
            description: "",
            icon: "Globe",
            status: "Published",
        });
        setModalOpen(true);
    };

    const handleOpenEdit = (service: any) => {
        setEditingService(service);
        setForm({
            name: service.name || "",
            slug: service.slug || "",
            description: service.description || "",
            icon: service.icon || "Globe",
            status: service.status || "Published",
        });
        setModalOpen(true);
    };

    const handleNameChange = (val: string) => {
        const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        setForm(prev => ({
            ...prev,
            name: val,
            slug: editingService ? prev.slug : generatedSlug
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingService) {
            // Update
            const res = await fetch('/api/admin/services', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editingService.id, ...form }),
            });
            if (res.ok) {
                fetchServices();
                setModalOpen(false);
            }
        } else {
            // Create
            const res = await fetch('/api/admin/services', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                fetchServices();
                setModalOpen(false);
            }
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';

        setServices(prev => prev.map(s =>
            s.id === id ? { ...s, status: newStatus } : s
        ));

        await fetch('/api/admin/services', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: newStatus }),
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        setServices(prev => prev.filter(s => s.id !== id));
        await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    };

    return (
        <div className="max-w-7xl mx-auto text-white space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <Layers className="text-cyan-400" size={24} />
                        Services Architecture CMS
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Manage public website service offerings & landing pages</p>
                </div>
                <Button 
                    onClick={handleOpenAdd}
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold gap-2 shadow-lg shadow-cyan-500/20 px-5 py-2.5 rounded-xl"
                >
                    <Plus size={18} /> Add New Service
                </Button>
            </div>

            {/* Add / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-6 w-full max-w-lg shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-[#1A2333] pb-4">
                            <h2 className="text-base font-bold text-white flex items-center gap-2">
                                <Sparkles className="text-cyan-400" size={18} />
                                {editingService ? "Edit Service Offering" : "Add Service Offering"}
                            </h2>
                            <button type="button" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">Service Title *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="e.g., SEO & Organic Growth Acceleration"
                                    value={form.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">URL Slug *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
                                    value={form.slug}
                                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">Service Description *</label>
                                <textarea
                                    rows={3}
                                    required
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="High-converting strategic description..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">Icon Identifier</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="Globe, TrendingUp, Code..."
                                        value={form.icon}
                                        onChange={(e) => setForm({ ...form, icon: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">Visibility Status</label>
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
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-[#1A2333]">
                            <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="border-[#1E293B] text-slate-300">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold px-6 shadow-lg shadow-cyan-500/20">
                                {editingService ? "Save Service Changes" : "Create Service"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Services Table */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />
                </div>
            ) : (
                <div className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0D121F] text-slate-400 font-semibold border-b border-[#1A2333]">
                            <tr>
                                <th className="p-4">Service Details</th>
                                <th className="p-4">URL Slug</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2333]">
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-slate-500">No services found in database.</td>
                                </tr>
                            ) : (
                                services.map(service => (
                                    <tr key={service.id} className="hover:bg-[#0D121F]/60 transition-colors">
                                        <td className="p-4">
                                            <p className="font-semibold text-white text-sm">{service.name}</p>
                                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{service.description}</p>
                                        </td>
                                        <td className="p-4 text-cyan-400 text-xs font-mono">
                                            /{service.slug}
                                        </td>
                                        <td className="p-4">
                                            {service.status === 'Published' ? (
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
                                                    onClick={() => handleOpenEdit(service)}
                                                    className="h-8 w-8 text-slate-400 hover:text-white"
                                                >
                                                    <Pencil size={14} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleStatus(service.id, service.status)}
                                                    className="h-8 w-8 text-slate-400 hover:text-cyan-400"
                                                >
                                                    {service.status === 'Published' ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(service.id)}
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
