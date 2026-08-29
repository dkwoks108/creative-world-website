'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CWButton } from '@/components/ui/CWButton';
import { ArrowUpRight, ShieldCheck, Zap, TrendingUp, BarChart3, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/site';

export function CreativeHeroSection() {
  return (
    <section className="relative bg-[#07090E] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-slate-800/80">
      {/* Background Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Conversion Offer (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Category Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#00CFFF]/25 bg-[#00CFFF]/5 text-xs font-mono text-[#00CFFF]"
            >
              <span className="w-2 h-2 rounded-full bg-[#00CFFF] animate-pulse" />
              <span>Jaipur Digital Growth &amp; Creative Technology Studio</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-6xl lg:text-6xl tracking-tight text-white leading-[1.08]"
            >
              We build connected search visibility &amp; <span className="text-cw-gradient">high-conversion revenue</span> systems.
            </motion.h1>

            {/* Paragraph Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans max-w-2xl"
            >
              Creativee World combines authority SEO, high-converting Meta reels, intent Google Ads, and sub-2s web software for commercial brands in Jaipur.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="/growth-audit">
                <CWButton variant="gradient" size="lg" className="px-7 py-3.5 text-base">
                  <span>{siteConfig.primaryCTA || 'Get Free Growth Audit'}</span>
                  <ArrowUpRight size={18} />
                </CWButton>
              </Link>
              <Link href="/services">
                <CWButton variant="secondary" size="lg" className="px-7 py-3.5 text-base">
                  <span>Explore Capabilities</span>
                </CWButton>
              </Link>
            </motion.div>

            {/* Trust Signals Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-slate-400 text-xs sm:text-sm font-sans"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#00CFFF] shrink-0" />
                <span>Verified ROI Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#1769FF] shrink-0" />
                <span>Sub-2s Web Load Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-[#D900FF] shrink-0" />
                <span>Closed-Loop Lead CRM</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Interactive Growth Metric Dossier Widget (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="cw-card-featured p-6 space-y-6 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#00CFFF]/10 text-[#00CFFF]">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white">GROWTH ENGINE DOSSIER</h3>
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Live Studio Performance</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#00CFFF] bg-[#00CFFF]/10 px-2.5 py-1 rounded-full border border-[#00CFFF]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00CFFF] animate-ping" />
                  ACTIVE
                </span>
              </div>

              {/* Stat 1: Revenue Influenced */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Revenue Influenced (Q1/Q2 2026)</span>
                  <span className="text-[#00CFFF] font-mono font-bold">+184% YoY</span>
                </div>
                <div className="text-3xl font-display font-extrabold text-white tracking-tight">
                  ₹1.42<span className="text-[#00CFFF]">Cr+</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-cw-gradient h-full w-[84%]" />
                </div>
              </div>

              {/* Stat 2 Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                  <div className="text-[11px] text-slate-400 font-sans">Meta Ads ROAS</div>
                  <div className="text-xl font-display font-bold text-white">4.82x Avg</div>
                  <div className="text-[10px] text-[#00CFFF] font-mono">Verified Attributions</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
                  <div className="text-[11px] text-slate-400 font-sans">Organic Search</div>
                  <div className="text-xl font-display font-bold text-white">Top 3 Rank</div>
                  <div className="text-[10px] text-[#1769FF] font-mono">High-Intent Queries</div>
                </div>
              </div>

              {/* System Guarantee */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#00CFFF]" />
                  <span>Jaipur Local Market Supremacy</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 uppercase">ISO 9001 PROCESS</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
