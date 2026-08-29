"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  Send,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Globe,
  Tag,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InquiryEvent {
  id: string;
  eventType: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

interface InquiryFollowup {
  id: string;
  dueDate: string;
  status: string;
  notes: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  service?: string;
  budget?: string;
  message: string;
  status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost" | "Spam";
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  events?: InquiryEvent[];
  followups?: InquiryFollowup[];
  createdAt: string;
}

const STAGES = [
  "All",
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
  "Spam",
];

export default function InquiriesCRMPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedStage, setSelectedStage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);

  // Note & Follow-up form state
  const [newNote, setNewNote] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStage !== "All") params.append("status", selectedStage);
      if (searchQuery) params.append("search", searchQuery);

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [selectedStage, searchQuery]);

  const updateStatus = async (id: string, newStatus: string) => {
    setStatusUpdating(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          eventDescription: `Status updated to ${newStatus}`,
          note: newNote ? newNote : undefined,
          followupDate: followupDate ? followupDate : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewNote("");
        setFollowupDate("");
        fetchInquiries();
        if (activeInquiry?.id === id) {
          setActiveInquiry(data.inquiry);
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "Contacted":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Qualified":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      case "Proposal Sent":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Won":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Lost":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0D121F] border border-[#1A2333] rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-[1px]">
            <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center text-cyan-400">
              <Inbox size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              Inquiries & CRM Lead Pipeline
            </h1>
            <p className="text-xs text-slate-400">
              Real-time lead tracking, attribution analytics, and event timeline tracing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
            {inquiries.length} Total Inquiries
          </span>
        </div>
      </div>

      {/* Stage Pipeline Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Stages Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-[#0D121F] border border-[#1A2333] rounded-xl">
          {STAGES.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                selectedStage === stage
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-[#141B2B]"
              )}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-2.5 text-slate-400" size={15} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries, email, service..."
            className="w-full pl-9 pr-4 py-2 bg-[#0D121F] border border-[#1A2333] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </div>
      </div>

      {/* Table & Detail Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries Table / Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          {isLoading ? (
            <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
              Loading CRM lead records...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
              No inquiries found in this pipeline stage.
            </div>
          ) : (
            inquiries.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveInquiry(item)}
                className={cn(
                  "p-4 bg-[#0D121F] border rounded-2xl transition-all cursor-pointer hover:border-cyan-500/40 space-y-3",
                  activeInquiry?.id === item.id
                    ? "border-cyan-500 bg-[#111827]"
                    : "border-[#1A2333]"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-2">
                        <span>{item.email}</span>
                        {item.companyName && (
                          <span className="text-cyan-400">
                            • {item.companyName}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                      getStatusBadge(item.status)
                    )}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 bg-[#090D14] p-2.5 rounded-xl border border-[#1A2333]">
                  "{item.message}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Tag size={12} className="text-cyan-400" />
                      {item.service || "General Inquiry"}
                    </span>
                    {item.budget && (
                      <span className="text-emerald-400">
                        Budget: {item.budget}
                      </span>
                    )}
                  </div>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Lead CRM Drawer Detail (1 col) */}
        <div className="lg:col-span-1">
          {activeInquiry ? (
            <div className="p-5 bg-[#0D121F] border border-[#1A2333] rounded-2xl space-y-6 sticky top-6">
              <div className="flex items-center justify-between border-b border-[#1A2333] pb-4">
                <div>
                  <h2 className="text-base font-bold text-white">
                    {activeInquiry.name}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Lead ID: {activeInquiry.id.slice(0, 8)}
                  </p>
                </div>
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-bold border",
                    getStatusBadge(activeInquiry.status)
                  )}
                >
                  {activeInquiry.status}
                </span>
              </div>

              {/* Contact Info Card */}
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-cyan-400 shrink-0" />
                  <a
                    href={`mailto:${activeInquiry.email}`}
                    className="hover:underline text-cyan-300"
                  >
                    {activeInquiry.email}
                  </a>
                </div>
                {activeInquiry.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-emerald-400 shrink-0" />
                    <span>{activeInquiry.phone}</span>
                  </div>
                )}
                {activeInquiry.companyName && (
                  <div className="flex items-center gap-2">
                    <Building size={14} className="text-indigo-400 shrink-0" />
                    <span>{activeInquiry.companyName}</span>
                  </div>
                )}
              </div>

              {/* Requirement & Budget */}
              <div className="p-3 bg-[#090D14] rounded-xl border border-[#1A2333] space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Requirement Details
                </span>
                <p className="text-xs font-semibold text-white">
                  Service: {activeInquiry.service || "General"}
                </p>
                {activeInquiry.budget && (
                  <p className="text-xs text-emerald-400 font-medium">
                    Estimated Budget: {activeInquiry.budget}
                  </p>
                )}
                <p className="text-xs text-slate-300 pt-1">
                  "{activeInquiry.message}"
                </p>
              </div>

              {/* Marketing Attribution */}
              <div className="p-3 bg-[#090D14] rounded-xl border border-[#1A2333] space-y-1.5 text-[11px]">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Globe size={11} className="text-cyan-400" /> Attribution & Source
                </span>
                <p className="text-slate-300">Source: <span className="text-white font-medium">{activeInquiry.source}</span></p>
                {activeInquiry.utmSource && (
                  <p className="text-slate-400">UTM Source: <span className="text-cyan-400">{activeInquiry.utmSource}</span></p>
                )}
              </div>

              {/* Pipeline Action Controls */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Update Lead Stage
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STAGES.filter((s) => s !== "All").map((stage) => (
                    <button
                      key={stage}
                      onClick={() => updateStatus(activeInquiry.id, stage)}
                      disabled={statusUpdating}
                      className={cn(
                        "py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all text-center",
                        activeInquiry.status === stage
                          ? "bg-cyan-500 text-black font-bold border-cyan-400"
                          : "bg-[#111622] text-slate-300 border-[#1E293B] hover:border-cyan-500/50"
                      )}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity Timeline Events */}
              <div className="space-y-2.5 pt-2 border-t border-[#1A2333]">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={13} className="text-cyan-400" /> Activity Timeline
                </span>
                <div className="space-y-2 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1E293B]">
                  {activeInquiry.events && activeInquiry.events.length > 0 ? (
                    activeInquiry.events.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-2 rounded-lg bg-[#090D14] border border-[#1A2333] text-[11px] space-y-0.5"
                      >
                        <div className="flex items-center justify-between text-cyan-400 font-semibold">
                          <span>{evt.eventType}</span>
                          <span className="text-slate-500 text-[10px]">
                            {new Date(evt.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-slate-300">{evt.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500">
                      No events recorded yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-500">
              Select an inquiry to view complete CRM details, activity timeline, and pipeline actions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
