"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Image as ImageIcon, 
  FileText, 
  Globe, 
  CheckCircle2, 
  Loader2,
  Eye,
  Plus,
  Trash2
} from "lucide-react";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    categoryName: "Websites",
    featuredImage: "/images/insights/cw-insight-website-2026-01.webp",
    featuredImageAlt: "Creativee World Blog Featured Image",
    status: "PUBLISHED",
    seoTitle: "",
    metaDescription: "",
    contentSections: [
      { heading: "Introduction", paragraph: "Write the intro paragraph for your strategic article here..." },
      { heading: "Key Execution Strategy", paragraph: "Detail the actionable growth insights and steps for businesses in Jaipur..." }
    ]
  });

  useEffect(() => {
    fetch("/api/admin/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});
  }, []);

  const handleTitleChange = (val: string) => {
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setForm(prev => ({
      ...prev,
      title: val,
      slug: generatedSlug,
      seoTitle: `${val} | Creativee World Jaipur`,
    }));
  };

  const addContentSection = () => {
    setForm(prev => ({
      ...prev,
      contentSections: [
        ...prev.contentSections,
        { heading: "New Section Heading", paragraph: "Write section content details here..." }
      ]
    }));
  };

  const removeContentSection = (idx: number) => {
    setForm(prev => ({
      ...prev,
      contentSections: prev.contentSections.filter((_, i) => i !== idx)
    }));
  };

  const updateSection = (idx: number, field: "heading" | "paragraph", value: string) => {
    setForm(prev => {
      const updated = [...prev.contentSections];
      updated[idx][field] = value;
      return { ...prev, contentSections: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formattedContent = JSON.stringify(
      form.contentSections.map(sec => ({
        heading: sec.heading,
        paragraphs: [sec.paragraph]
      }))
    );

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          categoryName: form.categoryName,
          featuredImage: form.featuredImage,
          featuredImageAlt: form.featuredImageAlt,
          status: form.status,
          seoTitle: form.seoTitle,
          metaDescription: form.metaDescription || form.excerpt,
          content: formattedContent,
        }),
      });

      if (res.ok) {
        router.push("/admin/blogs");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to submit blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs">
            <Button variant="outline" size="sm" className="gap-2 border-[#1E293B] text-slate-300 hover:text-white">
              <ArrowLeft size={16} /> Back to Blogs
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
              <Sparkles className="text-cyan-400" size={24} />
              Create New Article
            </h1>
            <p className="text-xs text-slate-400">Publish high-authority insights for Creativee World</p>
          </div>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={loading || !form.title}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/20 gap-2 px-6"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          <span>{loading ? "Publishing..." : "Publish Article"}</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Details */}
        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1A2333] pb-4">
            <FileText size={18} className="text-cyan-400" /> General Article Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Article Title *</label>
              <input
                type="text"
                required
                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., Why Jaipur Local Brands Need Custom Web Infrastructure"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">URL Slug *</label>
              <input
                type="text"
                required
                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                value={form.categoryName}
                onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
              >
                <option value="Websites">Websites</option>
                <option value="SEO">SEO</option>
                <option value="Social Media">Social Media</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Local SEO">Local SEO</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Business Growth">Business Growth</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">Article Summary Excerpt *</label>
              <textarea
                rows={3}
                required
                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                placeholder="Brief high-impact executive summary..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Publishing Status</label>
              <select
                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="PUBLISHED">Published (Live)</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Featured Image URL</label>
              <input
                type="text"
                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                value={form.featuredImage}
                onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
              />
            </div>
          </div>

          {/* Featured Image Live Preview */}
          {form.featuredImage && (
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 block mb-2">Featured Image Preview</span>
              <div className="h-44 max-w-md rounded-xl overflow-hidden border border-[#1E293B] bg-[#0D121F] relative">
                <img src={form.featuredImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Content Section Builder */}
        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1A2333] pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-purple-400" /> Article Content Blocks
            </h2>
            <Button 
              type="button" 
              onClick={addContentSection} 
              variant="outline"
              size="sm" 
              className="gap-2 border-[#1E293B] text-cyan-400 hover:bg-cyan-500/10"
            >
              <Plus size={14} /> Add Content Section
            </Button>
          </div>

          <div className="space-y-6">
            {form.contentSections.map((sec, idx) => (
              <div key={idx} className="p-4 bg-[#0D121F] border border-[#1E293B] rounded-xl space-y-4 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-cyan-400">Section {idx + 1}</span>
                  {form.contentSections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContentSection(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Section Heading</label>
                  <input
                    type="text"
                    className="w-full bg-[#111622] border border-[#1E293B] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                    value={sec.heading}
                    onChange={(e) => updateSection(idx, "heading", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Paragraph Text</label>
                  <textarea
                    rows={4}
                    className="w-full bg-[#111622] border border-[#1E293B] rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                    value={sec.paragraph}
                    onChange={(e) => updateSection(idx, "paragraph", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Configuration */}
        <div className="bg-[#111622] border border-[#1E293B] rounded-2xl p-6 space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1A2333] pb-4">
            <Globe size={18} className="text-cyan-400" /> Search Engine Optimization (SEO)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">SEO Title Tag</label>
              <input
                type="text"
                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                value={form.seoTitle}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Meta Description</label>
              <textarea
                rows={3}
                className="w-full bg-[#0D121F] border border-[#1E293B] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex justify-end gap-4 pt-4">
          <Link href="/admin/blogs">
            <Button type="button" variant="outline" className="border-[#1E293B] text-slate-300">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            disabled={loading || !form.title}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold px-8 shadow-lg shadow-cyan-500/20"
          >
            {loading ? "Publishing..." : "Publish Article Live"}
          </Button>
        </div>
      </form>
    </div>
  );
}
