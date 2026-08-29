"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Type,
  Heading,
  List,
  Quote,
  Image as ImageIcon,
  Video,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Sparkles,
  Search,
  Save,
  Globe,
  Eye,
  Calendar,
  Tag as TagIcon,
  Folder,
  Code,
  AlertCircle,
  Clock,
  History,
  Copy,
  Columns,
  Table as TableIcon,
  HelpCircle,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Youtube,
  ChevronDown,
  ChevronRight,
  Layers,
  Undo,
  Redo,
  FileText,
  Bookmark,
  RotateCcw,
  X,
  Sliders,
  Settings,
  Grid,
  Music,
  FileDown,
  Layout,
  MessageSquare,
  User,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import MediaLibraryModal from "../media/MediaLibraryModal";
import RevisionDiffModal from "./RevisionDiffModal";

export type BlockType =
  | "paragraph"
  | "heading"
  | "list"
  | "quote"
  | "pullquote"
  | "image"
  | "gallery"
  | "video"
  | "audio"
  | "file"
  | "columns"
  | "buttons"
  | "code"
  | "table"
  | "faq"
  | "callout"
  | "cta"
  | "youtube";

export interface EditorBlock {
  id: string;
  type: BlockType;
  text?: string;
  level?: number;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  quoteAuthor?: string;
  buttonText?: string;
  buttonUrl?: string;
  calloutType?: "info" | "warning" | "success";
  faqQuestion?: string;
  faqAnswer?: string;
  align?: "left" | "center" | "right";
  textColor?: string;
  bgColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  linkUrl?: string;
  tableRows?: string[][];
  columnBlocks?: EditorBlock[][];
}

export interface PostEditorData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  status: "DRAFT" | "REVIEW" | "SCHEDULED" | "PUBLISHED";
  publishAt?: string;
  scheduledAt?: string;
  categoryId?: string;
  tags?: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
  primaryKeyword?: string;
  blocks: EditorBlock[];
  revisions?: any[];
}

interface BlockEditorProps {
  initialData?: Partial<PostEditorData>;
  categories?: { id: string; name: string }[];
  tagsList?: { id: string; name: string }[];
  onSave: (data: PostEditorData) => Promise<void>;
  isSaving?: boolean;
}

