"use client";

import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Search, Plus, Check, X } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  title: string;
  altText?: string;
  mediaType: string;
}

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: { url: string; altText?: string; title?: string }) => void;
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelect,
}: MediaLibraryModalProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedAlt, setSelectedAlt] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetch("/api/admin/media")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.media) {
            setMediaList(data.media);
          }
        })
        .catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = mediaList.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.url.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    const finalUrl = selectedUrl || customUrl;
    if (finalUrl) {
      onSelect({ url: finalUrl, altText: selectedAlt });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0D121F] border border-[#1A2333] rounded-2xl w-full max-w-3xl h-[600px] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#1A2333] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Agency Media Library
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Grid */}
          <div className="flex-1 p-4 flex flex-col space-y-3 overflow-hidden border-r border-[#1A2333]">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search media assets..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#141B2B] border border-[#222E45] text-xs text-white rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-3 p-1 scrollbar-thin scrollbar-thumb-[#1E293B]">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedUrl(item.url);
                    setSelectedAlt(item.altText || item.title);
                  }}
                  className={`relative group rounded-xl overflow-hidden border cursor-pointer aspect-video bg-[#141B2B] transition-all ${
                    selectedUrl === item.url
                      ? "border-cyan-400 ring-2 ring-cyan-500/30"
                      : "border-[#222E45] hover:border-slate-400"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedUrl === item.url && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold">
                      <Check size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Asset Specs & Custom Input */}
          <div className="w-72 p-4 space-y-4 text-xs bg-[#090D14] flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                Asset Attributes
              </span>

              {selectedUrl ? (
                <div className="space-y-3">
                  <div className="w-full h-32 rounded-xl overflow-hidden border border-[#222E45]">
                    <img src={selectedUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold">Image Alt Text (SEO)</label>
                    <input
                      type="text"
                      value={selectedAlt}
                      onChange={(e) => setSelectedAlt(e.target.value)}
                      className="w-full mt-1 bg-[#141B2B] border border-[#222E45] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-slate-400 font-semibold">Or Enter Custom Image URL</label>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#141B2B] border border-[#222E45] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#1A2333] flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-[#141B2B] rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedUrl && !customUrl}
                className="px-4 py-1.5 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all disabled:opacity-50"
              >
                Insert Media
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
