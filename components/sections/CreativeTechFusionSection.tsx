'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Video, Code, BarChart3, Sparkles } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWCard } from '@/components/ui/CWCard';

export function CreativeTechFusionSection() {
  const fusionPillars = [
    {
      title: 'Creative Visual Storytelling',
      icon: Video,
      desc: 'Scripted short video reels, high-hook ad creatives, and cinematic video storytelling engineered to capture immediate 3-second attention on Meta & YouTube.',
      badge: 'Attention Engine',
    },
    {
      title: 'Technical Web Software',
      icon: Code,
      desc: 'Sub-2-second page loads powered by Next.js App Router, SSR, edge caching, and zero layout shift web engineering for maximum conversion velocity.',
      badge: 'Software Engine',
    },
    {
      title: 'Data & Search Attribution',
      icon: BarChart3,
      desc: 'Keyword dominance architecture, high-intent Google Ads bidding, and closed-loop WhatsApp CRM tracking for 100% attribution transparency.',
      badge: 'Attribution Engine',
    },
  ];

  return (
    <section className="py-24 bg-[#07090E] text-slate-100 relative overflow-hidden cw-ambient-glow border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-10">
          <div className="lg:col-span-8 space-y-4">
            <RevealOnScroll variant="fade-up">
              <CWBadge variant="magenta">
                <Sparkles size={13} />
                <span>The Creative-Tech Fusion Engine</span>
              </CWBadge>
            </RevealOnScroll>

            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Where storytelling meets <br />
              <span className="text-cw-gradient">high-performance web software.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-sm text-slate-400 font-light">
            <p>
              We bring together creative video production, Next.js web engineering, and search intelligence under one unified roof in Jaipur.
            </p>
          </div>
        </div>

        {/* Signature Visual Showcase */}
        <RevealOnScroll variant="fade-up">
          <div className="relative w-full h-[280px] sm:h-[400px] rounded-3xl overflow-hidden border border-slate-800 bg-[#07090E] shadow-[0_0_50px_rgba(217,0,255,0.15)] group">
            <Image
              src="/visuals/homepage/creative-tech-fusion.webp"
              alt="Creative Technology Fusion Visualization"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-white z-10">
              <span className="bg-[#07090E]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[#D900FF] font-bold">
                CREATIVE REELS + NEXT.JS + SEARCH INTELLIGENCE
              </span>
              <span className="hidden sm:inline bg-[#00CFFF]/20 backdrop-blur-md text-[#00CFFF] px-4 py-2 rounded-xl border border-[#00CFFF]/30">
                100% UNIFIED COMMERCIAL ENGINE
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Pillar Glassmorphism Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {fusionPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <RevealOnScroll key={pillar.title} variant="fade-up" delay={idx * 0.1}>
                <CWCard variant="dark" className="h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-cw-gradient flex items-center justify-center text-white shadow-cw-glow">
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-xs text-[#00CFFF] font-semibold">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl text-white">
                      {pillar.title}
                    </h3>

                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>INTEGRATION STATUS:</span>
                      <span className="text-emerald-400 font-bold">● ACTIVE</span>
                    </div>
                  </div>
                </CWCard>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
}
