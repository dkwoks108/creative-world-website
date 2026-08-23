"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Trash2, Bot, Mail, Phone, Clock, Sparkles } from "lucide-react";

export default function AdminChatbotLeads() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/chatbot-leads");
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (error) {
            console.error("Failed to fetch chatbot leads", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this chatbot lead?")) return;
        setLeads(prev => prev.filter(l => l.id !== id));
        await fetch(`/api/admin/chatbot-leads?id=${id}`, { method: "DELETE" });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 text-white pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <Bot className="text-cyan-400" size={24} />
                        AI Conversational Assistant Leads
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Real-time qualified prospect captures from the AI sales agent</p>
                </div>
                <div className="flex items-center gap-2 bg-[#0D121F] border border-[#1E293B] px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                    <Sparkles size={14} /> Automated Ingest
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />
                </div>
            ) : (
                <div className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0D121F] text-slate-400 font-semibold border-b border-[#1A2333]">
                            <tr>
                                <th className="p-4">Lead Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Pipeline Status</th>
                                <th className="p-4">Captured Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2333]">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">No chatbot leads captured yet.</td>
                                </tr>
                            ) : (
                                leads.map(lead => (
                                    <tr key={lead.id} className="hover:bg-[#0D121F]/60 transition-colors">
                                        <td className="p-4 font-semibold text-white text-sm">{lead.name || "Anonymous Prospect"}</td>
                                        <td className="p-4 text-slate-300 font-mono">{lead.email || "-"}</td>
                                        <td className="p-4 text-slate-400 font-mono">{lead.phone || "-"}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                                {lead.status || "Captured"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 text-[10px] font-mono">
                                            {new Date(lead.created_at || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(lead.id)}
                                                className="h-8 w-8 text-slate-500 hover:text-red-400"
                                            >
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
        </div>
    );
}
