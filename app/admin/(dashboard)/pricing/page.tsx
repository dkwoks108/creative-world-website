"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff, Tag, Sparkles, X } from "lucide-react";

export default function AdminPricing() {
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<any | null>(null);

    const [form, setForm] = useState({
        name: "",
        price: "₹49,999",
        billing_period: "/project",
        description: "",
        features: "Custom Next.js App\nSEO Optimization\n1 Year Support",
        is_popular: false,
        status: "Published",
    });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/pricing");
            if (res.ok) {
                const data = await res.json();
                setPlans(data);
            }
        } catch (error) {
            console.error("Failed to fetch pricing plans", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAdd = () => {
        setEditingPlan(null);
        setForm({
            name: "",
            price: "₹49,999",
            billing_period: "/project",
            description: "",
            features: "Custom Next.js Website\nSEO Optimization\nPerformance Speed Optimization",
            is_popular: false,
            status: "Published",
        });
        setModalOpen(true);
    };

    const handleOpenEdit = (plan: any) => {
        setEditingPlan(plan);
        let feats = plan.features;
        if (Array.isArray(feats)) feats = feats.join("\n");

        setForm({
            name: plan.name || "",
            price: plan.price || "",
            billing_period: plan.billing_period || "/project",
            description: plan.description || "",
            features: feats || "",
            is_popular: Boolean(plan.is_popular),
            status: plan.status || "Published",
        });
        setModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formattedFeatures = form.features.split("\n").filter(Boolean);

        if (editingPlan) {
            const res = await fetch("/api/admin/pricing", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: editingPlan.id, ...form, features: formattedFeatures }),
            });
            if (res.ok) {
                fetchPlans();
                setModalOpen(false);
            }
        } else {
            const res = await fetch("/api/admin/pricing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, features: formattedFeatures }),
            });
            if (res.ok) {
                fetchPlans();
                setModalOpen(false);
            }
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "Published" ? "Draft" : "Published";
        setPlans(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
        await fetch("/api/admin/pricing", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: newStatus }),
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this pricing plan?")) return;
        setPlans(prev => prev.filter(p => p.id !== id));
        await fetch(`/api/admin/pricing?id=${id}`, { method: "DELETE" });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 text-white pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <Tag className="text-cyan-400" size={24} />
                        Pricing Tiers CMS
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Manage public growth packages and subscription models</p>
                </div>
                <Button 
                    onClick={handleOpenAdd}
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold gap-2 shadow-lg shadow-cyan-500/20 px-5 py-2.5 rounded-xl"
                >
                    <Plus size={18} /> Add Pricing Tier
                </Button>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSubmit} className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-6 w-full max-w-lg shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-[#1A2333] pb-4">
                            <h2 className="text-base font-bold text-white flex items-center gap-2">
                                <Sparkles className="text-cyan-400" size={18} />
                                {editingPlan ? "Edit Pricing Tier" : "Add Pricing Tier"}
                            </h2>
                            <button type="button" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tier Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="Growth Core"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">Price Tag *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
                                        placeholder="₹49,999"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">Billing Period</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="/project or /month"
                                        value={form.billing_period}
                                        onChange={(e) => setForm({ ...form, billing_period: e.target.value })}
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

                            <div>
                                <label className="text-xs font-semibold text-slate-300 block mb-1">Included Features (1 per line)</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                                    value={form.features}
                                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="popular"
                                    className="rounded border-[#1E293B] bg-transparent text-cyan-400 cursor-pointer w-4 h-4"
                                    checked={form.is_popular}
                                    onChange={(e) => setForm({ ...form, is_popular: e.target.checked })}
                                />
                                <label htmlFor="popular" className="text-xs font-semibold text-amber-400 cursor-pointer">
                                    Highlight as &quot;Most Popular&quot; Tier
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-[#1A2333]">
                            <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="border-[#1E293B] text-slate-300">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold px-6 shadow-lg shadow-cyan-500/20">
                                {editingPlan ? "Save Plan Changes" : "Create Plan"}
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
                                <th className="p-4">Plan Tier</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Billing</th>
                                <th className="p-4">Popular Tag</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2333]">
                            {plans.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">No pricing plans found.</td>
                                </tr>
                            ) : (
                                plans.map(plan => (
                                    <tr key={plan.id} className="hover:bg-[#0D121F]/60 transition-colors">
                                        <td className="p-4 font-semibold text-white text-sm">{plan.name}</td>
                                        <td className="p-4 text-cyan-400 font-bold font-mono">{plan.price}</td>
                                        <td className="p-4 text-slate-400">{plan.billing_period}</td>
                                        <td className="p-4">
                                            {plan.is_popular ? (
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">Popular</span>
                                            ) : (
                                                <span className="text-slate-600">-</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {plan.status === 'Published' ? (
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
                                                    onClick={() => handleOpenEdit(plan)}
                                                    className="h-8 w-8 text-slate-400 hover:text-white"
                                                >
                                                    <Pencil size={14} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleStatus(plan.id, plan.status)}
                                                    className="h-8 w-8 text-slate-400 hover:text-cyan-400"
                                                >
                                                    {plan.status === 'Published' ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(plan.id)}
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
