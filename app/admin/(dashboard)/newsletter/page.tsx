"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Trash2, Mail, Download } from "lucide-react";

export default function AdminNewsletter() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/newsletter");
            if (res.ok) {
                const data = await res.json();
                setSubscribers(data);
            }
        } catch (error) {
            console.error("Failed to fetch newsletter subscribers", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Remove this subscriber?")) return;
        setSubscribers(prev => prev.filter(s => s.id !== id));
        await fetch(`/api/admin/newsletter?id=${id}`, { method: "DELETE" });
    };

    const handleExport = () => {
        if (subscribers.length === 0) return;
        const csvContent = "data:text/csv;charset=utf-8," + ["Email,Source,Status,Subscribed At", ...subscribers.map(s => `"${s.email}","${s.source}","${s.status}","${new Date(s.created_at || Date.now()).toLocaleDateString()}"`)].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "creativee_newsletter_subscribers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 text-white pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <Mail className="text-cyan-400" size={24} />
                        Newsletter Subscribers CMS
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Manage executive newsletter subscribers and marketing dispatch lists</p>
                </div>
                <Button onClick={handleExport} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold gap-2 shadow-lg shadow-cyan-500/20 px-5 py-2.5 rounded-xl">
                    <Download size={16} /> Export Subscribers CSV
                </Button>
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
                                <th className="p-4">Subscriber Email</th>
                                <th className="p-4">Capture Source</th>
                                <th className="p-4">Subscription Status</th>
                                <th className="p-4">Subscribed Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2333]">
                            {subscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">No newsletter subscribers yet.</td>
                                </tr>
                            ) : (
                                subscribers.map(sub => (
                                    <tr key={sub.id} className="hover:bg-[#0D121F]/60 transition-colors">
                                        <td className="p-4 font-semibold text-white text-sm font-mono">{sub.email}</td>
                                        <td className="p-4 text-slate-400">{sub.source || "Footer Opt-In"}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {sub.status || "Active"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 text-[10px] font-mono">
                                            {new Date(sub.created_at || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(sub.id)}
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
