"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Users,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Clock,
  XCircle,
  FileEdit,
  ArrowUpRight,
  Layers,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [leadsRes, blogsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/blogs')
      ]);

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData);
      }

      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        setBlogs(blogsData);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => l.status === 'New' || l.status === 'Contacted' || l.status === 'Qualified').length;
  const totalBlogs = blogs.length;
  const conversionRate = totalLeads > 0 ? ((activeLeads / totalLeads) * 100).toFixed(0) : 0;

  const stats = [
    {
      label: "Total CRM Leads",
      value: totalLeads.toString(),
      change: "+14% MoM",
      subtext: "Jaipur Inquiries",
      icon: Users,
      gradient: "from-indigo-600 via-purple-600 to-cyan-500",
    },
    {
      label: "Active Pipelines",
      value: activeLeads.toString(),
      change: "+8% MoM",
      subtext: "Qualified Leads",
      icon: BarChart3,
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      label: "Published Insights",
      value: totalBlogs.toString(),
      change: "Active Articles",
      subtext: "CMS Total",
      icon: FileEdit,
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      label: "Lead Qualified Rate",
      value: `${conversionRate}%`,
      change: "+5.2%",
      subtext: "High Conversion",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-600",
    },
  ];

  const getStatusBadge = (status: string) => {
    const isSuccess = ['New', 'Contacted', 'Qualified', 'Published', 'PUBLISHED'].includes(status);
    const isPending = ['Draft', 'DRAFT', 'Pending'].includes(status);

    if (isSuccess) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 size={12} />
          {status}
        </span>
      );
    }

    if (isPending) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Clock size={12} />
          {status}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">
        <XCircle size={12} />
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto text-white space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-poppins text-white">Executive Control Overview</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              LIVE SYSTEM
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Real-time telemetry for Ceativee World Digital Infrastructure</p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/leads">
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/10 flex items-center gap-1.5">
              <span>View Leads CRM</span>
              <ArrowUpRight size={14} />
            </button>
          </Link>
          <Link href="/admin/blogs/new">
            <button className="px-4 py-2 bg-[#0D121F] border border-[#1E293B] text-cyan-400 text-xs font-semibold rounded-xl hover:bg-[#1A2333] transition-all flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Create Article</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn("p-3 rounded-xl bg-gradient-to-br text-white shadow-md", stat.gradient)}>
                <stat.icon size={20} />
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-cyan-400">{stat.change}</span>
                <p className="text-[10px] text-slate-500">{stat.subtext}</p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1 font-poppins">{stat.value}</h3>
              <p className="text-xs font-medium text-slate-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overview Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads Panel */}
        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1A2333]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users size={18} className="text-cyan-400" /> Recent CRM Leads
            </h2>
            <Link href="/admin/leads" className="text-xs text-cyan-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              <p className="text-slate-500 text-xs py-4 text-center">Loading leads...</p>
            ) : leads.length === 0 ? (
              <p className="text-slate-500 text-xs py-4 text-center">No leads recorded yet.</p>
            ) : (
              leads.slice(0, 4).map((lead: any) => (
                <div key={lead.id} className="p-3 bg-[#0D121F] border border-[#1E293B] rounded-xl flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold text-white truncate">{lead.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{lead.email}</p>
                  </div>
                  {getStatusBadge(lead.status || 'New')}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Blogs Panel */}
        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1A2333]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileEdit size={18} className="text-purple-400" /> Published Content
            </h2>
            <Link href="/admin/blogs" className="text-xs text-cyan-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              <p className="text-slate-500 text-xs py-4 text-center">Loading articles...</p>
            ) : blogs.length === 0 ? (
              <p className="text-slate-500 text-xs py-4 text-center">No articles available.</p>
            ) : (
              blogs.slice(0, 4).map((blog: any) => (
                <div key={blog.id} className="p-3 bg-[#0D121F] border border-[#1E293B] rounded-xl flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-semibold text-white truncate">{blog.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{blog.category?.name || "General"}</p>
                  </div>
                  {getStatusBadge(blog.status || 'PUBLISHED')}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Core System Telemetry */}
        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="pb-3 border-b border-[#1A2333]">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" /> Infrastructure Status
            </h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-[#0D121F] border border-[#1E293B] rounded-xl flex items-center justify-between">
              <span className="text-xs text-slate-300">SQLite Prisma DB</span>
              {getStatusBadge('PUBLISHED')}
            </div>
            <div className="p-3 bg-[#0D121F] border border-[#1E293B] rounded-xl flex items-center justify-between">
              <span className="text-xs text-slate-[#0D121F]-300">API Route Handlers</span>
              {getStatusBadge('PUBLISHED')}
            </div>
            <div className="p-3 bg-[#0D121F] border border-[#1E293B] rounded-xl flex items-center justify-between">
              <span className="text-xs text-slate-300">JWT Session Security</span>
              {getStatusBadge('PUBLISHED')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
