"use client";

import React, { useState, useEffect } from "react";
import { Users2, Plus, Mail, Linkedin, Trash2, Edit2 } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department?: string;
  photoUrl?: string;
  bio?: string;
  email?: string;
  linkedinUrl?: string;
  status: string;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "Executive",
    photoUrl: "/team/placeholder.jpg",
    bio: "",
    email: "",
    linkedinUrl: "",
    status: "Active",
  });

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (data.success) setMembers(data.members);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setFormData({ name: "", designation: "", department: "Executive", photoUrl: "/team/placeholder.jpg", bio: "", email: "", linkedinUrl: "", status: "Active" });
        fetchMembers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0D121F] border border-[#1A2333] rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500 p-[1px]">
            <div className="w-full h-full bg-[#0D121F] rounded-[11px] flex items-center justify-center text-cyan-400">
              <Users2 size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              Team & Leadership Directory
            </h1>
            <p className="text-xs text-slate-400">
              Manage agency team profiles and leadership dynamic display on `/about` and `/agency`.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all"
        >
          <Plus size={16} />
          <span>Add Team Member</span>
        </button>
      </div>

      {isLoading ? (
        <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
          Loading team directory...
        </div>
      ) : members.length === 0 ? (
        <div className="p-8 bg-[#0D121F] border border-[#1A2333] rounded-2xl text-center text-xs text-slate-400">
          No team members added yet. Click Add Team Member to populate leadership profile.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <div key={m.id} className="p-5 bg-[#0D121F] border border-[#1A2333] hover:border-cyan-500/40 rounded-2xl space-y-3 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-base shrink-0">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{m.name}</h3>
                  <p className="text-xs text-cyan-400">{m.designation}</p>
                </div>
              </div>
              {m.bio && <p className="text-xs text-slate-400 line-clamp-2">{m.bio}</p>}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D121F] border border-[#1A2333] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add Team Member</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
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
                <label className="text-slate-400 font-medium">Designation / Role</label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full mt-1 bg-[#141B2B] border border-[#222E45] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-[#161F30] text-slate-300 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl">
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
