'use client';

import React from 'react';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';

export function TrustSection() {
  const stats = [
    { value: '₹1.4Cr+', label: 'REVENUE INFLUENCED', detail: 'Across direct-to-consumer & high-ticket B2B client portfolios' },
    { value: '200M+', label: 'AUDIENCE REACHED', detail: 'Targeted organic & performance media brand engagements' },
    { value: '4.8×', label: 'AVERAGE ROAS', detail: 'Cross-platform paid media & search engine acquisition efficiency' },
    { value: '22', label: 'BRANDS SCALED', detail: 'Category leaders engineered in Jaipur & pan-India markets' },
  ];

  return (
    <MonochromeSection inverted divider="thick" texture="stats">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white font-mono text-xs uppercase tracking-widest text-white font-bold">
            <span className="w-2 h-2 bg-white inline-block" aria-hidden="true" />
            <span>01 / PROOF OF EFFICIENCY</span>
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-6xl text-white tracking-tight uppercase leading-none">
            WE BUILD DEMAND,<br />
            NOT JUST TRAFFIC<span className="text-neutral-500">.</span>
          </h2>

          <p className="font-serifBody text-lg sm:text-xl text-neutral-300 leading-relaxed font-normal max-w-2xl">
            Strategy is only valuable when it produces measurable commercial velocity. We replace fragmented agency tactics with integrated growth infrastructure.
          </p>
        </div>

        {/* Oversized Unboxed Statistics Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t-2 border-neutral-800">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-6 border-2 border-neutral-800 bg-black space-y-3 hover:border-white transition-colors duration-100">
              <div className="font-serif font-bold text-5xl sm:text-6xl text-white tracking-tight leading-none">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                {stat.label}
              </div>
              <p className="font-serifBody text-xs text-neutral-400 font-normal leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MonochromeSection>
  );
}

