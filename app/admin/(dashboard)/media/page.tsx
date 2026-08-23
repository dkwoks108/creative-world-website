"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { 
  Image as ImageIcon, 
  Upload, 
  Copy, 
  Check, 
  Trash2, 
  ExternalLink,
  Search,
  Grid,
  List
} from "lucide-react";

const initialMediaItems = [
  {
    id: "m1",
    name: "cw-insight-website-2026-01.webp",
    url: "/images/insights/cw-insight-website-2026-01.webp",
    category: "insights",
    size: "142 KB",
    dimensions: "1200x630"
  },
  {
    id: "m2",
    name: "cw-insight-seo-vs-ads-01.webp",
    url: "/images/insights/cw-insight-seo-vs-ads-01.webp",
    category: "insights",
    size: "185 KB",
    dimensions: "1200x630"
  },
  {
    id: "m3",
    name: "cw-insight-reels-mistakes-01.webp",
    url: "/images/insights/cw-insight-reels-mistakes-01.webp",
    category: "insights",
    size: "128 KB",
    dimensions: "1200x630"
  },
  {
    id: "m4",
    name: "logo-symbol.png",
    url: "/logo-symbol.png",
    category: "branding",
    size: "45 KB",
    dimensions: "512x512"
  },
  {
    id: "m5",
    name: "icon.png",
    url: "/icon.png",
    category: "branding",
    size: "28 KB",
    dimensions: "192x192"
  }
];

export default function AdminMediaLibrary() {
  const [items, setItems] = useState(initialMediaItems);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this asset from media library?")) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl) return;

    const newItem = {
      id: `m-${Date.now()}`,
      name: uploadUrl.split("/").pop() || "media-asset",
      url: uploadUrl,
      category: "custom",
      size: "Optimized",
      dimensions: "Dynamic"
    };

    setItems([newItem, ...items]);
    setUploadUrl("");
    setIsAddOpen(false);
  };

  const filtered = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-white pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-poppins flex items-center gap-3">
            <ImageIcon className="text-cyan-400" size={26} />
            Media Asset Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage and copy image asset URLs for blog posts & services</p>
        </div>
        <Button 
          onClick={() => setIsAddOpen(true)}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold gap-2 shadow-lg shadow-cyan-500/20"
        >
          <Upload size={16} /> Add Media Asset
        </Button>
      </div>

      {/* Add Media Modal */}
      {isAddOpen && (
        <form onSubmit={handleAddMedia} className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-4 max-w-lg shadow-2xl">
          <h2 className="text-base font-bold text-white">Add Image URL to Library</h2>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Image Asset Path / URL</label>
            <input
              type="text"
              required
              placeholder="/images/insights/my-new-banner.webp"
              className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="border-[#1E293B] text-slate-300">
              Cancel
            </Button>
            <Button type="submit" className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold">
              Add to Library
            </Button>
          </div>
        </form>
      )}

      {/* Search & Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search media files..."
            className="w-full pl-10 pr-4 py-2 bg-[#0D121F] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="text-xs text-slate-400">{filtered.length} total assets</span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(item => (
          <div 
            key={item.id}
            className="bg-[#111622] border border-[#1E293B] rounded-2xl overflow-hidden group hover:border-cyan-500/40 transition-all shadow-xl"
          >
            <div className="h-44 bg-[#0D121F] relative overflow-hidden flex items-center justify-center p-2">
              <img 
                src={item.url} 
                alt={item.name}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" 
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-black/60 backdrop-blur-md text-cyan-400 border border-cyan-500/20">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-mono">
                  <span>{item.size}</span>
                  <span>{item.dimensions}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1 border-t border-[#1A2333]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(item.url, item.id)}
                  className="flex-1 gap-1.5 border-[#1E293B] text-xs text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30"
                >
                  {copiedId === item.id ? <Check size={14} className="text-cyan-400" /> : <Copy size={14} />}
                  <span>{copiedId === item.id ? "Copied!" : "Copy Path"}</span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  className="border-[#1E293B] text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
