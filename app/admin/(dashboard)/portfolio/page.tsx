"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Plus, Search, Trash2, Edit2, Globe, ExternalLink } from "lucide-react";

interface CaseStudyItem {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  summary: string;
  image?: string;
  status: string;
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<CaseStudyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    client: "",
    industry: "E-Commerce & Retail",
    summary: "",
    image: "/work-case-1.jpg",
    status: "Published",
  });

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.success) setItems(data.caseStudies);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({ title: "", slug: "", client: "", industry: "E-Commerce & Retail", summary: "", image: "/work-case-1.jpg", status: "Published" });
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0D121F] border border-[#1A2333] rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 p-[1px]">
            <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center text-cyan-400">
              <Briefcase size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              Portfolio & Case Studies Manager
            </h1>
            <p className="text-xs text-slate-400">
              Manage client success stories and project showcases synced live to `/work` and `/work/[slug]`.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all"
        >
          <Plus size={16} />
          <span>Add Case Study</span>
        </button>
      </div>

      {isLoading ? (
        <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
          Loading portfolio items...
        </div>
      ) : items.length === 0 ? (
        <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
          No case studies found. Click Add Case Study to create your first portfolio entry.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="p-5 bg-[#0D121F] border border-[#1A2333] hover:border-cyan-500/40 rounded-2xl space-y-3 transition-all">
              {item.image && (
                <div className="w-full h-36 rounded-xl overflow-hidden border border-[#1A2333]">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {item.industry}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{item.client}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{item.summary}</p>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D121F] border border-[#1A2333] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add Case Study</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-medium">Slug URL</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-cyan-400 font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium">Client Name</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 font-medium">Summary</label>
                <textarea
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={2}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#161F30] text-slate-300 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl">
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
