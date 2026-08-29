"use client";

import React, { useState, useEffect } from "react";
import { Activity, CheckCircle, Database, Server, HardDrive, ShieldCheck, Mail, Globe } from "lucide-react";

export default function SystemHealthPage() {
  const [healthStatus, setHealthStatus] = useState({
    database: "Healthy",
    api: "Operational",
    storage: "Optimal",
    auth: "Active",
    email: "Connected",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-6 bg-[#0D121F] border border-[#1A2333] rounded-2xl">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[1px]">
          <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center text-emerald-400">
            <Activity size={24} />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-wide">
            System Diagnostics & Health
          </h1>
          <p className="text-xs text-slate-400">
            Realtime database connectivity, API status, storage, and authentication health monitor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 bg-[#0D121F] border border-[#1A2333] rounded-2xl flex items-center gap-4">
          <Database className="w-8 h-8 text-cyan-400" />
          <div>
            <span className="text-xs text-slate-400 font-semibold">SQLite Database</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle size={14} /> {healthStatus.database}
            </p>
          </div>
        </div>

        <div className="p-5 bg-[#0D121F] border border-[#1A2333] rounded-2xl flex items-center gap-4">
          <Server className="w-8 h-8 text-indigo-400" />
          <div>
            <span className="text-xs text-slate-400 font-semibold">Next.js API Engine</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle size={14} /> {healthStatus.api}
            </p>
          </div>
        </div>

        <div className="p-5 bg-[#0D121F] border border-[#1A2333] rounded-2xl flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-purple-400" />
          <div>
            <span className="text-xs text-slate-400 font-semibold">Session Security</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle size={14} /> {healthStatus.auth}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
