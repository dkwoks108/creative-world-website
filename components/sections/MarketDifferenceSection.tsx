'use client';

import React from 'react';
import Image from 'next/image';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { Zap, Layers, RefreshCw, BarChart3, Search, Share2, Sparkles, ShieldCheck } from 'lucide-react';
import { CinematicVideoPlayer } from '@/components/monochrome/CinematicVideoPlayer';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';

export function MarketDifferenceSection() {
  const VIDEO_4_URL =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

  return (
    <MonochromeSection divider="thick" texture="grid">
      <div className="space-y-16">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal direction="bottom" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white">
                <span className="w-2 h-2 bg-black inline-block" aria-hidden="true" />
                <span>06 / SYSTEMIC DIFFERENTIATION</span>
              </div>
            </ScrollReveal>

            <SplitTextReveal
              as="h2"
              text="MOST AGENCIES OPTIMIZE CHANNELS. WE OPTIMIZE THE SYSTEM."
              className="font-serif font-bold text-4xl sm:text-6xl text-black tracking-tight uppercase leading-none"
            />

            <ScrollReveal direction="bottom" delay={0.25}>
              <p className="font-serifBody text-lg sm:text-xl text-neutral-800 leading-relaxed font-normal">
                Traditional agencies treat paid ads, SEO, and web design as isolated silos. We unify data, creative execution, and conversion engineering into a compounding growth ecosystem.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <MaskReveal delay={0.2} duration={0.9}>
              <div className="border-4 border-black bg-black relative overflow-hidden">
                <CinematicVideoPlayer
                  src={VIDEO_4_URL}
                  overlayOpacity={0.35}
                  grayscale
                  contrast={1.2}
                  scanlines
                  className="h-[220px] sm:h-[280px] w-full"
                />
                <div className="absolute top-3 left-3 bg-white border-2 border-black px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-black">
                  COMPETITIVE ADVANTAGE
                </div>
              </div>
            </MaskReveal>
          </div>
        </div>

        {/* Visual Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: Fragmented Agency Model */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="flex flex-col justify-between p-8 border-2 border-black bg-neutral-100 space-y-6 h-full">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-black pb-4">
                  <div>
                    <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest block font-bold">
                      THE TRADITIONAL APPROACH
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-black uppercase mt-1">
                      Fragmented Channel Silos
                    </h3>
                  </div>
                  <span className="px-3 py-1 text-[10px] font-mono uppercase bg-neutral-300 text-black border border-black font-bold">
                    HIGH FRICTION
                  </span>
                </div>

                {/* Siloed Node Diagram */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
                  {[
                    { icon: Search, name: 'Siloed SEO', sub: 'Isolated keywords' },
                    { icon: Zap, name: 'Paid Ads', sub: 'High CAC spend' },
                    { icon: Layers, name: 'Creative', sub: 'Ad-hoc design' },
                    { icon: RefreshCw, name: 'Website', sub: 'Low conversion' },
                    { icon: BarChart3, name: 'Analytics', sub: 'Delayed reports' },
                    { icon: Share2, name: 'Paid Social', sub: 'Unmapped audience' },
                  ].map((silo, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 border border-black bg-white flex flex-col space-y-1.5"
                    >
                      <silo.icon size={16} strokeWidth={2} className="text-black" />
                      <span className="font-mono text-xs font-bold text-black uppercase">{silo.name}</span>
                      <span className="text-[10px] text-neutral-600 font-serifBody">{silo.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t-2 border-black text-xs text-black font-mono flex items-center justify-between font-bold">
                <span>OUTCOME: DISCONNECTED REPORTING & WASTED BUDGET</span>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Connected Growth System */}
          <ScrollReveal direction="right" delay={0.3}>
            <div className="flex flex-col justify-between p-8 border-4 border-black bg-white space-y-6 h-full">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-black pb-4">
                  <div>
                    <span className="font-mono text-xs text-black uppercase tracking-widest block font-bold">
                      SURNAX GROWTH SYSTEM
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-black uppercase mt-1">
                      Connected Growth Ecosystem
                    </h3>
                  </div>
                  <span className="px-3 py-1 text-[10px] font-mono uppercase bg-black text-white border border-black font-bold">
                    COMPOUNDING SCALE
                  </span>
                </div>

                {/* Connected Core Diagram & Engine Visual */}
                <div className="p-4 border-2 border-black bg-black space-y-4 text-white relative overflow-hidden">
                  <div className="relative h-44 w-full border border-neutral-800">
                    <Image
                      src="/images/sections/market-difference-engine.png"
                      alt="Surnax Revenue Engine Node Architecture Graph"
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover object-center grayscale contrast-125 opacity-90"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 border border-white/20 font-mono text-[9px] uppercase tracking-widest text-white">
                      REV_ENGINE // NODE MATRIX
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-black font-serifBody">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-black inline-block shrink-0 mt-1" />
                    <span>Shared data layer between paid media, search intelligence, and CRO.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-black inline-block shrink-0 mt-1" />
                    <span>Dynamic creative testing loops mapped to real customer acquisition costs.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t-2 border-black text-xs text-black font-mono flex items-center justify-between font-bold">
                <span>OUTCOME: PREDICTABLE REVENUE & COMPOUNDING ROI</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </MonochromeSection>
  );
}



