'use client';

import React from 'react';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';

export function ManifestoSection() {
  return (
    <MonochromeSection divider="thick" texture="lines" className="!py-28">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white">
          <span className="w-2 h-2 bg-black inline-block" aria-hidden="true" />
          <span>AGENCY PURPOSE & OPERATING SYSTEM</span>
        </div>

        {/* Huge Typographic Manifesto Statement */}
        <div className="space-y-2 font-serif font-bold tracking-tight uppercase text-5xl sm:text-7xl xl:text-8xl leading-none text-black">
          <div className="text-neutral-400">WE DON&apos;T CHASE</div>
          <div>ATTENTION<span className="text-neutral-400">.</span></div>
          <div>WE CREATE</div>
          <div className="inline-block bg-black text-white px-6 py-2 border-2 border-black">
            DEMAND.
          </div>
        </div>

        {/* Strategic Paragraph & Pull Quote */}
        <div className="pt-8 border-t-4 border-black grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 font-mono text-xs text-neutral-600 uppercase tracking-widest font-bold">
            CREATIVEE OPERATING PRINCIPLE 01
          </div>
          <div className="md:col-span-8 font-serifBody text-lg sm:text-xl text-black leading-relaxed font-normal p-6 border-2 border-black bg-neutral-50">
            In an era saturated with generic noise and ephemeral social metrics, true enterprise value is built by engineering proprietary positioning, high-converting digital infrastructure, and relentless performance strategy.
          </div>
        </div>
      </div>
    </MonochromeSection>
  );
}

