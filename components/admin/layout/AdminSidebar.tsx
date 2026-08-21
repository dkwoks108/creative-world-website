"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  LogOut,
  ChevronRight,
  Shield,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { allNavItems } from "@/admin/config/navigation";
import { UserProfile } from "@/admin/types/admin";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [siteName, setSiteName] = useState("CEATIVEE WORLD");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          if (data.settings.site_name) setSiteName(data.settings.site_name);
          if (data.settings.logo_url) setLogoUrl(data.settings.logo_url);
        }
      })
      .catch(err => console.error("Sidebar: settings error:", err));

    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          setUser(data.user);
        }
      })
      .catch(err => console.error("Sidebar: auth/me error:", err));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 bg-[#111622] text-cyan-400 border border-cyan-500/30 rounded-xl md:hidden shadow-xl hover:bg-[#1A2333] transition-all"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "w-64 bg-[#090D14] border-r border-[#1A2333] h-screen flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300 md:translate-x-0 shadow-2xl",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand Header */}
        <div className="p-5 border-b border-[#1A2333]/80 bg-[#090D14]/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden p-[1px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shrink-0 shadow-lg shadow-cyan-500/10">
              <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center">
                {logoUrl ? (
                  <img src={logoUrl} alt={siteName} className="w-full h-full object-cover" />
                ) : (
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                )}
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-white tracking-wider uppercase truncate">
                {siteName}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                ADMIN PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto no-scrollbar space-y-1">
          <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Main Management
          </p>
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href && item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href || "#"}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white hover:bg-[#111622] hover:border-[#1E293B]"
                )}
              >
                <Icon size={18} className={cn(
                  "transition-all shrink-0",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-cyan-400"
                )} />
                <span className="flex-1 truncate">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer User Info + Logout */}
        <div className="p-3 border-t border-[#1A2333] bg-[#0D121F]/40 space-y-2">
          {user && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#111622] border border-[#1E293B]">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-cyan-400 truncate flex items-center gap-1">
                  <Shield size={10} />
                  {user.role_name}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-semibold text-slate-400 hover:text-red-400 bg-[#111622] hover:bg-red-500/10 border border-[#1E293B] hover:border-red-500/20 rounded-xl transition-all group"
          >
            <LogOut size={15} className="group-hover:text-red-400" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
