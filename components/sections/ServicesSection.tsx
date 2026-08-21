'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { RevealText } from '@/components/motion/RevealText';
import { ServiceVisualSystem } from '@/components/ui/ServiceVisualSystem';
import { servicesData } from '@/data/services';

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeService = servicesData[activeIndex] || servicesData[0];

  return (
    <section id="services" className="relative py-28 bg-[#101218] text-white border-b border-white/10 overflow-hidden">
      {/* Precision Grid Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <Container variant="wide" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-sm bg-white/10 border border-white/15 text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8FF2C]">
              [ CAPABILITIES & DISCIPLINES ]
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tighter uppercase leading-[1.05]">
              DISCIPLINES BUILT FOR <span className="text-[#B8FF2C]">COMMERCIAL IMPACT.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-[#C5CBD3] leading-relaxed font-normal max-w-2xl">
            We do not sell isolated deliverables. We engineer synchronized growth disciplines that feed data into one high-performance revenue engine.
          </p>
        </div>

        {/* DESKTOP INTERACTIVE SERVICE SYSTEM */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-start">
          {/* Left Column: Numbered Service Selector List (5 cols) */}
          <div className="col-span-5 flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
            {servicesData.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full text-left py-6 px-4 transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                    isActive
                      ? 'bg-[#151821] text-white border-l-4 border-l-[#B8FF2C] pl-6'
                      : 'hover:bg-white/5 text-white/70'
                  }`}
                >
                  <div className="flex items-baseline space-x-4">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? 'text-[#B8FF2C]' : 'text-[#9299A8]'
                      }`}
                    >
                      {service.number}
                    </span>
                    <h3
                      className={`font-display font-bold text-2xl uppercase tracking-tight ${
                        isActive ? 'text-white' : 'text-white/80 group-hover:text-[#B8FF2C]'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <span
                    className={`font-mono text-xs ${
                      isActive ? 'text-[#B8FF2C]' : 'text-[#9299A8] group-hover:translate-x-1 transition-transform'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Service Details & Outcome (7 cols) */}
          <div className="col-span-7 flex flex-col justify-between p-10 rounded-xl bg-[#151821] border border-white/10 shadow-2xl min-h-[540px]">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-[#4D5CFF] uppercase tracking-widest font-bold">
                  DISCIPLINE {activeService.number} — {activeService.kicker}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#B8FF2C]" />
              </div>

              <h3 className="font-display font-bold text-4xl text-white uppercase tracking-tight">
                {activeService.title}
              </h3>

              <p className="text-base text-[#C5CBD3] leading-relaxed font-normal">
                {activeService.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-4 pt-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#9299A8] block font-bold">
                  DELIVERABLES & EXECUTION ARCHITECTURE:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {activeService.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start space-x-2.5 text-xs text-white font-medium bg-[#08090C] p-3 rounded-md border border-white/10">
                      <CheckCircle2 className="h-4 w-4 text-[#B8FF2C] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Outcome Statement & CTA */}
            <div className="space-y-6 pt-8 border-t border-white/10">
              <div className="p-4 rounded-lg bg-[#08090C] border border-white/10 text-white space-y-1">
                <span className="font-mono text-[10px] text-[#B8FF2C] uppercase tracking-widest block font-bold">
                  TARGET COMMERCIAL OUTCOME:
                </span>
                <p className="text-sm font-semibold text-white/90">
                  {activeService.outcomeStatement}
                </p>
              </div>

              <Link href="/growth-audit" className="block w-full">
                <Button variant="primary" size="lg" className="w-full bg-[#B8FF2C] text-[#08090C] font-bold hover:bg-[#a6f514]" icon={<ArrowRight className="h-4 w-4" />}>
                  {activeService.ctaLabel} →
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE STACKED EDITORIAL FLOW */}
        <div className="grid grid-cols-1 gap-6 lg:hidden">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-xl bg-[#151821] border border-white/10 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold text-[#B8FF2C]">
                  DISCIPLINE {service.number}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9299A8]">
                  {service.kicker}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl text-white uppercase">
                  {service.title}
                </h3>
                <p className="text-sm text-[#C5CBD3] leading-relaxed mt-2">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] text-[#9299A8] uppercase tracking-wider block font-bold">
                  DELIVERABLES:
                </span>
                <div className="space-y-2">
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start space-x-2 text-xs text-white">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#B8FF2C] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#08090C] text-white text-xs border border-white/10">
                <span className="font-mono text-[10px] text-[#B8FF2C] block font-bold">TARGET OUTCOME:</span>
                {service.outcomeStatement}
              </div>

              <Link href="/growth-audit" className="block w-full">
                <Button variant="outline" size="sm" className="w-full text-white border-white/20 hover:border-[#B8FF2C]">
                  {service.ctaLabel} →
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
