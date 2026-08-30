'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { servicesData } from '@/data/services';

export function ServicesSection() {
  const uniqueServices = Array.from(new Map(servicesData.map(s => [s.id, s])).values());
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeService = uniqueServices[activeIndex] || uniqueServices[0];

  return (
    <MonochromeSection id="services" divider="thick" texture="grid">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white">
            <span className="w-2 h-2 bg-black inline-block" aria-hidden="true" />
            <span>GROWTH SERVICES & CAPABILITIES</span>
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-6xl text-black tracking-tight uppercase leading-none">
            DISCIPLINES BUILT FOR<br />
            COMMERCIAL IMPACT<span className="text-neutral-400">.</span>
          </h2>

          <p className="font-serifBody text-lg sm:text-xl text-neutral-800 leading-relaxed max-w-2xl">
            We do not sell isolated deliverables. We engineer synchronized growth disciplines that feed data into one high-performance revenue engine.
          </p>
        </div>

        {/* DESKTOP INTERACTIVE SERVICE SYSTEM */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
          {/* Left Column: Numbered Service Selector List (5 cols) */}
          <div className="col-span-5 flex flex-col border-2 border-black divide-y-2 divide-black bg-white">
            {uniqueServices.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full text-left py-6 px-6 transition-colors duration-100 flex items-center justify-between cursor-pointer group ${
                    isActive
                      ? 'bg-black text-white'
                      : 'hover:bg-neutral-100 text-black'
                  }`}
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="font-mono text-xs font-bold">
                      {service.number}
                    </span>
                    <h3 className="font-serif font-bold text-2xl uppercase tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                  <span className="font-mono text-sm font-bold">→</span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Service Details & Outcome (7 cols) */}
          <div className="col-span-7 flex flex-col justify-between p-8 border-4 border-black bg-white space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-black pb-4">
                <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest font-bold">
                  DISCIPLINE {activeService.number} — {activeService.kicker}
                </span>
                <span className="w-3 h-3 bg-black inline-block" />
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 space-y-4">
                  <h3 className="font-serif font-bold text-4xl text-black uppercase tracking-tight">
                    {activeService.title}
                  </h3>

                  <p className="font-serifBody text-base text-neutral-800 leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {/* Bespoke Discipline Visual */}
                <div className="w-full md:w-48 h-48 relative border-2 border-black bg-black shrink-0 overflow-hidden">
                  <Image
                    src={activeService.image || '/images/services/web-engineering.png'}
                    alt={`${activeService.title} technical discipline architecture visualization`}
                    fill
                    sizes="200px"
                    className="object-cover object-center grayscale contrast-125"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-1 border border-white/20 font-mono text-[9px] uppercase tracking-widest text-white">
                    SYS_VISUAL // {activeService.number}
                  </div>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-4 pt-2">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block font-bold">
                  DELIVERABLES & EXECUTION ARCHITECTURE:
                </span>
                <ul className="space-y-2.5">
                  {activeService.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-3 text-xs font-serifBody text-black p-4 border-2 border-black bg-neutral-50">
                      <Check size={16} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Outcome Statement & CTA */}
            <div className="space-y-6 pt-6 border-t-2 border-black">
              <div className="p-4 border-2 border-black bg-black text-white space-y-1">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block font-bold">
                  TARGET COMMERCIAL OUTCOME:
                </span>
                <p className="font-serifBody text-sm font-semibold text-white">
                  {activeService.outcomeStatement}
                </p>
              </div>

              <Link href="/growth-audit" className="block w-full">
                <MonochromeButton variant="primary" showArrow className="w-full justify-center">
                  {activeService.ctaLabel}
                </MonochromeButton>
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE STACKED EDITORIAL FLOW (Visible on Mobile/Tablet) */}
        <div className="grid grid-cols-1 gap-8 lg:hidden">
          {uniqueServices.map((service) => (
            <div
              key={service.id}
              className="p-6 border-2 border-black bg-white space-y-6"
            >
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-mono text-xs font-bold text-black">
                  DISCIPLINE {service.number}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                  {service.kicker}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-2xl text-black uppercase">
                  {service.title}
                </h3>
                <p className="font-serifBody text-sm text-neutral-800 leading-relaxed mt-2">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">
                  DELIVERABLES:
                </span>
                <ul className="space-y-2">
                  {service.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2 text-xs font-serifBody text-black">
                      <Check size={14} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-2 border-black bg-black text-white text-xs space-y-1">
                <span className="font-mono text-[10px] text-neutral-400 block font-bold">TARGET OUTCOME:</span>
                <p className="font-serifBody">{service.outcomeStatement}</p>
              </div>

              <Link href="/growth-audit" className="block w-full">
                <MonochromeButton variant="secondary" showArrow className="w-full justify-center">
                  {service.ctaLabel}
                </MonochromeButton>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MonochromeSection>
  );
}

