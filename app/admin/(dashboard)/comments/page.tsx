"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Trash2, CheckCircle, XCircle, MessageSquare } from "lucide-react";

export default function AdminComments() {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/comments");
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.error("Failed to fetch comments", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c));
        await fetch("/api/admin/comments", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this comment?")) return;
        setComments(prev => prev.filter(c => c.id !== id));
        await fetch(`/api/admin/comments?id=${id}`, { method: "DELETE" });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 text-white pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <MessageSquare className="text-cyan-400" size={24} />
                        Blog Comments Moderation
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Review, approve, or delete visitor comments across articles</p>
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
                                <th className="p-4">Author</th>
                                <th className="p-4">Comment Content</th>
                                <th className="p-4">Moderation Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2333]">
                            {comments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">No comments to moderate.</td>
                                </tr>
                            ) : (
                                comments.map(comment => (
                                    <tr key={comment.id} className="hover:bg-[#0D121F]/60 transition-colors">
                                        <td className="p-4 font-semibold text-white">
                                            <div>{comment.name}</div>
                                            <div className="text-[10px] text-slate-500 font-mono">{comment.email}</div>
                                        </td>
                                        <td className="p-4 text-slate-300 max-w-md line-clamp-2">{comment.content}</td>
                                        <td className="p-4">
                                            {comment.status === 'Approved' ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Approved</span>
                                            ) : comment.status === 'Rejected' ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">Rejected</span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Pending</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-slate-500 text-[10px] font-mono">
                                            {new Date(comment.created_at || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {comment.status !== 'Approved' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => updateStatus(comment.id, 'Approved')}
                                                        className="h-8 w-8 text-emerald-400 hover:bg-emerald-500/10"
                                                    >
                                                        <CheckCircle size={14} />
                                                    </Button>
                                                )}
                                                {comment.status !== 'Rejected' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => updateStatus(comment.id, 'Rejected')}
                                                        className="h-8 w-8 text-amber-400 hover:bg-amber-500/10"
                                                    >
                                                        <XCircle size={14} />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(comment.id)}
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
