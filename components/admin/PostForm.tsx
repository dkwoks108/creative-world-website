/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Save,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  ArrowLeft,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  History,
  RotateCcw,
  Clock,
  Globe,
  Share2,
} from 'lucide-react';
import { createPostAction, updatePostAction, autosavePostAction, restoreRevisionAction } from '@/lib/actions/posts';

interface CategoryItem {
  id: string;
  name: string;
}

interface AuthorItem {
  id: string;
  name: string;
}

interface PostFormProps {
  initialData?: any;
  categories: CategoryItem[];
  authors: AuthorItem[];
  adminPath: string;
}

const INTERNAL_LINKS = [
  { label: 'Homepage', url: 'https://surnaxtech.com' },
  { label: 'Services Main', url: 'https://surnaxtech.com/services' },
  { label: 'SEO Services', url: 'https://surnaxtech.com/services/seo' },
  { label: 'Performance Marketing', url: 'https://surnaxtech.com/services/performance-marketing' },
  { label: 'Social Media Marketing', url: 'https://surnaxtech.com/services/social-media-marketing' },
  { label: 'Website Development', url: 'https://surnaxtech.com/services/website-development' },
  { label: 'Brand Strategy', url: 'https://surnaxtech.com/services/brand-strategy' },
  { label: 'Industries Overview', url: 'https://surnaxtech.com/industries' },
  { label: 'Real Estate Growth', url: 'https://surnaxtech.com/industries/real-estate' },
  { label: 'Restaurants & Hospitality', url: 'https://surnaxtech.com/industries/restaurants' },
  { label: 'Growth Playbooks / Work', url: 'https://surnaxtech.com/work' },
  { label: 'Growth Audit Form', url: 'https://surnaxtech.com/growth-audit' },
  { label: 'Contact Us', url: 'https://surnaxtech.com/contact' },
  { label: 'About Agency', url: 'https://surnaxtech.com/about' },
];

