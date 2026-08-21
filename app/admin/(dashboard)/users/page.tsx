"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Trash2, UserPlus, Shield, Sparkles, X } from "lucide-react";

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [adding, setAdding] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "ADMIN" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setAdding(true);
        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setIsAddOpen(false);
                setForm({ name: "", email: "", password: "", role: "ADMIN" });
                fetchUsers();
            } else {
                const err = await res.json();
                alert(err.error || "Failed to create user");
            }
        } catch (error) {
            console.error("Error creating user", error);
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this admin user?")) return;
        setUsers(prev => prev.filter(u => u.id !== id));
        await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 text-white pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                        <Shield className="text-cyan-400" size={24} />
                        Executive Team & Role Security
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Manage portal administrator credentials and access levels</p>
                </div>
                <Button onClick={() => setIsAddOpen(true)} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold gap-2 shadow-lg shadow-cyan-500/20 px-5 py-2.5 rounded-xl">
                    <UserPlus size={18} /> Provision Admin Account
                </Button>
            </div>

            {/* Modal */}
            {isAddOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleCreateUser} className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-4 w-full max-w-lg shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-[#1A2333] pb-4">
                            <h2 className="text-base font-bold text-white flex items-center gap-2">
                                <Sparkles className="text-cyan-400" size={18} />
                                Create Admin Account
                            </h2>
                            <button type="button" onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div>
                                <label className="text-slate-300 block mb-1 font-semibold">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 block mb-1 font-semibold">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-slate-300 block mb-1 font-semibold">Password *</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 font-mono"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-[#1A2333]">
                            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="border-[#1E293B] text-slate-300">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={adding} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold px-6 shadow-lg shadow-cyan-500/20">
                                {adding ? "Provisioning..." : "Create Account"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />
                </div>
            ) : (
                <div className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0D121F] text-slate-400 font-semibold border-b border-[#1A2333]">
                            <tr>
                                <th className="p-4">Administrator</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role Access</th>
                                <th className="p-4">Provisioned Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2333]">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">No admin users found.</td>
                                </tr>
                            ) : (
                                users.map(user => (
                                    <tr key={user.id} className="hover:bg-[#0D121F]/60 transition-colors">
                                        <td className="p-4 font-semibold text-white text-sm">{user.name}</td>
                                        <td className="p-4 text-slate-300 font-mono">{user.email}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                                {user.role_name || user.role || "ADMIN"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 text-[10px] font-mono">
                                            {new Date(user.created_at || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(user.id)}
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
