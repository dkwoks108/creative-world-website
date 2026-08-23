"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Globe, 
  Zap, 
  BarChart3, 
  Target, 
  Link2, 
  FileSearch, 
  LineChart, 
  PenTool, 
  MapPin,
  Share2,
  Sparkles
} from "lucide-react";

const seoTools = [
  {
    name: "Keyword Intelligence & AEO",
    description: "Discover high-volume, low-competition keywords & AI search engine citation queries.",
    icon: <Search className="text-cyan-400" />,
  },
  {
    name: "Technical Web Vitals Audit",
    description: "Crawl your website to identify and fix Core Web Vitals and SSR indexation blocks.",
    icon: <Globe className="text-indigo-400" />,
  },
  {
    name: "Backlink Authority Monitor",
    description: "Analyze backlink domain trust scores and disavow toxic spam link profiles.",
    icon: <Link2 className="text-purple-400" />,
  },
  {
    name: "Competitor Market Matrix",
    description: "Track competitors' organic rankings, content clusters, and keyword gap opportunities.",
    icon: <Target className="text-rose-400" />,
  },
  {
    name: "SERP Rank Tracker",
    description: "Daily automated tracking of keyword positions in Google Search and AI Overviews.",
    icon: <LineChart className="text-emerald-400" />,
  },
  {
    name: "On-Page Optimizer & Schema",
    description: "Generate structured JSON-LD data and optimize H1-H6 headers for featured snippets.",
    icon: <PenTool className="text-amber-400" />,
  },
  {
    name: "Content Gap Analysis",
    description: "Identify high-converting topics your competitors rank for but you lack coverage on.",
    icon: <FileSearch className="text-cyan-400" />,
  },
  {
    name: "Local GEO Presence",
    description: "Optimize hyper-local maps rankings and Google Business Profile verification.",
    icon: <MapPin className="text-orange-400" />,
  },
  {
    name: "Social Signal Telemetry",
    description: "Monitor cross-platform social shares and virality signals impacting search authority.",
    icon: <Share2 className="text-pink-400" />,
  },
  {
    name: "PageSpeed & CWV Engine",
    description: "Analyze LCP, FID, and CLS performance to optimize server render speeds.",
    icon: <Zap className="text-amber-300" />,
  }
];

export default function SEOToolsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111622] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
            <BarChart3 className="text-cyan-400" size={24} />
            Enterprise SEO & AEO Optimization Tools
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Suite of search engine optimization & AI answer engine authority tools
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#0D121F] border border-[#1E293B] px-3.5 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
          <Sparkles size={14} /> AI-Powered Suite
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seoTools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group relative bg-[#111622] border border-[#1E293B] rounded-2xl p-5 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 bg-[#0D121F] border border-[#1E293B] rounded-xl group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {tool.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
