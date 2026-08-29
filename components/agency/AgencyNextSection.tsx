'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export function AgencyNextSection() {
  return (
    <section className="relative py-28 bg-[#07090E] text-[#F5F7FA] font-sans border-t border-white/10 overflow-hidden">
      {/* Ambient Radial Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#1769FF]/10 via-[#00CFFF]/5 to-transparent blur-3xl rounded-full" />

      <Container variant="wide" className="space-y-16 relative z-10">
        {/* Editorial Eyebrow Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#11151C] border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00CFFF] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
              OUR PHILOSOPHY
            </span>
          </div>

          <h2 className="font-sans font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tighter uppercase leading-[0.95] text-white">
            We Don&apos;t Chase Attention. <br />
            <span className="text-[#00CFFF] underline decoration-[#00CFFF]/40 underline-offset-8">
              We Command It.
            </span>
          </h2>
        </div>

        {/* 3 Dark Glass Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          <div className="space-y-4 p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 transition-all group shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00CFFF] block">01 / BRAND CAPITAL</span>
              <ShieldCheck className="w-5 h-5 text-slate-500 group-hover:text-[#00CFFF] transition-colors" />
            </div>
            <h3 className="font-bold text-xl uppercase tracking-tight text-white group-hover:text-[#00CFFF] transition-colors">
              Identity Engineering
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              We craft visual systems and messaging hierarchies that differentiate your brand from category noise instantly.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 transition-all group shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00CFFF] block">02 / ACQUISITION ENGINE</span>
              <BarChart3 className="w-5 h-5 text-slate-500 group-hover:text-[#00CFFF] transition-colors" />
            </div>
            <h3 className="font-bold text-xl uppercase tracking-tight text-white group-hover:text-[#00CFFF] transition-colors">
              Paid & Organic Scale
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Unified performance marketing, search intelligence, and conversion funnels designed for measurable revenue growth.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 transition-all group shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00CFFF] block">03 / CONVERSION INFRASTRUCTURE</span>
              <Zap className="w-5 h-5 text-slate-500 group-hover:text-[#00CFFF] transition-colors" />
            </div>
            <h3 className="font-bold text-xl uppercase tracking-tight text-white group-hover:text-[#00CFFF] transition-colors">
              Custom Digital Architecture
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              High-speed, cinematic web engineering and interactive experiences built to convert high-intent traffic.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
