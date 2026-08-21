'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { MouseParallax } from '@/components/motion/MouseParallax';
import { TechScrambler } from '@/components/motion/TechScrambler';
import { GrowthAuditForm } from '@/components/ui/GrowthAuditForm';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export function ConversionSection() {
  return (
    <section id="contact" className="relative py-28 bg-ivory border-b border-border-subtle overflow-hidden">
      {/* Background Lighting Accents with Parallax */}
      <MouseParallax strength={14} invert className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-coral/5 blur-[170px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gold/10 blur-[160px] rounded-full" />
      </MouseParallax>

      <Container variant="wide" className="relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Narrative (5 cols on desktop) */}
          <RevealOnScroll variant="fade-up" className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
                <TechScrambler
                  text="START A GROWTH AUDIT"
                  className="font-mono text-xs uppercase tracking-widest text-txt-secondary"
                />
              </div>

              <RevealText>
                <h2 className="font-display font-normal text-4xl sm:text-6xl text-plum tracking-tight leading-[1.08]">
                  Let&apos;s Find Your <br />
                  <span className="text-coral italic font-normal">Highest-Leverage</span> <br />
                  Growth Opportunity.
                </h2>
              </RevealText>

              <p className="text-base text-txt-secondary leading-relaxed font-normal">
                Tell us where growth is getting stuck. We&apos;ll audit your acquisition channels, conversion funnel, and search architecture to uncover high-impact opportunities.
              </p>
            </div>

            {/* Value Reassurance Items */}
            <div className="space-y-4 pt-2 border-t border-border-subtle">
              <div className="flex items-start space-x-3 text-xs text-txt-secondary">
                <CheckCircle2 className="h-4 w-4 text-coral shrink-0 mt-0.5" />
                <div>
                  <strong className="text-plum block font-semibold">Forensic Channel Audit:</strong>
                  <span>Pinpoint wasted spend across Meta, Google, and organic search.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs text-txt-secondary">
                <CheckCircle2 className="h-4 w-4 text-coral shrink-0 mt-0.5" />
                <div>
                  <strong className="text-plum block font-semibold">Attribution & CRM Health:</strong>
                  <span>Diagnose server-side tracking and pipeline conversion bottlenecks.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs text-txt-secondary">
                <ShieldCheck className="h-4 w-4 text-semantic-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-plum block font-semibold">Zero Sales Pressure:</strong>
                  <span>Direct technical review by senior growth architects.</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Embedded Conversion Form (7 cols on desktop) */}
          <RevealOnScroll variant="scale-in" delay={0.15} className="lg:col-span-7">
            <MouseParallax strength={4}>
              <GrowthAuditForm />
            </MouseParallax>
          </RevealOnScroll>
        </div>

        {/* Section Layer Tag */}
        <div className="pt-4 border-t border-border-subtle text-xs font-mono text-txt-muted flex justify-between items-center">
          <TechScrambler text="[ SYSTEM LAYER: 08 / CONVERSION AUDIT ]" />
          <span>INQUIRY PROTOCOL</span>
        </div>
      </Container>
    </section>
  );
}
