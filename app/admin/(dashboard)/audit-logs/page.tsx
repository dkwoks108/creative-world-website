"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, History, Search, User, Clock, Filter, Terminal } from "lucide-react";

interface AuditLog {
  id: string;
  userId?: string;
  userName?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/audit-logs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLogs(data.logs);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.resource.toLowerCase().includes(search.toLowerCase()) ||
      (l.userName && l.userName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0D121F] border border-[#1A2333] rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[1px]">
            <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center text-emerald-400">
              <ShieldCheck size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              Security Audit Trail & Logs
            </h1>
            <p className="text-xs text-slate-400">
              Automated record of all administrative operations, settings updates, content mutations, and access attempts.
            </p>
          </div>
        </div>

        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit actions..."
            className="w-full pl-9 pr-3 py-2 bg-[#141B2B] border border-[#222E45] text-xs text-white rounded-xl focus:outline-none"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#0D121F] border border-[#1A2333] rounded-2xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading system audit records...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No audit log records found matching search query.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#090D14] border-b border-[#1A2333] text-slate-400 uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Timestamp</th>
                  <th className="px-6 py-3.5">User</th>
                  <th className="px-6 py-3.5">Action</th>
                  <th className="px-6 py-3.5">Entity Target</th>
                  <th className="px-6 py-3.5">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2333]">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-[#141B2B]/50 transition-colors">
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px] whitespace-nowrap flex items-center gap-1.5">
                      <Clock size={12} className="text-cyan-400" />
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <User size={12} className="text-slate-400" />
                        {log.userName || log.userId || "System Admin"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-mono ${
                          log.action.includes("DELETE")
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : log.action.includes("CREATE") || log.action.includes("POST")
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white font-mono text-[11px]">{log.resource}</td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px] truncate max-w-xs">
                      {log.details || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
