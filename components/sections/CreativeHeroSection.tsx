'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Terminal, Activity, ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWButton } from '@/components/ui/CWButton';
import { CWBadge } from '@/components/ui/CWBadge';
import { siteConfig } from '@/data/site';

export function CreativeHeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center bg-[#07090E] text-slate-100 overflow-hidden pt-32 pb-20 cw-ambient-glow">
      
      {/* Ambient Gradient Mesh Fields */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#1769FF]/20 via-[#673BFF]/20 to-[#D900FF]/15 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Status Pill Badge */}
            <RevealOnScroll variant="fade-up" duration={0.4}>
              <CWBadge variant="cyan">
                <Sparkles size={14} />
                <span>Creative Strategy + Next.js Tech + Performance Marketing</span>
              </CWBadge>
            </RevealOnScroll>

            {/* Oversized Sentence-Case Display Headline */}
            <div className="space-y-4">
              <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                We turn ideas into{' '}
                <span className="text-cw-gradient block mt-1">
                  digital growth systems.
                </span>
              </h1>

              <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl pt-2">
                Creativee World combines high-converting Meta reels, authority search engine optimization, intent-based Google Ads, and sub-2s web software for commercial brands in Jaipur.
              </p>
            </div>

            {/* Dual CTAs & Trust Indicators */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>{siteConfig.primaryCTA}</span>
                    <ArrowUpRight size={18} />
                  </CWButton>
                </Link>

                <Link href="/services">
                  <CWButton variant="glass" size="lg">
                    <span>Explore Capabilities</span>
                    <ChevronRight size={18} />
                  </CWButton>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium border-t border-white/10 pt-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#00CFFF]" />
                  <span>Verified ROI Attributions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-[#D900FF]" />
                  <span>Sub-2s Page Loads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-[#1769FF]" />
                  <span>Closed-Loop CRM Tracking</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Visual CW Spectrum Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <RevealOnScroll variant="fade-up" delay={0.2}>
              <div className="relative w-full max-w-md aspect-square cw-glass-card rounded-3xl p-8 flex flex-col justify-between items-center text-center overflow-hidden border border-white/20 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 shadow-2xl">
                
                {/* Floating CW Symbol Mark */}
                <div className="relative z-10 w-full flex justify-center py-6">
                  <div className="relative w-36 h-36 flex items-center justify-center rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xl shadow-cw-glow">
                    <Image
                      src="/brand/symbol-only-transparent.png"
                      alt="Creativee World CW Symbol"
                      width={100}
                      height={60}
                      className="object-contain animate-pulse"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Metric Chips */}
                <div className="w-full space-y-3 relative z-10">
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between font-mono text-xs text-slate-200">
                    <span className="text-[#00CFFF] font-semibold">Lead Velocity</span>
                    <span className="font-bold text-white">+340% Avg Growth</span>
                  </div>
                  
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between font-mono text-xs text-slate-200">
                    <span className="text-[#D900FF] font-semibold">Page Speed Benchmark</span>
                    <span className="font-bold text-white">99/100 Lighthouse</span>
                  </div>
                </div>

                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1769FF]/10 via-[#673BFF]/15 to-[#D900FF]/15 blur-xl pointer-events-none" />

              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
