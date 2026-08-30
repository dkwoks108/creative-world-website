"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Save,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  CheckCircle,
  LayoutGrid,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavMenuItem {
  id?: string;
  label: string;
  href: string;
  sortOrder: number;
}

export default function WebsiteControlCenterPage() {
  const [activeTab, setActiveTab] = useState<"general" | "branding" | "navigation" | "social">("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    company_name: "Creativee World",
    company_tagline: "Digital Growth & Performance Marketing Agency",
    company_phone: "+91 73571 59122",
    company_email: "marketing.creativeworld@gmail.com",
    company_whatsapp: "+91 73571 59122",
    company_address: "Creativee Tower, C-Scheme, Jaipur, Rajasthan 302001, India",
    google_maps_url: "https://maps.google.com/?q=C-Scheme+Jaipur",
    working_hours: "Mon - Sat: 9:30 AM - 7:00 PM",
    logo_url: "/logo-symbol.png",
    header_cta_label: "Book Strategy Audit",
    header_cta_href: "/contact",
    social_instagram: "https://instagram.com/creativeworld_in",
    social_linkedin: "https://linkedin.com/company/creativeworld-in",
    social_youtube: "https://youtube.com/@creativeworld_in",
    social_facebook: "https://facebook.com/creativeworld.in",
    social_x: "https://x.com/creativeworld_in",
  });

  // Navigation Items State
  const [navItems, setNavItems] = useState<NavMenuItem[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [newHref, setNewHref] = useState("");

  const loadData = async () => {
    try {
      const resSettings = await fetch("/api/admin/settings");
      const dataSettings = await resSettings.json();
      if (dataSettings.success && dataSettings.settings) {
        setSettings((prev) => ({ ...prev, ...dataSettings.settings }));
      }

      const resNav = await fetch("/api/admin/navigation");
      const dataNav = await resNav.json();
      if (dataNav.success && dataNav.items) {
        setNavItems(dataNav.items);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();

      const resNav = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: navItems }),
      });

      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const addNavItem = () => {
    if (newLabel && newHref) {
      setNavItems([...navItems, { label: newLabel, href: newHref, sortOrder: navItems.length + 1 }]);
      setNewLabel("");
      setNewHref("");
    }
  };

  const removeNavItem = (idx: number) => {
    setNavItems(navItems.filter((_, i) => i !== idx));
  };

  const moveNavItem = (idx: number, direction: "up" | "down") => {
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === navItems.length - 1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    const updated = [...navItems];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setNavItems(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0D121F] border border-[#1A2333] rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 p-[1px]">
            <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center text-cyan-400">
              <Globe size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              Website Control Center
            </h1>
            <p className="text-xs text-slate-400">
              Single Source of Truth: Edits here automatically reflect across all public website components.
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-cyan-500 to-teal-400 text-black text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all"
        >
          <Save size={16} />
          <span>{isSaving ? "Saving..." : "Save & Sync Website"}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle size={16} />
          <span>Global site settings saved! Frontend is automatically synchronized.</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#1A2333]">
        <button
          onClick={() => setActiveTab("general")}
          className={cn(
            "px-6 py-3 text-xs font-bold transition-all border-b-2",
            activeTab === "general"
              ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
              : "border-transparent text-slate-400 hover:text-white"
          )}
        >
          Company Information
        </button>
        <button
          onClick={() => setActiveTab("navigation")}
          className={cn(
            "px-6 py-3 text-xs font-bold transition-all border-b-2",
            activeTab === "navigation"
              ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
              : "border-transparent text-slate-400 hover:text-white"
          )}
        >
          Header Navigation Builder
        </button>
        <button
          onClick={() => setActiveTab("branding")}
          className={cn(
            "px-6 py-3 text-xs font-bold transition-all border-b-2",
            activeTab === "branding"
              ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
              : "border-transparent text-slate-400 hover:text-white"
          )}
        >
          Branding & CTA Button
        </button>
        <button
          onClick={() => setActiveTab("social")}
          className={cn(
            "px-6 py-3 text-xs font-bold transition-all border-b-2",
            activeTab === "social"
              ? "border-cyan-400 text-cyan-400 bg-cyan-500/5"
              : "border-transparent text-slate-400 hover:text-white"
          )}
        >
          Social Media Profiles
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-6 bg-[#0D121F] border border-[#1A2333] rounded-2xl space-y-6">
        {activeTab === "general" && (
          <div className="space-y-4 max-w-2xl text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-semibold">Company Name</label>
                <input
                  type="text"
                  value={settings.company_name}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold">Tagline</label>
                <input
                  type="text"
                  value={settings.company_tagline}
                  onChange={(e) => setSettings({ ...settings, company_tagline: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-400 font-semibold">Primary Phone</label>
                <input
                  type="text"
                  value={settings.company_phone}
                  onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-cyan-400 font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold">Contact Email</label>
                <input
                  type="email"
                  value={settings.company_email}
                  onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-cyan-400 font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold">WhatsApp Number</label>
                <input
                  type="text"
                  value={settings.company_whatsapp}
                  onChange={(e) => setSettings({ ...settings, company_whatsapp: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-emerald-400 font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold">Physical Address</label>
              <textarea
                value={settings.company_address}
                onChange={(e) => setSettings({ ...settings, company_address: e.target.value })}
                rows={2}
                className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === "navigation" && (
          <div className="space-y-6 max-w-2xl text-xs">
            <div className="p-4 bg-[#090D14] border border-[#1A2333] rounded-xl space-y-3">
              <span className="text-xs font-bold text-white">Add Navigation Item</span>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Label (e.g. Services)"
                  className="flex-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-1.5 text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={newHref}
                  onChange={(e) => setNewHref(e.target.value)}
                  placeholder="Target URL (e.g. /services)"
                  className="flex-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-1.5 text-white focus:outline-none"
                />
                <button
                  onClick={addNavItem}
                  className="px-4 py-1.5 bg-cyan-500 text-black font-bold rounded-xl"
                >
                  Add Item
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Current Menu Hierarchy (Drag/Reorder)
              </span>
              {navItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-[#141B2B] border border-[#222E45] rounded-xl text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-[#1E2B42] flex items-center justify-center font-mono text-[11px] text-cyan-400">
                      {idx + 1}
                    </span>
                    <span className="font-bold">{item.label}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{item.href}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveNavItem(idx, "up")} className="p-1 hover:text-cyan-400">
                      <MoveUp size={14} />
                    </button>
                    <button onClick={() => moveNavItem(idx, "down")} className="p-1 hover:text-cyan-400">
                      <MoveDown size={14} />
                    </button>
                    <button onClick={() => removeNavItem(idx)} className="p-1 text-red-400 hover:text-red-300">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "branding" && (
          <div className="space-y-4 max-w-2xl text-xs">
            <div>
              <label className="text-slate-400 font-semibold">Header Logo URL</label>
              <input
                type="text"
                value={settings.logo_url}
                onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-semibold">Header CTA Button Text</label>
                <input
                  type="text"
                  value={settings.header_cta_label}
                  onChange={(e) => setSettings({ ...settings, header_cta_label: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold">Header CTA Target Link</label>
                <input
                  type="text"
                  value={settings.header_cta_href}
                  onChange={(e) => setSettings({ ...settings, header_cta_href: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-4 max-w-2xl text-xs">
            <div>
              <label className="text-slate-400 font-semibold flex items-center gap-2">
                <Instagram size={14} className="text-pink-400" /> Instagram URL
              </label>
              <input
                type="text"
                value={settings.social_instagram}
                onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold flex items-center gap-2">
                <Linkedin size={14} className="text-blue-400" /> LinkedIn URL
              </label>
              <input
                type="text"
                value={settings.social_linkedin}
                onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
                className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
