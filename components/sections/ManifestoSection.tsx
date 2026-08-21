'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';

export function ManifestoSection() {
  return (
    <section className="relative py-32 bg-[#F4F5F0] text-[#08090C] border-b border-black/10 overflow-hidden">
      {/* Precision Structural Lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#08090c0a_1px,transparent_1px),linear-gradient(to_bottom,#08090c0a_1px,transparent_1px)] bg-[size:8rem_8rem]" />

      <Container variant="wide" className="relative z-10">
        <div className="max-w-5xl mx-auto text-left space-y-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-sm bg-[#08090C] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8FF2C]">
              [ AGENCY MANIFESTO — INVERTED BREAK ]
            </span>
          </div>

          {/* Huge Typographic Manifesto Statement */}
          <div className="space-y-4 font-display font-bold tracking-tighter uppercase text-5xl sm:text-7xl xl:text-8xl leading-[0.92]">
            <RevealText>
              <div className="text-[#08090C]/40">WE DON&apos;T CHASE</div>
            </RevealText>
            <RevealText delay={0.1}>
              <div className="text-[#08090C]">ATTENTION.</div>
            </RevealText>
            <RevealText delay={0.2}>
              <div className="text-[#4D5CFF]">WE CREATE</div>
            </RevealText>
            <RevealText delay={0.3}>
              <div className="inline-block bg-[#08090C] text-[#B8FF2C] px-6 py-2 rounded-lg font-display uppercase tracking-tighter shadow-xl">
                DEMAND.
              </div>
            </RevealText>
          </div>

          {/* Strategic Paragraph */}
          <div className="pt-8 border-t border-black/15 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 font-mono text-xs text-[#08090C]/60 uppercase tracking-widest font-bold">
              SURNAX OPERATING PRINCIPLE 01
            </div>
            <div className="md:col-span-8 text-base sm:text-lg text-[#08090C]/80 font-medium leading-relaxed">
              In an era saturated with generic noise and ephemeral social metrics, true enterprise value is built by engineering proprietary positioning, high-converting digital infrastructure, and relentless performance strategy.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
