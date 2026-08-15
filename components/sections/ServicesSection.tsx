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
    <section id="services" className="relative py-28 bg-ivory border-b border-border-subtle overflow-hidden">
      {/* Background Lighting Accents */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-[600px] h-[600px] bg-coral/5 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 left-10 w-[400px] h-[400px] bg-gold/10 blur-[150px] rounded-full" />

      <Container variant="wide" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-txt-secondary">
              CONNECTED GROWTH SYSTEM
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-normal text-4xl sm:text-6xl lg:text-7xl text-plum tracking-tight leading-[1.08]">
              Every Growth Lever. <br />
              <span className="text-coral italic font-normal">One Connected System.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-txt-secondary leading-relaxed font-normal">
            We do not sell isolated marketing deliverables. We deploy five synchronized growth disciplines that feed data into one high-performance revenue engine.
          </p>
        </div>

        {/* DESKTOP INTERACTIVE SERVICE SYSTEM (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered Service Selector List (4 cols) */}
          <div className="col-span-4 flex flex-col space-y-3">
            {servicesData.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-5 rounded-xl transition-all duration-300 border ${
                    isActive
                      ? 'bg-white border-plum shadow-editorial'
                      : 'bg-cream/30 border-border-subtle hover:border-border-active hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? 'text-coral' : 'text-txt-muted'
                      }`}
                    >
                      {service.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-txt-muted">
                      {service.kicker}
                    </span>
                  </div>

                  <h3
                    className={`font-display font-normal text-xl mt-2 transition-colors ${
                      isActive ? 'text-plum font-semibold' : 'text-txt-secondary'
                    }`}
                  >
                    {service.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Center Column: Interactive Visual Node Diagram (4 cols) */}
          <div className="col-span-4 sticky top-28 h-[520px]">
            <ServiceVisualSystem activeService={activeService} />
          </div>

          {/* Right Column: Active Service Details & Outcome (4 cols) */}
          <div className="col-span-4 flex flex-col justify-between p-8 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-8 min-h-[520px]">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs text-coral uppercase tracking-widest block font-medium">
                  CAPABILITY MATRIX — {activeService.number}
                </span>
                <h3 className="font-display font-normal text-3xl text-plum mt-1">
                  {activeService.title}
                </h3>
              </div>

              <p className="text-sm text-txt-secondary leading-relaxed font-normal">
                {activeService.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-txt-muted block font-medium">
                  CORE DELIVERABLES & SYSTEM ACTIONS:
                </span>
                <ul className="space-y-2.5">
                  {activeService.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2.5 text-xs text-plum">
                      <CheckCircle2 className="h-4 w-4 text-coral shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Outcome Statement & CTA */}
            <div className="space-y-6 pt-6 border-t border-border-subtle">
              <div className="p-4 rounded-xl bg-cream/40 border border-border-subtle space-y-1">
                <span className="font-mono text-[10px] text-coral uppercase tracking-widest block font-medium">
                  TARGET BUSINESS OUTCOME:
                </span>
                <p className="text-xs text-plum font-medium">
                  {activeService.outcomeStatement}
                </p>
              </div>

              <Link href="#audit-form" className="block w-full">
                <Button variant="primary" size="md" className="w-full" icon={<ArrowRight className="h-4 w-4" />}>
                  {activeService.ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE STACKED EDITORIAL FLOW (Visible on Mobile/Tablet) */}
        <div className="grid grid-cols-1 gap-8 lg:hidden">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <span className="font-mono text-xs font-bold text-coral">
                  SERVICE {service.number}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-txt-muted">
                  {service.kicker}
                </span>
              </div>

              <div>
                <h3 className="font-display font-normal text-3xl text-plum">
                  {service.title}
                </h3>
                <p className="text-sm text-txt-secondary leading-relaxed mt-2">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] text-txt-muted uppercase tracking-wider block font-medium">
                  CAPABILITIES:
                </span>
                <ul className="space-y-2">
                  {service.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2 text-xs text-plum">
                      <CheckCircle2 className="h-3.5 w-3.5 text-coral shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-cream/40 border border-border-subtle text-xs text-txt-secondary">
                <span className="font-mono text-[10px] text-coral block font-semibold">OUTCOME:</span>
                {service.outcomeStatement}
              </div>

              <Link href="#audit-form" className="block w-full">
                <Button variant="outline" size="sm" className="w-full">
                  {service.ctaLabel}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
