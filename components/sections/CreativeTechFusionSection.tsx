'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Video, Code, BarChart3, Sparkles } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWCard } from '@/components/ui/CWCard';
import { CinematicVideoPlayer } from '@/components/ui/CinematicVideoPlayer';

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

        {/* Interactive Video Player Frame */}
        <RevealOnScroll variant="fade-up">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>CINEMATIC SHOWCASE // REELS & PRODUCTION FRAME</span>
              <span className="text-[#00CFFF]">4K HIGH-BITRATE REELS ENGINE</span>
            </div>
            <CinematicVideoPlayer src="/brand/hero-video.mp4" poster="/brand/og-image.png" />
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
