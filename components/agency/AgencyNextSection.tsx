'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AgencyNextSection() {
  return (
    <section className="relative py-28 bg-[#F4F5F0] text-[#050608] font-sans border-t border-black/10 overflow-hidden">
      <Container variant="wide" className="space-y-16 relative z-10">
        {/* Editorial Eyebrow Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/5 border border-black/10">
            <span className="h-1.5 w-1.5 rounded-full bg-[#050608]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#050608]/70 font-semibold">
              OUR PHILOSOPHY
            </span>
          </div>

          <h2 className="font-sans font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tighter uppercase leading-[0.95] text-[#050608]">
            We Don&apos;t Chase Attention. <br />
            <span className="underline decoration-[#B8FF2C] decoration-4 underline-offset-8">
              We Command It.
            </span>
          </h2>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-black/10">
          <div className="space-y-4 p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
            <span className="font-mono text-xs font-bold text-[#050608]/40 block">01 / BRAND CAPITAL</span>
            <h3 className="font-bold text-xl uppercase tracking-tight">Identity Engineering</h3>
            <p className="text-sm text-[#050608]/70 leading-relaxed font-normal">
              We craft visual systems and messaging hierarchies that differentiate your brand from category noise instantly.
            </p>
          </div>

          <div className="space-y-4 p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
            <span className="font-mono text-xs font-bold text-[#050608]/40 block">02 / ACQUISITION ENGINE</span>
            <h3 className="font-bold text-xl uppercase tracking-tight">Paid & Organic Scale</h3>
            <p className="text-sm text-[#050608]/70 leading-relaxed font-normal">
              Unified performance marketing, search intelligence, and conversion funnels designed for measurable revenue growth.
            </p>
          </div>

          <div className="space-y-4 p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
            <span className="font-mono text-xs font-bold text-[#050608]/40 block">03 / CONVERSION INFRASTRUCTURE</span>
            <h3 className="font-bold text-xl uppercase tracking-tight">Custom Digital Architecture</h3>
            <p className="text-sm text-[#050608]/70 leading-relaxed font-normal">
              High-speed, cinematic web engineering and interactive experiences built to convert high-intent traffic.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