export function PostForm({ initialData, categories, authors, adminPath }: PostFormProps) {
  const isEditing = Boolean(initialData?.id);

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [status, setStatus] = useState(initialData?.status || 'DRAFT');
  const [publishAt, setPublishAt] = useState(
    initialData?.publishAt ? new Date(initialData.publishAt).toISOString().slice(0, 16) : ''
  );
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0]?.id || '');
  const [authorId, setAuthorId] = useState(initialData?.authorId || authors[0]?.id || '');
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || '/images/insights/cw-insight-website-2026-01.webp');
  const [featuredImageAlt, setFeaturedImageAlt] = useState(initialData?.featuredImageAlt || '');
  const [imageCaption, setImageCaption] = useState(initialData?.imageCaption || '');
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || '');
  const [ogTitle, setOgTitle] = useState(initialData?.ogTitle || '');
  const [ogDescription, setOgDescription] = useState(initialData?.ogDescription || '');
  const [primaryKeyword, setPrimaryKeyword] = useState(initialData?.primaryKeyword || '');
  const [secondaryKeywords, setSecondaryKeywords] = useState(initialData?.secondaryKeywords || '');
  const [noIndex, setNoIndex] = useState(Boolean(initialData?.noIndex));
  const [noFollow, setNoFollow] = useState(Boolean(initialData?.noFollow));

  // FAQs State
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(() => {
    try {
      return initialData?.faqsJson ? JSON.parse(initialData.faqsJson) : [];
    } catch {
      return [];
    }
  });

  // Revisions
  const [revisions, setRevisions] = useState<any[]>(initialData?.revisions || []);

  // Save / Autosave state
  const [saveState, setSaveState] = useState<'SAVED' | 'SAVING' | 'DIRTY' | 'FAILED'>('SAVED');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showLinkPicker, setShowLinkPicker] = useState(false);
  const [linkFilter, setLinkFilter] = useState('');

  // Auto-slug generator
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSaveState('DIRTY');
    if (!isEditing || !slug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generated);
    }
  };

  // Debounced Autosave (for existing posts)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSaveState('DIRTY');

    if (!isEditing || !initialData?.id) return;

    const timer = setTimeout(async () => {
      setSaveState('SAVING');
      const res = await autosavePostAction(initialData.id, {
        title,
        excerpt,
        content,
        seoTitle,
        metaDescription,
      });

      if (res.success) {
        setSaveState('SAVED');
      } else {
        setSaveState('FAILED');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, excerpt, content, seoTitle, metaDescription, isEditing, initialData?.id]);

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveState('SAVING');
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.set('status', status);
    formData.set('publishAt', publishAt);
    formData.set('noIndex', noIndex ? 'true' : 'false');
    formData.set('noFollow', noFollow ? 'true' : 'false');
    formData.set('faqsJson', JSON.stringify(faqs));

    try {
      let res;
      if (isEditing) {
        res = await updatePostAction(initialData.id, formData);
      } else {
        res = await createPostAction(formData);
      }

      if (res.success) {
        setSaveState('SAVED');
        setMessage({
          type: 'success',
          text: isEditing ? 'Article updated and cache revalidated!' : 'Article created successfully!',
        });
      } else {
        setSaveState('FAILED');
        setMessage({ type: 'error', text: res.error || 'Failed to save article.' });
      }
    } catch {
      setSaveState('FAILED');
      setMessage({ type: 'error', text: 'Unexpected server error occurred.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestoreRevision = async (revisionId: string) => {
    if (!confirm('Are you sure you want to restore content from this revision snapshot?')) return;
    const res = await restoreRevisionAction(initialData.id, revisionId);
    if (res.success && res.post) {
      setTitle(res.post.title);
      setContent(res.post.content);
      if (res.post.seoTitle) setSeoTitle(res.post.seoTitle);
      if (res.post.metaDescription) setMetaDescription(res.post.metaDescription);
      setMessage({ type: 'success', text: 'Restored content from historical revision snapshot!' });
    }
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const insertInternalLink = (url: string) => {
    const markdownLink = ` [link text](${url}) `;
    setContent((prev: string) => prev + markdownLink);
    setShowLinkPicker(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-black/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href={`${adminPath}/posts`}
            className="p-2 bg-white border border-black/10 rounded-xl text-txt-secondary hover:text-ink transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-serif font-bold text-ink">
              {isEditing ? 'Edit Blog Article' : 'Create New Blog Article'}
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono mt-0.5">
              <span className="text-txt-muted">{isEditing ? `Post ID: ${initialData.id}` : 'Drafting new CMS content'}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  saveState === 'SAVED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : saveState === 'SAVING'
                    ? 'bg-blue-100 text-blue-800'
                    : saveState === 'DIRTY'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {saveState === 'SAVED'
                  ? '✓ Saved'
                  : saveState === 'SAVING'
                  ? 'Saving...'
                  : saveState === 'DIRTY'
                  ? '● Unsaved Changes'
                  : '✕ Save Failed'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isEditing && slug && (
            <a
              href={`/insights/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 bg-white border border-black/10 text-xs font-semibold text-txt-secondary hover:text-ink rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Live</span>
            </a>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="h-10 px-5 bg-ink text-white text-xs font-semibold rounded-xl hover:bg-black/90 active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Article'}</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-medium border flex items-center gap-3 animate-fade-in ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article Title */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                Article Title <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-mono text-txt-muted">{title.length} chars (50–65 recommended)</span>
            </div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="e.g. Why Jaipur Businesses Need More Than an Instagram Page in 2026"
              className="w-full h-12 px-4 bg-[#FAF9FC] border border-black/10 rounded-xl text-base font-serif font-bold text-ink placeholder:font-sans placeholder:font-normal placeholder:text-txt-muted focus:outline-none focus:border-ink cursor-text"
            />
          </div>

          {/* Slug */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-ink uppercase tracking-wider">
                SEO URL Slug <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-mono text-txt-muted">URL: /insights/{slug || 'your-slug'}</span>
            </div>
            <input
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSaveState('DIRTY');
              }}
              required
              placeholder="why-jaipur-businesses-need-a-website-2026"
              className="w-full h-11 px-4 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-mono text-ink focus:outline-none focus:border-ink cursor-text"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-3">
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider">Article Excerpt / Summary</label>
            <textarea
              name="excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value);
                setSaveState('DIRTY');
              }}
              placeholder="Brief summary used for post cards, social previews, and search snippets..."
              className="w-full p-4 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink focus:outline-none focus:border-ink cursor-text resize-none"
            />
          </div>

          {/* Body Content Editor with Internal Link Tool */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-ink uppercase tracking-wider">Article Body Content *</label>
              <button
                type="button"
                onClick={() => setShowLinkPicker(true)}
                className="px-3 py-1 bg-cream hover:bg-black/5 text-ink text-xs font-medium rounded-lg border border-black/10 flex items-center gap-1.5 cursor-pointer"
              >
                <LinkIcon className="w-3.5 h-3.5 text-brand-blue" />
                <span>Insert Internal Link</span>
              </button>
            </div>
            <textarea
              name="content"
              rows={16}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setSaveState('DIRTY');
              }}
              required
              placeholder="Write or paste your article content..."
              className="w-full p-4 bg-[#FAF9FC] border border-black/10 rounded-xl font-mono text-xs text-ink focus:outline-none focus:border-ink cursor-text leading-relaxed"
            />
          </div>

          {/* FAQ Editor */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-violet" />
                <h2 className="text-sm font-semibold text-ink">Article FAQs (Structured Data)</h2>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="px-3 py-1 bg-ink text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                + Add FAQ
              </button>
            </div>

            {faqs.map((faq, i) => (
              <div key={i} className="p-4 bg-cream/40 rounded-xl border border-black/5 space-y-2">
                <input
                  type="text"
                  placeholder="Question..."
                  value={faq.question}
                  onChange={(e) => updateFaq(i, 'question', e.target.value)}
                  className="w-full h-9 px-3 bg-white border border-black/10 rounded-lg text-xs font-bold text-ink"
                />
                <textarea
                  rows={2}
                  placeholder="Answer..."
                  value={faq.answer}
                  onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                  className="w-full p-3 bg-white border border-black/10 rounded-lg text-xs text-ink resize-none"
                />
                <button type="button" onClick={() => removeFaq(i)} className="text-red-500 text-xs font-semibold cursor-pointer">
                  Remove FAQ
                </button>
              </div>
            ))}
          </div>

          {/* SERP Search Preview Box */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-black/10 pb-3">
              <Globe className="w-4 h-4 text-brand-blue" />
              <h2 className="text-sm font-semibold text-ink">Google SERP Snippet Preview</h2>
            </div>
            <div className="p-4 bg-[#F8F9FA] rounded-xl border border-black/10 space-y-1 font-sans">
              <div className="text-[11px] text-[#202124] flex items-center gap-1">
                <span>surnaxtech.com</span>
                <span>›</span>
                <span className="text-[#5f6368]">insights › {slug || 'your-slug'}</span>
              </div>
              <div className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer line-clamp-1">
                {seoTitle || title || 'Article Title - Surnax Technologies'}
              </div>
              <div className="text-xs text-[#4d5156] line-clamp-2">
                {metaDescription || excerpt || 'Article description will appear here in search engine results snippets...'}
              </div>
            </div>
          </div>

          {/* Social Sharing OpenGraph Preview Box */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-black/10 pb-3">
              <Share2 className="w-4 h-4 text-brand-violet" />
              <h2 className="text-sm font-semibold text-ink">Social Sharing OpenGraph Card Preview</h2>
            </div>
            <div className="border border-black/10 rounded-xl overflow-hidden bg-cream/30">
              <div className="aspect-video bg-black/5 relative overflow-hidden">
                {featuredImage && <img src={featuredImage} alt="OG Card" className="w-full h-full object-cover" />}
              </div>
              <div className="p-4 space-y-1 bg-white">
                <div className="text-[10px] font-mono text-txt-muted uppercase">SURNAXTECH.COM</div>
                <div className="text-sm font-bold text-ink">{ogTitle || seoTitle || title}</div>
                <div className="text-xs text-txt-secondary line-clamp-2">{ogDescription || metaDescription || excerpt}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (1 Col) */}
        <div className="space-y-6">
          {/* Publishing Controls */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <h2 className="text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">Publishing Controls</h2>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink">Status</label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setSaveState('DIRTY');
                }}
                className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-medium text-ink focus:outline-none cursor-pointer"
              >
                <option value="DRAFT">Draft</option>
                <option value="REVIEW">In Review</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            {/* Scheduled Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink">Publish Date / Schedule (Asia/Kolkata)</label>
              <input
                type="datetime-local"
                value={publishAt}
                onChange={(e) => {
                  setPublishAt(e.target.value);
                  setSaveState('DIRTY');
                }}
                className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-mono text-ink"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink">Category</label>
              <select
                name="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-medium text-ink focus:outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink">Author</label>
              <select
                name="authorId"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-medium text-ink focus:outline-none cursor-pointer"
              >
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Image Controls */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <h2 className="text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">Featured Image</h2>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">Image URL</label>
              <input
                type="text"
                name="featuredImage"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs font-mono text-ink"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">Alt Text</label>
              <input
                type="text"
                name="featuredImageAlt"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">Image Caption</label>
              <input
                type="text"
                name="imageCaption"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink"
              />
            </div>
          </div>

          {/* SEO Controls */}
          <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-4">
            <h2 className="text-xs font-mono font-bold text-txt-muted uppercase tracking-wider">SEO & Keywords</h2>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">SEO Title Tag</label>
              <input
                type="text"
                name="seoTitle"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">Meta Description</label>
              <textarea
                name="metaDescription"
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full p-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink mb-1">Primary Keyword</label>
              <input
                type="text"
                name="primaryKeyword"
                value={primaryKeyword}
                onChange={(e) => setPrimaryKeyword(e.target.value)}
                placeholder="e.g. digital marketing agency Jaipur"
                className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs text-ink"
              />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 text-xs text-ink cursor-pointer">
                <input
                  type="checkbox"
                  checked={noIndex}
                  onChange={(e) => setNoIndex(e.target.checked)}
                  className="rounded border-black/20 text-ink cursor-pointer"
                />
                <span>noindex</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-ink cursor-pointer">
                <input
                  type="checkbox"
                  checked={noFollow}
                  onChange={(e) => setNoFollow(e.target.checked)}
                  className="rounded border-black/20 text-ink cursor-pointer"
                />
                <span>nofollow</span>
              </label>
            </div>
          </div>

          {/* Revision Snapshots */}
          {revisions.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm space-y-3">
              <div className="flex items-center gap-2 border-b border-black/10 pb-2">
                <History className="w-4 h-4 text-brand-blue" />
                <h2 className="text-xs font-mono font-bold text-txt-muted uppercase">Revision Snapshots</h2>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {revisions.map((rev) => (
                  <div key={rev.id} className="p-2 bg-cream/40 rounded-lg text-xs flex items-center justify-between">
                    <div>
                      <div className="font-bold text-ink line-clamp-1">{rev.title}</div>
                      <div className="text-[10px] text-txt-muted font-mono">
                        {new Date(rev.createdAt).toLocaleString()} ({rev.createdBy})
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRestoreRevision(rev.id)}
                      className="p-1 text-brand-blue hover:bg-blue-50 rounded cursor-pointer"
                      title="Restore Revision"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Internal Link Modal Picker */}
      {showLinkPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl border border-black/10 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-ink">Select Internal Site Link</h3>
            <input
              type="text"
              placeholder="Search site pages..."
              value={linkFilter}
              onChange={(e) => setLinkFilter(e.target.value)}
              className="w-full h-10 px-3 bg-[#FAF9FC] border border-black/10 rounded-xl text-xs"
            />
            <div className="max-h-60 overflow-y-auto divide-y divide-black/5">
              {INTERNAL_LINKS.filter((l) => l.label.toLowerCase().includes(linkFilter.toLowerCase())).map((link, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => insertInternalLink(link.url)}
                  className="w-full p-2.5 text-left text-xs hover:bg-cream transition-colors flex justify-between items-center cursor-pointer"
                >
                  <span className="font-semibold text-ink">{link.label}</span>
                  <span className="font-mono text-[10px] text-txt-muted">{link.url.replace('https://surnaxtech.com', '')}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowLinkPicker(false)}
              className="w-full py-2 bg-gray-100 text-ink text-xs font-semibold rounded-xl cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
