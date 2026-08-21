"use client";

import { Bell, Search, User, Globe, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

type UserProfile = {
    id: string;
    name: string;
    email: string;
    role_name: string;
};

export function AdminHeader() {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.user) {
                    setUser(data.user);
                }
            })
            .catch(err => console.error("Header: auth/me error:", err));
    }, []);

    return (
        <header className="flex items-center justify-between px-8 py-4 bg-[#090D14]/80 backdrop-blur-xl border-b border-[#1A2333] sticky top-0 z-30 shadow-lg">
            {/* Search */}
            <div className="relative w-80 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-2 text-xs border border-[#1E293B] rounded-xl bg-[#111622] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    placeholder="Search leads, posts, services..."
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                {/* View Website Link */}
                <Link 
                    href="/" 
                    target="_blank"
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 rounded-lg transition-all"
                >
                    <Globe size={14} />
                    <span>View Public Site</span>
                    <ExternalLink size={12} />
                </Link>

                {/* Notifications */}
                <button className="p-2 rounded-xl bg-[#111622] border border-[#1E293B] text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-[#1A2333]">
                    <div className="flex flex-col text-right hidden sm:block">
                        <span className="text-xs font-semibold text-white">
                            {user?.name || "Admin"}
                        </span>
                        <span className="text-[10px] text-cyan-400 font-mono">
                            {user?.role_name || "Super Admin"}
                        </span>
                    </div>
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-[1px] shadow-md shadow-cyan-500/10">
                        <div className="h-full w-full rounded-[11px] bg-[#0D121F] flex items-center justify-center overflow-hidden">
                            {user ? (
                                <span className="text-xs font-bold text-cyan-400">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            ) : (
                                <User className="h-4 w-4 text-slate-400" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
