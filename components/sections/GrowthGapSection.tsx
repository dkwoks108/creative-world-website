'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, AlertCircle, CheckCircle2, TrendingDown, TrendingUp, Sparkles } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWCard } from '@/components/ui/CWCard';
import { CWButton } from '@/components/ui/CWButton';
import { CWBadge } from '@/components/ui/CWBadge';

export function GrowthGapSection() {
  return (
    <section className="py-24 bg-[#FAFBFF] text-slate-900 relative overflow-hidden border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-slate-200 pb-10">
          <div className="lg:col-span-8 space-y-4">
            <RevealOnScroll variant="fade-up">
              <CWBadge variant="cyan">
                <Sparkles size={13} />
                <span>The Commercial Growth Gap</span>
              </CWBadge>
            </RevealOnScroll>

            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
              Isolated marketing tactics <br />
              <span className="text-cw-gradient">vs. connected growth systems.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-sm text-slate-600 space-y-2 font-light">
            <p className="font-medium text-slate-900">
              Local Jaipur businesses lose up to 60% of potential high-intent leads due to disconnected agencies and siloes.
            </p>
          </div>
        </div>

        {/* 2 Column Comparison Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Model A: Siloed Tactics */}
          <RevealOnScroll variant="fade-up" delay={0.1}>
            <div className="cw-light-glass-card rounded-3xl p-8 space-y-8 flex flex-col justify-between border-slate-200 bg-white/90">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-semibold">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                    Model A // Siloed Vendor Trap
                  </span>
                  <span className="text-rose-500 font-medium flex items-center gap-1">
                    <TrendingDown size={16} />
                    High Ad Waste
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-slate-900">
                    Hiring Disconnected Freelancers & Agencies
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    Managing separate vendors for SEO, web templates, and social ads causes fragmented messaging, slow WordPress loads, and unverified lead tracking.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  {[
                    'Ad spend wasted without lead attribution',
                    'Slow template sites that drop mobile traffic',
                    'Zero direct WhatsApp customer routes',
                    'Inconsistent brand storytelling across channels',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <AlertCircle size={16} className="text-rose-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 font-mono text-xs font-semibold uppercase tracking-wide">
                OUTCOME: HIGH CAC & UNPREDICTABLE LEADS
              </div>
            </div>
          </RevealOnScroll>

          {/* Model B: Connected Growth System */}
          <RevealOnScroll variant="fade-up" delay={0.2}>
            <div className="cw-glass-card rounded-3xl p-8 space-y-8 flex flex-col justify-between border-white/20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-cw-glow">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-semibold">
                  <span className="px-3 py-1 bg-[#1769FF] text-white rounded-full">
                    Model B // Connected System
                  </span>
                  <span className="text-[#00CFFF] font-medium flex items-center gap-1">
                    <TrendingUp size={16} />
                    Predictable Revenue
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-white">
                    The Creativee World Connected Engine
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    A unified commercial growth system where high-intent search ads, short reels, local SEO, and sub-2s Next.js web applications work together seamlessly.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-200 font-light">
                  {[
                    'Sub-2s Next.js web app optimized for conversions',
                    'Top search placement on Google & Map Pack',
                    'Meta Reels scripted for 3-second hook rate',
                    'Closed-loop WhatsApp & CRM lead tracking',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 border border-white/10">
                      <CheckCircle2 size={16} className="text-[#00CFFF] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/90 text-[#00CFFF] font-mono text-xs font-semibold uppercase tracking-wide flex items-center justify-between">
                <span>OUTCOME: SCALABLE PIPELINE GROWTH</span>
                <span>● VERIFIED</span>
              </div>
            </div>
          </RevealOnScroll>

        </div>

        {/* Diagnostic Action Bar */}
        <div className="cw-light-glass-card rounded-3xl p-8 bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-2xl text-slate-900">
              Audit your current marketing efficiency
            </h3>
            <p className="text-sm text-slate-600 font-light">
              Receive a free 15-minute breakdown of your traffic bottlenecks and ad waste in Jaipur.
            </p>
          </div>

          <Link href="/growth-audit">
            <CWButton variant="gradient" size="md">
              <span>Get Free Diagnostic</span>
              <ArrowUpRight size={16} />
            </CWButton>
          </Link>
        </div>

      </div>
    </section>
  );
}
