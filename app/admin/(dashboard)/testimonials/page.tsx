"use client";

import React, { useState, useEffect } from "react";
import { Star, Plus, Quote, Trash2, Edit2 } from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  company?: string;
  designation?: string;
  rating: number;
  quote: string;
  status: string;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    company: "",
    designation: "CEO",
    rating: 5,
    quote: "",
    status: "Approved",
  });

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.success) setItems(data.testimonials);
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
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({ clientName: "", company: "", designation: "CEO", rating: 5, quote: "", status: "Approved" });
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
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-cyan-500 p-[1px]">
            <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center text-amber-400">
              <Star size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              Client Testimonials & Reviews
            </h1>
            <p className="text-xs text-slate-400">
              Manage client reviews and social proof blocks displayed on homepage and service pages.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all"
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {isLoading ? (
        <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
          Loading client testimonials...
        </div>
      ) : items.length === 0 ? (
        <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
          No testimonials added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <div key={t.id} className="p-5 bg-[#0D121F] border border-[#1A2333] hover:border-cyan-500/40 rounded-2xl space-y-3 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  {t.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 italic">&quot;{t.quote}&quot;</p>
              <div className="pt-2 border-t border-[#1A2333]">
                <h4 className="text-xs font-bold text-white">{t.clientName}</h4>
                <p className="text-[11px] text-slate-400">{t.designation} {t.company && `• ${t.company}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D121F] border border-[#1A2333] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add Testimonial</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium">Client Name</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium">Quote / Feedback</label>
                <textarea
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  rows={3}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#161F30] text-slate-300 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl">
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
