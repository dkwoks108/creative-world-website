'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { RevealText } from '@/components/motion/RevealText';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { MouseParallax } from '@/components/motion/MouseParallax';
import { TechScrambler } from '@/components/motion/TechScrambler';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ServiceVisualSystem } from '@/components/ui/ServiceVisualSystem';
import { servicesData } from '@/data/services';

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeService = servicesData[activeIndex] || servicesData[0];

  return (
    <section id="services" className="relative py-28 bg-ivory border-b border-border-subtle overflow-hidden">
      {/* Background Lighting Accents with Parallax Depth */}
      <MouseParallax strength={12} invert className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-coral/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-gold/10 blur-[150px] rounded-full" />
      </MouseParallax>

      <Container variant="wide" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            <TechScrambler
              text="CONNECTED GROWTH SYSTEM"
              className="font-mono text-xs uppercase tracking-widest text-txt-secondary"
            />
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
                      ? 'bg-white border-plum shadow-editorial scale-[1.02]'
                      : 'bg-cream/30 border-border-subtle hover:border-border-active hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <TechScrambler
                      text={service.number}
                      className={`font-mono text-xs font-bold ${
                        isActive ? 'text-coral' : 'text-txt-muted'
                      }`}
                    />
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

          {/* Center Column: Interactive Visual Node Diagram & Telemetry Visual Embed (4 cols) */}
          <div className="col-span-4 sticky top-28 space-y-6">
            <ServiceVisualSystem activeService={activeService} />
            
            {/* Generated 3D Performance Telemetry Visual Embed */}
            <ImageReveal duration={1.1} className="rounded-xl overflow-hidden shadow-editorial border border-border-subtle">
              <div className="relative w-full h-[180px]">
                <Image
                  src="/images/visuals/performance_telemetry_visual.png"
                  alt="3D performance telemetry visual showcase"
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-end p-3">
                  <span className="font-mono text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded border border-white/20">
                    [ LIVE TELEMETRY STREAM ]
                  </span>
                </div>
              </div>
            </ImageReveal>
          </div>

          {/* Right Column: Active Service Details & Outcome (4 cols) */}
          <div className="col-span-4 flex flex-col justify-between p-8 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-8 min-h-[520px]">
            <div className="space-y-6">
              <div>
                <TechScrambler
                  text={`CAPABILITY MATRIX — ${activeService.number}`}
                  className="font-mono text-xs text-coral uppercase tracking-widest block font-medium"
                />
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
                <MagneticButton strength={5} className="w-full">
                  <Button variant="primary" size="md" className="w-full shadow-editorial" icon={<ArrowRight className="h-4 w-4" />}>
                    {activeService.ctaLabel}
                  </Button>
                </MagneticButton>
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
                <TechScrambler text={`SERVICE ${service.number}`} className="font-mono text-xs font-bold text-coral" />
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

        {/* Section Layer Tag */}
        <div className="pt-4 border-t border-border-subtle text-xs font-mono text-txt-muted flex justify-between items-center">
          <TechScrambler text="[ SYSTEM LAYER: 04 / GROWTH DISCIPLINES ]" />
          <span>CAPABILITY MATRIX</span>
        </div>
      </Container>
    </section>
  );
}
