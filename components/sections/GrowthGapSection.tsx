'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, AlertCircle, CheckCircle2, TrendingDown, TrendingUp, Sparkles } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWButton } from '@/components/ui/CWButton';
import { CWBadge } from '@/components/ui/CWBadge';

export function GrowthGapSection() {
  return (
    <section className="py-24 bg-[#0B0F19] text-white relative overflow-hidden border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-slate-800 pb-10">
          <div className="lg:col-span-8 space-y-4">
            <RevealOnScroll variant="fade-up">
              <CWBadge variant="cyan">
                <Sparkles size={13} />
                <span>The Commercial Growth Gap</span>
              </CWBadge>
            </RevealOnScroll>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Isolated marketing tactics <br />
              <span className="text-cw-gradient">vs. connected growth systems.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-sm text-slate-300 space-y-2 font-sans">
            <p>
              Local Jaipur businesses lose up to 60% of potential high-intent leads due to disconnected freelancers and slow website templates.
            </p>
          </div>
        </div>

        {/* Visual Transformation Engine Banner */}
        <RevealOnScroll variant="fade-up">
          <div className="relative w-full h-[220px] sm:h-[320px] rounded-2xl overflow-hidden border border-slate-800 bg-[#07090E]">
            <Image
              src="/visuals/homepage/growth-gap-system.webp"
              alt="Fragmented Marketing Transformation Visual"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-slate-300">
              <span className="bg-[#07090E]/80 px-3 py-1.5 rounded-lg border border-slate-800">
                STAGE 01: SILOED FRAGMENTS
              </span>
              <span className="hidden sm:inline bg-[#00CFFF]/10 text-[#00CFFF] px-3 py-1.5 rounded-lg border border-[#00CFFF]/25">
                STAGE 02: CONNECTED REVENUE MACHINE
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 2 Column Comparison Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Model A: Siloed Tactics */}
          <RevealOnScroll variant="fade-up" delay={0.1}>
            <div className="cw-card-standard p-8 space-y-8 flex flex-col justify-between h-full bg-[#121826]/70 border-slate-800">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-mono">
                  <span className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20">
                    Model A // Siloed Vendor Trap
                  </span>
                  <span className="text-rose-400 font-medium flex items-center gap-1">
                    <TrendingDown size={14} />
                    High Ad Waste
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-white">
                    Hiring Disconnected Freelancers
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Managing separate freelancers for SEO, web templates, and social ads causes fragmented messaging, slow WordPress loads, and unverified lead tracking.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  {[
                    'Ad spend wasted without closed-loop attribution',
                    'Slow WordPress templates that drop mobile traffic',
                    'Zero direct CRM lead routing',
                    'Inconsistent brand storytelling across channels',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#07090E] border border-slate-800">
                      <AlertCircle size={15} className="text-rose-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-xs font-semibold uppercase tracking-wider">
                OUTCOME: HIGH CAC & UNPREDICTABLE LEADS
              </div>
            </div>
          </RevealOnScroll>

          {/* Model B: Connected Growth System */}
          <RevealOnScroll variant="fade-up" delay={0.2}>
            <div className="cw-card-featured p-8 space-y-8 flex flex-col justify-between h-full relative">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-mono">
                  <span className="px-3 py-1 bg-[#1769FF]/20 text-[#00CFFF] rounded-full border border-[#00CFFF]/30">
                    Model B // Connected System
                  </span>
                  <span className="text-[#00CFFF] font-medium flex items-center gap-1">
                    <TrendingUp size={14} />
                    Predictable Pipeline
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-white">
                    Creativee World Connected Engine
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    A unified commercial growth system where high-intent search ads, short reels, local SEO, and sub-2s Next.js web applications work together seamlessly.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-200">
                  {[
                    'Sub-2s Next.js web application optimized for conversion',
                    'Top search placement on Google & Map Pack',
                    'Meta Reels scripted for 3-second hook rate',
                    'Closed-loop CRM lead tracking',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#07090E] border border-slate-800">
                      <CheckCircle2 size={15} className="text-[#00CFFF] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#00CFFF]/10 border border-[#00CFFF]/25 text-[#00CFFF] font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-between">
                <span>OUTCOME: VERIFIED REVENUE GROWTH</span>
                <span>● CONNECTED</span>
              </div>
            </div>
          </RevealOnScroll>

        </div>

        {/* Diagnostic Action Bar */}
        <div className="cw-card-standard p-8 bg-[#121826] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-2xl text-white">
              Audit your current marketing efficiency
            </h3>
            <p className="text-sm text-slate-400">
              Receive a free 15-minute breakdown of your traffic bottlenecks and ad waste in Jaipur.
            </p>
          </div>

          <Link href="/growth-audit">
            <CWButton variant="gradient" size="md" className="shrink-0">
              <span>Get Free Diagnostic</span>
              <ArrowUpRight size={16} />
            </CWButton>
          </Link>
        </div>

      </div>
    </section>
  );
}
