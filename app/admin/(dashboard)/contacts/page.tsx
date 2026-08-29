"use client";

import React, { useState, useEffect } from "react";
import { Contact as ContactIcon, Plus, Search, Mail, Phone, Building, Tag, UserCheck, Shield } from "lucide-react";

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  role?: string;
  type: string;
  tags?: string;
  createdAt: string;
}

export default function ContactsCRMPage() {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    role: "",
    type: "Lead",
    tags: "",
  });

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setFormData({ name: "", email: "", phone: "", companyName: "", role: "", type: "Lead", tags: "" });
        fetchContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0D121F] border border-[#1A2333] rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 p-[1px]">
            <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center text-cyan-400">
              <ContactIcon size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              CRM Contacts & Directory
            </h1>
            <p className="text-xs text-slate-400">
              Central customer directory for leads, active clients, prospects, and companies.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all"
        >
          <Plus size={16} />
          <span>Add New Contact</span>
        </button>
      </div>

      {/* Contacts Grid */}
      {isLoading ? (
        <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
          Loading CRM contacts directory...
        </div>
      ) : contacts.length === 0 ? (
        <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
          No contacts found in CRM. Add contacts or receive web inquiries to populate.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="p-5 bg-[#0D121F] border border-[#1A2333] hover:border-cyan-500/40 rounded-2xl space-y-3 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{c.name}</h3>
                    <p className="text-xs text-cyan-400">{c.role || c.type}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {c.type}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-[#1A2333]">
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-cyan-400 shrink-0" />
                  <span className="truncate">{c.email}</span>
                </div>
                {c.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-emerald-400 shrink-0" />
                    <span>{c.phone}</span>
                  </div>
                )}
                {c.companyName && (
                  <div className="flex items-center gap-2">
                    <Building size={13} className="text-indigo-400 shrink-0" />
                    <span>{c.companyName}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D121F] border border-[#1A2333] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add CRM Contact</h3>
            <form onSubmit={handleSaveContact} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-medium">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#161F30] text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