export default function BlockEditor({
  initialData,
  categories = [
    { id: "cat-1", name: "Websites" },
    { id: "cat-2", name: "SEO" },
    { id: "cat-3", name: "Social Media" },
    { id: "cat-4", name: "Growth Strategy" },
  ],
  tagsList = [],
  onSave,
  isSaving = false,
}: BlockEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [status, setStatus] = useState<PostEditorData["status"]>(
    initialData?.status || "DRAFT"
  );
  const [scheduledAt, setScheduledAt] = useState(initialData?.scheduledAt || "");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialData?.categoryId || categories[0]?.id || ""
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags || ["Digital Marketing", "Jaipur"]);
  const [tagInput, setTagInput] = useState("");
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "");
  const [featuredImageAlt, setFeaturedImageAlt] = useState(initialData?.featuredImageAlt || "");

  // SEO state
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");
  const [primaryKeyword, setPrimaryKeyword] = useState(initialData?.primaryKeyword || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || "");

  // Local Crash Recovery
  const [showCrashRecoveryBanner, setShowCrashRecoveryBanner] = useState(false);

  // Internal Nodes / Blocks State (Invisible to user during writing)
  const [blocks, setBlocks] = useState<EditorBlock[]>(() => {
    if (initialData?.blocks && initialData.blocks.length > 0) {
      return initialData.blocks;
    }
    return [
      {
        id: "b-1",
        type: "paragraph",
        text: "Start writing your article content here...",
      },
    ];
  });

  const [historyStack, setHistoryStack] = useState<EditorBlock[][]>([]);
  const [redoStack, setRedoStack] = useState<EditorBlock[][]>([]);

  // Workspace UI states
  const [activeSidebarTab, setActiveSidebarTab] = useState<"post" | "block">("post");
  const [showListView, setShowListView] = useState(false);
  const [showInserter, setShowInserter] = useState(false);
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [slashMenuBlockId, setSlashMenuBlockId] = useState<string | null>(null);
  const [slashSearch, setSlashSearch] = useState("");
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Accordion panels collapse states
  const [panelPublish, setPanelPublish] = useState(true);
  const [panelCategories, setPanelCategories] = useState(true);
  const [panelTags, setPanelTags] = useState(true);
  const [panelFeaturedImage, setPanelFeaturedImage] = useState(true);
  const [panelSEO, setPanelSEO] = useState(true);

  // Modals state
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [targetBlockIdForMedia, setTargetBlockIdForMedia] = useState<string | null>(null);
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !initialData?.slug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  }, [title, initialData?.slug]);

  // Check for crash recovery state in localStorage on mount
  useEffect(() => {
    try {
      const savedCrashData = localStorage.getItem("cw_blog_crash_draft");
      if (savedCrashData && !initialData?.id) {
        setShowCrashRecoveryBanner(true);
      }
    } catch (e) {}
  }, [initialData?.id]);

  // Save to crash recovery state on content change
  useEffect(() => {
    if (title || blocks.length > 1) {
      try {
        localStorage.setItem(
          "cw_blog_crash_draft",
          JSON.stringify({ title, slug, blocks, updatedAt: new Date().toISOString() })
        );
      } catch (e) {}
    }
  }, [title, slug, blocks]);

  const recoverCrashDraft = () => {
    try {
      const savedCrashData = localStorage.getItem("cw_blog_crash_draft");
      if (savedCrashData) {
        const parsed = JSON.parse(savedCrashData);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.slug) setSlug(parsed.slug);
        if (Array.isArray(parsed.blocks)) setBlocks(parsed.blocks);
        setShowCrashRecoveryBanner(false);
      }
    } catch (e) {}
  };

  const discardCrashDraft = () => {
    localStorage.removeItem("cw_blog_crash_draft");
    setShowCrashRecoveryBanner(false);
  };

  // History state updates
  const updateBlocksWithHistory = (newBlocks: EditorBlock[]) => {
    setHistoryStack((prev) => [...prev, blocks]);
    setRedoStack([]);
    setBlocks(newBlocks);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[historyStack.length - 1];
    setRedoStack((prev) => [...prev, blocks]);
    setBlocks(previous);
    setHistoryStack((prev) => prev.slice(0, prev.length - 1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setHistoryStack((prev) => [...prev, blocks]);
    setBlocks(next);
    setRedoStack((prev) => prev.slice(0, prev.length - 1));
  };

  const addBlock = (type: BlockType, index?: number) => {
    const newBlock: EditorBlock = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      text: type === "paragraph" ? "" : undefined,
      level: type === "heading" ? 2 : undefined,
      items: type === "list" ? ["First bullet point", "Second bullet point"] : undefined,
      src: type === "image" || type === "video" || type === "youtube" ? "" : undefined,
      quoteAuthor: type === "quote" ? "Author Name" : undefined,
      calloutType: type === "callout" ? "info" : undefined,
      tableRows:
        type === "table"
          ? [
              ["Header 1", "Header 2", "Header 3"],
              ["Data 1", "Data 2", "Data 3"],
            ]
          : undefined,
      buttonText: type === "buttons" || type === "cta" ? "Click Here" : undefined,
      buttonUrl: type === "buttons" || type === "cta" ? "/contact" : undefined,
      faqQuestion: type === "faq" ? "What is your turn-around time?" : undefined,
      faqAnswer: type === "faq" ? "Our average project timelines range from 2 to 4 weeks." : undefined,
    };

    const updated = [...blocks];
    if (typeof index === "number") {
      updated.splice(index + 1, 0, newBlock);
    } else {
      updated.push(newBlock);
    }
    updateBlocksWithHistory(updated);
    setFocusedBlockId(newBlock.id);
    setShowInserter(false);
    setSlashMenuBlockId(null);
  };

  const updateBlock = (id: string, updates: Partial<EditorBlock>) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, ...updates } : b));
    setBlocks(updated);
  };

  const deleteBlock = (id: string) => {
    if (blocks.length <= 1) return;
    const updated = blocks.filter((b) => b.id !== id);
    updateBlocksWithHistory(updated);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === blocks.length - 1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    updateBlocksWithHistory(updated);
  };

  // Keyboard navigation & Enter key handling for seamless writing flow
  const handleKeyDown = (e: React.KeyboardEvent, index: number, block: EditorBlock) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (block.type === "paragraph" || block.type === "heading") {
        e.preventDefault();
        addBlock("paragraph", index);
      }
    }
  };

  const handleTextChange = (id: string, text: string) => {
    if (text.startsWith("/")) {
      setSlashMenuBlockId(id);
      setSlashSearch(text.slice(1).toLowerCase());
    } else {
      setSlashMenuBlockId(null);
    }
    updateBlock(id, { text });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSave = async (overrideStatus?: PostEditorData["status"]) => {
    const currentStatus = overrideStatus || status;
    const postData: PostEditorData = {
      id: initialData?.id,
      title,
      slug,
      excerpt,
      status: currentStatus,
      scheduledAt: currentStatus === "SCHEDULED" ? scheduledAt : undefined,
      categoryId: selectedCategoryId,
      tags,
      featuredImage,
      featuredImageAlt,
      seoTitle: seoTitle || title,
      metaDescription: metaDescription || excerpt,
      primaryKeyword,
      canonicalUrl,
      blocks,
    };

    await onSave(postData);
    localStorage.removeItem("cw_blog_crash_draft");
    setLastSavedTime(new Date().toLocaleTimeString());
  };

  const focusedBlock = blocks.find((b) => b.id === focusedBlockId);

  return (
    <div className="flex flex-col h-screen bg-[#F0F2F5] text-slate-800 overflow-hidden font-sans select-none">
      {/* Media Library Picker Modal */}
      <MediaLibraryModal
        isOpen={showMediaModal}
        onClose={() => setShowMediaModal(false)}
        onSelect={(media) => {
          if (targetBlockIdForMedia) {
            updateBlock(targetBlockIdForMedia, { src: media.url, alt: media.altText });
          } else {
            setFeaturedImage(media.url);
            setFeaturedImageAlt(media.altText || "");
          }
        }}
      />

      {/* Revision Visual Inspector Modal */}
      <RevisionDiffModal
        isOpen={showRevisionModal}
        onClose={() => setShowRevisionModal(false)}
        revisions={initialData?.revisions || []}
        onRestore={(rev) => {
          if (rev.title) setTitle(rev.title);
          if (rev.content) {
            try {
              const parsed = JSON.parse(rev.content);
              if (Array.isArray(parsed)) setBlocks(parsed);
            } catch (e) {
              console.error(e);
            }
          }
        }}
      />

      {/* Crash Recovery Notification Banner */}
      {showCrashRecoveryBanner && (
        <div className="bg-amber-500 text-black px-4 py-2 text-xs font-bold flex items-center justify-between z-40">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} />
            <span>Unsaved draft crash recovery found from your previous session.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={recoverCrashDraft}
              className="px-3 py-1 bg-black text-white rounded hover:bg-slate-800 transition-all"
            >
              Recover Draft
            </button>
            <button
              onClick={discardCrashDraft}
              className="px-2 py-1 underline text-black/80 hover:text-black"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* 1. TOP ADMIN BAR */}
      <header className="h-11 bg-[#1D2327] text-white flex items-center justify-between px-4 z-30 shrink-0 text-xs border-b border-slate-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold tracking-tight text-white">
            <div className="w-5 h-5 rounded bg-cyan-500 text-black flex items-center justify-center font-extrabold text-[10px]">
              CW
            </div>
            <span>Creativee Document Studio</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-600" />

          {/* Block Inserter Toggle */}
          <button
            onClick={() => setShowInserter(!showInserter)}
            className={cn(
              "p-1.5 rounded flex items-center gap-1 font-semibold transition-all",
              showInserter ? "bg-cyan-600 text-white" : "hover:bg-slate-700 text-slate-300"
            )}
            title="Insert Document Element"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Insert</span>
          </button>

          {/* List View Toggle */}
          <button
            onClick={() => setShowListView(!showListView)}
            className={cn(
              "p-1.5 rounded flex items-center gap-1 transition-all",
              showListView ? "bg-cyan-600 text-white" : "hover:bg-slate-700 text-slate-300"
            )}
            title="Document Outline"
          >
            <Layers size={16} />
          </button>

          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={handleUndo}
              disabled={historyStack.length === 0}
              className="p-1.5 rounded hover:bg-slate-700 text-slate-300 disabled:opacity-30"
              title="Undo (Ctrl+Z)"
            >
              <Undo size={14} />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-1.5 rounded hover:bg-slate-700 text-slate-300 disabled:opacity-30"
              title="Redo (Ctrl+Y)"
            >
              <Redo size={14} />
            </button>
          </div>
        </div>

        {/* Top Right Save & Publish Actions */}
        <div className="flex items-center gap-3">
          {lastSavedTime && (
            <span className="text-[11px] text-slate-400 hidden md:flex items-center gap-1">
              <Clock size={12} className="text-cyan-400" /> Saved {lastSavedTime}
            </span>
          )}

          <button
            onClick={() => handleSave("DRAFT")}
            disabled={isSaving}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded font-semibold text-xs border border-slate-600 transition-all"
          >
            Save Draft
          </button>

          <button
            onClick={() => window.open(`/insights/${slug}`, "_blank")}
            className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded font-semibold text-xs border border-slate-600 transition-all flex items-center gap-1"
          >
            <Eye size={13} /> Preview
          </button>

          <button
            onClick={() => handleSave("PUBLISHED")}
            disabled={isSaving}
            className="px-4 py-1 bg-[#2271B1] hover:bg-[#135E96] text-white font-bold text-xs rounded transition-all shadow-sm"
          >
            {isSaving ? "Saving..." : status === "PUBLISHED" ? "Update" : "Publish"}
          </button>

          <button
            onClick={() =>
              setActiveSidebarTab(activeSidebarTab === "post" ? "block" : "post")
            }
            className={cn(
              "p-1.5 rounded border transition-all",
              activeSidebarTab ? "bg-slate-700 text-white border-slate-500" : "text-slate-400 border-slate-700"
            )}
            title="Settings Sidebar Toggle"
          >
            <Settings size={15} />
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Side Element Inserter Drawer */}
        {showInserter && (
          <aside className="w-72 bg-white border-r border-slate-300 shadow-xl z-20 flex flex-col shrink-0">
            <div className="p-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                Insert Document Element
              </span>
              <button onClick={() => setShowInserter(false)} className="text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Text Elements</span>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => addBlock("paragraph")} className="p-2.5 rounded border border-slate-200 hover:border-cyan-600 hover:bg-cyan-50 flex items-center gap-2 text-slate-700">
                    <Type size={14} className="text-cyan-600" /> Paragraph
                  </button>
                  <button onClick={() => addBlock("heading")} className="p-2.5 rounded border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 flex items-center gap-2 text-slate-700">
                    <Heading size={14} className="text-indigo-600" /> Heading
                  </button>
                  <button onClick={() => addBlock("list")} className="p-2.5 rounded border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 flex items-center gap-2 text-slate-700">
                    <List size={14} className="text-emerald-600" /> Bullet List
                  </button>
                  <button onClick={() => addBlock("quote")} className="p-2.5 rounded border border-slate-200 hover:border-amber-600 hover:bg-amber-50 flex items-center gap-2 text-slate-700">
                    <Quote size={14} className="text-amber-600" /> Blockquote
                  </button>
                  <button onClick={() => addBlock("code")} className="p-2.5 rounded border border-slate-200 hover:border-slate-600 hover:bg-slate-50 flex items-center gap-2 text-slate-700">
                    <Code size={14} className="text-slate-600" /> Code Snippet
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Media & Layout</span>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => addBlock("image")} className="p-2.5 rounded border border-slate-200 hover:border-purple-600 hover:bg-purple-50 flex items-center gap-2 text-slate-700">
                    <ImageIcon size={14} className="text-purple-600" /> Image
                  </button>
                  <button onClick={() => addBlock("table")} className="p-2.5 rounded border border-slate-200 hover:border-blue-600 hover:bg-blue-50 flex items-center gap-2 text-slate-700">
                    <TableIcon size={14} className="text-blue-600" /> Table
                  </button>
                  <button onClick={() => addBlock("columns")} className="p-2.5 rounded border border-slate-200 hover:border-pink-600 hover:bg-pink-50 flex items-center gap-2 text-slate-700">
                    <Columns size={14} className="text-pink-600" /> 2 Columns
                  </button>
                  <button onClick={() => addBlock("video")} className="p-2.5 rounded border border-slate-200 hover:border-teal-600 hover:bg-teal-50 flex items-center gap-2 text-slate-700">
                    <Video size={14} className="text-teal-600" /> Video
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Interactive & Conversion</span>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => addBlock("cta")} className="p-2.5 rounded border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 flex items-center gap-2 text-slate-700">
                    <Sparkles size={14} className="text-emerald-600" /> Agency CTA
                  </button>
                  <button onClick={() => addBlock("faq")} className="p-2.5 rounded border border-slate-200 hover:border-orange-600 hover:bg-orange-50 flex items-center gap-2 text-slate-700">
                    <HelpCircle size={14} className="text-orange-600" /> FAQ Accordion
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Left Side Document Outline */}
        {showListView && (
          <aside className="w-60 bg-slate-100 border-r border-slate-300 p-3 space-y-2 overflow-y-auto text-xs z-10 shrink-0">
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Document Outline</span>
            <div className="space-y-1">
              {blocks.map((b, idx) => (
                <div
                  key={b.id}
                  onClick={() => setFocusedBlockId(b.id)}
                  className={cn(
                    "p-2 rounded border cursor-pointer flex items-center justify-between text-xs transition-all",
                    focusedBlockId === b.id ? "bg-cyan-600 text-white border-cyan-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span className="truncate font-semibold">{idx + 1}. {b.type.toUpperCase()}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(idx, "up"); }} className="p-0.5"><MoveUp size={10} /></button>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(idx, "down"); }} className="p-0.5"><MoveDown size={10} /></button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* 3. SINGLE CONTINUOUS WRITING CANVAS (Word / Docs Style) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-slate-300">
          {/* Continuous White Paper Page */}
          <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 min-h-[900px] shadow-sm border border-slate-200 text-slate-900 leading-relaxed font-sans space-y-4 relative">
            
            {/* Document Title Header */}
            <div className="pb-4 mb-4 border-b border-slate-100">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add title"
                className="w-full text-4xl md:text-5xl font-extrabold text-slate-900 placeholder-slate-300 focus:outline-none tracking-tight bg-transparent"
              />
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>Permalink:</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent border-b border-dashed border-slate-300 text-cyan-700 font-semibold focus:outline-none focus:border-cyan-600"
                />
              </div>
            </div>

            {/* Seamless Document Flow - NO Cards / NO Containers */}
            {blocks.map((block, idx) => (
              <div
                key={block.id}
                onMouseEnter={() => setHoveredBlockId(block.id)}
                onMouseLeave={() => setHoveredBlockId(null)}
                onClick={() => {
                  setFocusedBlockId(block.id);
                  setActiveSidebarTab("block");
                }}
                className="relative group transition-all"
              >
                {/* Contextual Floating Toolbar (Only visible on focus or hover) */}
                {(focusedBlockId === block.id || hoveredBlockId === block.id) && (
                  <div className="absolute -top-9 right-0 z-20 flex items-center gap-1 bg-[#1D2327] text-white px-2 py-1 rounded shadow-md text-xs opacity-90 hover:opacity-100 transition-all">
                    <button onClick={() => moveBlock(idx, "up")} className="p-0.5 hover:bg-slate-700 rounded"><MoveUp size={11} /></button>
                    <button onClick={() => moveBlock(idx, "down")} className="p-0.5 hover:bg-slate-700 rounded"><MoveDown size={11} /></button>
                    <div className="h-3 w-[1px] bg-slate-600" />
                    <button onClick={() => updateBlock(block.id, { bold: !block.bold })} className={cn("p-0.5 rounded", block.bold && "bg-cyan-600")}><Bold size={11} /></button>
                    <button onClick={() => updateBlock(block.id, { italic: !block.italic })} className={cn("p-0.5 rounded", block.italic && "bg-cyan-600")}><Italic size={11} /></button>
                    <button onClick={() => deleteBlock(block.id)} className="p-0.5 hover:bg-slate-700 rounded text-rose-400"><Trash2 size={11} /></button>
                  </div>
                )}

                {/* Inline Paragraph */}
                {block.type === "paragraph" && (
                  <textarea
                    value={block.text || ""}
                    onChange={(e) => handleTextChange(block.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, idx, block)}
                    placeholder="Write your article content or type / for commands..."
                    className={cn(
                      "w-full bg-transparent text-slate-800 text-base leading-relaxed focus:outline-none resize-none overflow-hidden",
                      block.bold && "font-bold",
                      block.italic && "italic",
                      block.underline && "underline"
                    )}
                    rows={Math.max(1, (block.text || "").split("\n").length)}
                  />
                )}

                {/* Slash Command Dropdown */}
                {slashMenuBlockId === block.id && (
                  <div className="absolute top-8 left-0 z-30 w-56 bg-[#1D2327] text-white border border-slate-700 rounded shadow-2xl p-2 space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Quick Insert</span>
                    <button onClick={() => addBlock("heading", idx)} className="w-full text-left p-1.5 hover:bg-cyan-600 rounded flex items-center gap-2">
                      <Heading size={13} /> Heading
                    </button>
                    <button onClick={() => addBlock("image", idx)} className="w-full text-left p-1.5 hover:bg-cyan-600 rounded flex items-center gap-2">
                      <ImageIcon size={13} /> Image
                    </button>
                    <button onClick={() => addBlock("list", idx)} className="w-full text-left p-1.5 hover:bg-cyan-600 rounded flex items-center gap-2">
                      <List size={13} /> Bullet List
                    </button>
                    <button onClick={() => addBlock("table", idx)} className="w-full text-left p-1.5 hover:bg-cyan-600 rounded flex items-center gap-2">
                      <TableIcon size={13} /> Table
                    </button>
                    <button onClick={() => addBlock("quote", idx)} className="w-full text-left p-1.5 hover:bg-cyan-600 rounded flex items-center gap-2">
                      <Quote size={13} /> Blockquote
                    </button>
                  </div>
                )}

                {/* Inline Heading */}
                {block.type === "heading" && (
                  <div className="my-2">
                    <input
                      type="text"
                      value={block.text || ""}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      onKeyDown={(e) => handleKeyDown(e, idx, block)}
                      placeholder="Heading..."
                      className={cn(
                        "w-full bg-transparent font-extrabold text-slate-900 focus:outline-none tracking-tight",
                        block.level === 1 ? "text-3xl" : block.level === 3 ? "text-xl" : "text-2xl"
                      )}
                    />
                  </div>
                )}

                {/* Inline Bullet List */}
                {block.type === "list" && (
                  <ul className="list-disc list-inside space-y-1 my-2 text-slate-800 text-base">
                    {(block.items || ["First item"]).map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const updatedItems = [...(block.items || [])];
                            updatedItems[itemIdx] = e.target.value;
                            updateBlock(block.id, { items: updatedItems });
                          }}
                          placeholder="List item..."
                          className="bg-transparent focus:outline-none text-slate-800"
                        />
                      </li>
                    ))}
                  </ul>
                )}

                {/* Inline Blockquote */}
                {block.type === "quote" && (
                  <blockquote className="border-l-4 border-cyan-600 pl-4 py-2 italic text-slate-700 my-4 bg-slate-50/50 rounded-r">
                    <textarea
                      value={block.text || ""}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      placeholder="Quote text..."
                      className="w-full bg-transparent focus:outline-none resize-none text-base italic"
                      rows={2}
                    />
                  </blockquote>
                )}

                {/* Inline Image */}
                {block.type === "image" && (
                  <div className="my-6 space-y-2">
                    {block.src ? (
                      <div className="relative group/img max-w-2xl mx-auto rounded overflow-hidden shadow-sm border border-slate-200">
                        <img src={block.src} alt={block.alt || "Inline Image"} className="w-full h-auto object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setTargetBlockIdForMedia(block.id);
                              setShowMediaModal(true);
                            }}
                            className="px-3 py-1.5 bg-white text-slate-900 rounded font-bold text-xs shadow"
                          >
                            Replace Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setTargetBlockIdForMedia(block.id);
                          setShowMediaModal(true);
                        }}
                        className="py-10 border-2 border-dashed border-slate-300 hover:border-cyan-600 rounded text-center text-slate-500 font-semibold cursor-pointer bg-slate-50/50"
                      >
                        Click to select image from Media Library
                      </div>
                    )}
                  </div>
                )}

                {/* Inline Table */}
                {block.type === "table" && (
                  <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300 text-xs">
                      <tbody>
                        {(block.tableRows || [["Col 1", "Col 2"], ["Data 1", "Data 2"]]).map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx === 0 ? "bg-slate-100 font-bold" : ""}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="border border-slate-300 p-2">
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(e) => {
                                    const updatedRows = [...(block.tableRows || [])];
                                    updatedRows[rIdx][cIdx] = e.target.value;
                                    updateBlock(block.id, { tableRows: updatedRows });
                                  }}
                                  className="w-full bg-transparent focus:outline-none"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* 4. RIGHT SIDEBAR (WordPress Accordions & Settings Panel) */}
        <aside className="w-80 bg-[#FFFFFF] border-l border-slate-300 flex flex-col shrink-0 text-xs select-none">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 font-bold">
            <button
              onClick={() => setActiveSidebarTab("post")}
              className={cn(
                "flex-1 py-2.5 text-center transition-all border-b-2",
                activeSidebarTab === "post"
                  ? "border-[#2271B1] text-[#2271B1] bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              )}
            >
              Post Settings
            </button>
            <button
              onClick={() => setActiveSidebarTab("block")}
              className={cn(
                "flex-1 py-2.5 text-center transition-all border-b-2",
                activeSidebarTab === "block"
                  ? "border-[#2271B1] text-[#2271B1] bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              )}
            >
              Element Properties
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-300">
            {activeSidebarTab === "post" && (
              <>
                {/* Publish Panel Accordion */}
                <div className="border border-slate-200 rounded bg-white overflow-hidden shadow-sm">
                  <div
                    onClick={() => setPanelPublish(!panelPublish)}
                    className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-700 cursor-pointer"
                  >
                    <span>Publish Controls</span>
                    {panelPublish ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>

                  {panelPublish && (
                    <div className="p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Status:</span>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value as PostEditorData["status"])}
                          className="bg-slate-100 border border-slate-300 rounded px-2 py-1 font-bold text-slate-800 focus:outline-none"
                        >
                          <option value="DRAFT">Draft</option>
                          <option value="REVIEW">Pending Review</option>
                          <option value="PUBLISHED">Published</option>
                          <option value="SCHEDULED">Scheduled</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          onClick={() => setShowRevisionModal(true)}
                          className="text-cyan-700 font-bold flex items-center gap-1 hover:underline"
                        >
                          <History size={13} /> {initialData?.revisions?.length || 1} Revisions
                        </button>
                        <button
                          onClick={() => handleSave("DRAFT")}
                          className="px-2 py-1 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700"
                        >
                          Save Draft
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Categories Panel Accordion */}
                <div className="border border-slate-200 rounded bg-white overflow-hidden shadow-sm">
                  <div
                    onClick={() => setPanelCategories(!panelCategories)}
                    className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-700 cursor-pointer"
                  >
                    <span>Categories</span>
                    {panelCategories ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>

                  {panelCategories && (
                    <div className="p-3 space-y-2 max-h-40 overflow-y-auto">
                      {categories.map((c) => (
                        <label key={c.id} className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategoryId === c.id}
                            onChange={() => setSelectedCategoryId(c.id)}
                            className="text-cyan-600 focus:ring-cyan-500"
                          />
                          <span>{c.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags Panel Accordion */}
                <div className="border border-slate-200 rounded bg-white overflow-hidden shadow-sm">
                  <div
                    onClick={() => setPanelTags(!panelTags)}
                    className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-700 cursor-pointer"
                  >
                    <span>Tags</span>
                    {panelTags ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>

                  {panelTags && (
                    <div className="p-3 space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                          placeholder="Add new tag..."
                          className="flex-1 bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-slate-800 focus:outline-none"
                        />
                        <button
                          onClick={handleAddTag}
                          className="px-3 py-1 bg-slate-200 border border-slate-300 font-bold rounded"
                        >
                          Add
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded-full font-semibold text-[11px] text-slate-700 flex items-center gap-1"
                          >
                            {t}
                            <button onClick={() => handleRemoveTag(t)} className="text-slate-400 hover:text-rose-600">
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Featured Image Panel Accordion */}
                <div className="border border-slate-200 rounded bg-white overflow-hidden shadow-sm">
                  <div
                    onClick={() => setPanelFeaturedImage(!panelFeaturedImage)}
                    className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-700 cursor-pointer"
                  >
                    <span>Featured Image</span>
                    {panelFeaturedImage ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>

                  {panelFeaturedImage && (
                    <div className="p-3 space-y-3">
                      {featuredImage ? (
                        <div className="space-y-2">
                          <div className="w-full h-36 rounded border border-slate-300 overflow-hidden">
                            <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
                          </div>
                          <button
                            onClick={() => setFeaturedImage("")}
                            className="text-xs text-rose-600 font-bold hover:underline"
                          >
                            Remove featured image
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setTargetBlockIdForMedia(null);
                            setShowMediaModal(true);
                          }}
                          className="w-full py-4 border-2 border-dashed border-slate-300 hover:border-cyan-600 rounded text-center text-cyan-700 font-bold"
                        >
                          Set featured image
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* SEO Inspector Panel Accordion */}
                <div className="border border-slate-200 rounded bg-white overflow-hidden shadow-sm">
                  <div
                    onClick={() => setPanelSEO(!panelSEO)}
                    className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-700 cursor-pointer"
                  >
                    <span>SEO & Meta Inspector</span>
                    {panelSEO ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>

                  {panelSEO && (
                    <div className="p-3 space-y-3">
                      <div>
                        <label className="text-slate-500 font-semibold">SEO Title</label>
                        <input
                          type="text"
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          placeholder={title}
                          className="w-full mt-1 bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-slate-800 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-slate-500 font-semibold">Meta Description</label>
                        <textarea
                          value={metaDescription}
                          onChange={(e) => setMetaDescription(e.target.value)}
                          placeholder={excerpt}
                          rows={2}
                          className="w-full mt-1 bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-slate-800 focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeSidebarTab === "block" && (
              <div className="space-y-4">
                {focusedBlock ? (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-3">
                    <span className="font-bold uppercase text-slate-600 text-[10px]">
                      Selected Element: {focusedBlock.type}
                    </span>
                    <div>
                      <label className="text-slate-500 font-semibold">Alignment</label>
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={() => updateBlock(focusedBlock.id, { align: "left" })}
                          className="p-1 bg-white border border-slate-300 rounded"
                        >
                          <AlignLeft size={14} />
                        </button>
                        <button
                          onClick={() => updateBlock(focusedBlock.id, { align: "center" })}
                          className="p-1 bg-white border border-slate-300 rounded"
                        >
                          <AlignCenter size={14} />
                        </button>
                        <button
                          onClick={() => updateBlock(focusedBlock.id, { align: "right" })}
                          className="p-1 bg-white border border-slate-300 rounded"
                        >
                          <AlignRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-center py-6">
                    Click any document element to inspect its properties.
                  </p>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
