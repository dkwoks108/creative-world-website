'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { Zap, Layers, RefreshCw, BarChart3, Search, Share2, Sparkles, ShieldCheck } from 'lucide-react';

export function MarketDifferenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Animate flowing pulses along SVG pathways
      gsap.to('.signal-pulse-dot', {
        strokeDashoffset: -100,
        duration: 3,
        repeat: -1,
        ease: 'none',
      });

      // Animate connected core pulse
      gsap.to('.connected-core-pulse', {
        scale: 1.08,
        opacity: 0.9,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative py-28 bg-ivory border-b border-border-subtle overflow-hidden">
      {/* Background Lighting Gradients */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-[500px] h-[500px] bg-coral/5 blur-[150px] rounded-full -translate-y-1/2" />
      <div className="pointer-events-none absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold/10 blur-[150px] rounded-full -translate-y-1/2" />

      <Container variant="wide" className="relative z-10 space-y-16">
        {/* Section Editorial Header */}
        <RevealOnScroll variant="fade-up" className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-txt-secondary">
              SYSTEMIC DIFFERENTIATION
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-normal text-4xl sm:text-6xl lg:text-7xl text-plum tracking-tight leading-[1.08]">
              Most agencies optimize channels. <br />
              <span className="text-coral italic font-normal">We optimize the system.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-txt-secondary leading-relaxed font-normal">
            Traditional agencies treat paid ads, SEO, and web design as isolated silos. We unify data, creative execution, and conversion engineering into a compounding growth ecosystem.
          </p>
        </RevealOnScroll>

        {/* Visual Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: Fragmented Agency Model */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-white border border-border-subtle shadow-editorial-sm hover:border-border-active transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <div>
                  <span className="font-mono text-xs text-txt-muted uppercase tracking-widest block font-medium">
                    THE TRADITIONAL APPROACH
                  </span>
                  <h3 className="font-display font-normal text-2xl text-plum mt-1">
                    Fragmented Channel Silos
                  </h3>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-semantic-error/10 text-semantic-error border border-semantic-error/20 rounded">
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
                    className="p-3.5 rounded-xl bg-cream/40 border border-border-subtle opacity-80 hover:opacity-100 transition-opacity flex flex-col space-y-1.5"
                  >
                    <silo.icon className="h-4 w-4 text-plum/60" />
                    <span className="font-mono text-xs font-semibold text-plum">{silo.name}</span>
                    <span className="text-[10px] text-txt-muted font-sans">{silo.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border-subtle text-xs text-txt-muted font-mono flex items-center justify-between">
              <span>OUTCOME: DISCONNECTED REPORTING & WASTED BUDGET</span>
            </div>
          </div>

          {/* RIGHT: Connected Growth System */}
          <div className="relative flex flex-col justify-between p-8 rounded-2xl bg-white border border-border-active shadow-editorial">
            {/* Coral Highlight Line */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-coral to-transparent" />

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <div>
                  <span className="font-mono text-xs text-coral uppercase tracking-widest block font-medium">
                    CREATIVE WORLD GROWTH SYSTEM
                  </span>
                  <h3 className="font-display font-normal text-2xl text-plum mt-1">
                    Connected Growth Ecosystem
                  </h3>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-coral/10 text-coral border border-coral/30 rounded font-medium">
                  COMPOUNDING SCALE
                </span>
              </div>

              {/* Connected Core Diagram */}
              <div className="relative p-6 rounded-xl bg-cream/40 border border-border-subtle overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-center relative z-10">
                  <div className="p-3 rounded-lg bg-white border border-border-subtle text-left space-y-1 shadow-editorial-sm">
                    <Sparkles className="h-4 w-4 text-coral" />
                    <span className="font-mono text-xs font-bold text-plum block">Data Signals</span>
                    <span className="text-[10px] text-txt-muted block">Real-time attribution</span>
                  </div>

                  <div className="connected-core-pulse p-4 rounded-xl bg-coral/15 border border-coral text-center space-y-1 my-2 sm:my-0 shadow-editorial-sm">
                    <ShieldCheck className="h-6 w-6 text-coral mx-auto" />
                    <span className="font-mono text-xs font-bold text-coral uppercase tracking-wider block">
                      Growth Engine
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-border-subtle text-left space-y-1 shadow-editorial-sm">
                    <Zap className="h-4 w-4 text-gold" />
                    <span className="font-mono text-xs font-bold text-plum block">Execution</span>
                    <span className="text-[10px] text-txt-muted block">Continuous optimization</span>
                  </div>
                </div>

                {/* Connecting SVG Flow Signal */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                  <line
                    x1="15%"
                    y1="50%"
                    x2="85%"
                    y2="50%"
                    stroke="#F26A4F"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="signal-pulse-dot"
                  />
                </svg>
              </div>

              <ul className="space-y-2 text-xs text-txt-secondary font-normal">
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  <span>Shared data layer between paid media, search intelligence, and CRO.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  <span>Dynamic creative testing loops mapped to real customer acquisition costs.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-border-subtle text-xs text-coral font-mono flex items-center justify-between font-medium">
              <span>OUTCOME: PREDICTABLE REVENUE & COMPOUNDING ROI</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
