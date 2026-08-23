"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Download,
    RefreshCw,
    X,
    Save,
    Trash2,
    Users,
    Sparkles,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const [selectedLead, setSelectedLead] = useState<any | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const [addForm, setAddForm] = useState({
        name: "",
        email: "",
        phone: "",
        service: "Websites",
        company_name: "",
        budget_range: "₹50k - ₹1L",
        message: "Manually entered lead via Admin Portal",
        status: "New",
        priority: "Medium"
    });

    const [editForm, setEditForm] = useState({
        company_name: "",
        budget_range: "",
        notes: "",
        status: "",
        priority: "Medium",
    });

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/leads");
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addForm)
            });
            if (res.ok) {
                fetchLeads();
                setIsAddOpen(false);
            }
        } catch (err) {
            console.error("Failed to add lead", err);
        } finally {
            setSaving(false);
        }
    };

    const openEditModal = (lead: any) => {
        setSelectedLead(lead);
        setEditForm({
            company_name: lead.company_name || "",
            budget_range: lead.budget_range || "",
            notes: lead.notes || "",
            status: lead.status || "New",
            priority: lead.priority || "Medium",
        });
        setIsEditOpen(true);
    };

    const handleSaveLead = async () => {
        if (!selectedLead) return;
        setSaving(true);
        try {
            const res = await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedLead.id, ...editForm })
            });

            if (res.ok) {
                const updatedLead = await res.json();
                setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, ...updatedLead } : l));
                setIsEditOpen(false);
            }
        } catch (error) {
            console.error("Failed to save lead", error);
        } finally {
            setSaving(false);
        }
    };

    const deleteLead = async (id: string) => {
        if (!confirm("Delete this CRM lead?")) return;
        try {
            const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setLeads(leads.filter(l => l.id !== id));
                if (selectedLead?.id === id) setIsEditOpen(false);
            }
        } catch (error) {
            console.error("Failed to delete lead", error);
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = (lead.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lead.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lead.company_name || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || lead.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleExport = () => {
        if (filteredLeads.length === 0) return alert("No leads to export");

        const headers = ["Name", "Email", "Phone", "Service", "Company", "Status", "Date"];
        const csvRows = [headers.join(",")];

        filteredLeads.forEach(lead => {
            csvRows.push([
                `"${lead.name}"`,
                `"${lead.email}"`,
                `"${lead.phone || ''}"`,
                `"${lead.service || ''}"`,
                `"${lead.company_name || ''}"`,
                `"${lead.status}"`,
                `"${new Date(lead.createdAt || Date.now()).toLocaleDateString()}"`
            ].join(","));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", `ceativee_leads.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "New": return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">New</span>;
            case "Contacted": return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Contacted</span>;
            case "Qualified": return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Qualified</span>;
            case "Closed Won": return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Closed Won</span>;
            default: return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">{status}</span>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 text-white pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <Users className="text-cyan-400" size={24} />
                        Leads & Inquiries CRM
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Manage pipeline, client status, and internal communications</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => setIsAddOpen(true)} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold gap-2 shadow-lg shadow-cyan-500/20 px-5 py-2.5 rounded-xl">
                        <Plus size={18} /> Add Lead
                    </Button>
                    <Button onClick={handleExport} variant="outline" className="border-[#1E293B] text-slate-300 gap-2">
                        <Download size={16} /> Export CSV
                    </Button>
                </div>
            </div>

            {/* Add Lead Modal */}
            {isAddOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleCreateLead} className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-4 w-full max-w-lg shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-[#1A2333] pb-4">
                            <h2 className="text-base font-bold text-white flex items-center gap-2">
                                <Sparkles className="text-cyan-400" size={18} />
                                Create New CRM Lead
                            </h2>
                            <button type="button" onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-slate-300 block mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                                    value={addForm.name}
                                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-300 block mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                                    value={addForm.email}
                                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-slate-300 block mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                                    value={addForm.phone}
                                    onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-300 block mb-1">Company / Brand</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                                    value={addForm.company_name}
                                    onChange={(e) => setAddForm({ ...addForm, company_name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-slate-300 block mb-1">Inquiry / Requirements</label>
                            <textarea
                                rows={3}
                                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                                value={addForm.message}
                                onChange={(e) => setAddForm({ ...addForm, message: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-[#1A2333]">
                            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="border-[#1E293B] text-slate-300">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={saving} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold px-6 shadow-lg shadow-cyan-500/20">
                                {saving ? "Saving..." : "Add Lead"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filter Bar */}
            <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search leads by name, email, company..."
                        className="w-full pl-10 pr-4 py-2 bg-[#0D121F] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
                    {["All", "New", "Contacted", "Qualified", "Closed Won"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={cn(
                                "px-3 py-1 rounded-xl text-xs font-medium transition-all whitespace-nowrap",
                                filterStatus === status
                                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <RefreshCw className="animate-spin text-cyan-400 w-8 h-8" />
                </div>
            ) : (
                <div className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0D121F] text-slate-400 font-semibold border-b border-[#1A2333]">
                            <tr>
                                <th className="p-4">Lead Name</th>
                                <th className="p-4">Contact</th>
                                <th className="p-4">Company</th>
                                <th className="p-4">Service</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2333]">
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">No leads recorded.</td>
                                </tr>
                            ) : (
                                filteredLeads.map(lead => (
                                    <tr key={lead.id} className="hover:bg-[#0D121F]/60 transition-colors cursor-pointer" onClick={() => openEditModal(lead)}>
                                        <td className="p-4 font-semibold text-white text-sm">{lead.name}</td>
                                        <td className="p-4 text-slate-300">
                                            <p>{lead.email}</p>
                                            <p className="text-[10px] text-slate-500">{lead.phone || "No phone"}</p>
                                        </td>
                                        <td className="p-4 text-slate-400">{lead.company_name || "-"}</td>
                                        <td className="p-4 text-cyan-400 font-medium">{lead.service || "General"}</td>
                                        <td className="p-4">{getStatusBadge(lead.status || "New")}</td>
                                        <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="icon" onClick={() => deleteLead(lead.id)} className="h-8 w-8 text-slate-500 hover:text-red-400">
                                                <Trash2 size={14} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Drawer */}
            <AnimatePresence>
                {isEditOpen && selectedLead && (
                    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setIsEditOpen(false)} />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="relative w-full max-w-lg bg-[#111622] border-l border-[#1E293B] h-full overflow-y-auto p-6 space-y-6 z-10 shadow-2xl">
                            <div className="flex items-center justify-between border-b border-[#1A2333] pb-4">
                                <div>
                                    <h2 className="text-lg font-bold text-white">{selectedLead.name}</h2>
                                    <p className="text-xs text-cyan-400 font-mono">{selectedLead.email}</p>
                                </div>
                                <button onClick={() => setIsEditOpen(false)} className="p-2 text-slate-400 hover:text-white">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-4 text-xs">
                                <div className="p-3 bg-[#0D121F] border border-[#1E293B] rounded-xl space-y-1">
                                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Inquiry Note</span>
                                    <p className="text-slate-200">{selectedLead.message}</p>
                                </div>

                                <div>
                                    <label className="text-slate-300 block mb-1 font-semibold">Lead Pipeline Status</label>
                                    <select
                                        className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                    >
                                        {["New", "Contacted", "Qualified", "Closed Won", "Closed Lost"].map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-slate-300 block mb-1 font-semibold">Internal CRM Notes</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="Add phone call summary, client budget details..."
                                        value={editForm.notes}
                                        onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-[#1A2333]">
                                    <Button onClick={handleSaveLead} disabled={saving} className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/20">
                                        <Save size={14} className="mr-1.5" /> Save CRM Record
                                    </Button>
                                    <Button variant="outline" onClick={() => deleteLead(selectedLead.id)} className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
