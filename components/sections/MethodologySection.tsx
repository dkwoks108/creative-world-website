'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { processData } from '@/data/process';
import { CheckCircle2 } from 'lucide-react';

export function MethodologySection() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <section id="methodology" className="relative py-28 bg-ivory border-b border-border-subtle overflow-hidden">
      {/* Background Lighting Accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral/5 blur-[170px] rounded-full" />

      <Container variant="wide" className="relative z-10 space-y-16">
        {/* Section Header */}
        <RevealOnScroll variant="fade-up" className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-txt-secondary">
              FOUR-STAGE GROWTH SYSTEM
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-normal text-4xl sm:text-6xl lg:text-7xl text-plum tracking-tight leading-[1.08]">
              Growth Is a System, <br />
              <span className="text-coral italic font-normal">Not a Campaign.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-txt-secondary leading-relaxed font-normal">
            We execute a disciplined, four-stage protocol engineered to identify funnel bottlenecks, deploy multi-channel acquisition tactics, and scale revenue predictably.
          </p>
        </RevealOnScroll>

        {/* Desktop Process System */}
        <RevealOnScroll variant="scale-in" delay={0.1} className="hidden lg:block">
          <ProcessTimeline
            steps={processData}
            activeStepIndex={activeStepIndex}
            onStepSelect={setActiveStepIndex}
          />
        </RevealOnScroll>

        {/* Mobile Stacked Editorial Process Flow */}
        <div className="grid grid-cols-1 gap-8 lg:hidden">
          {processData.map((step) => (
            <div
              key={step.id}
              className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <span className="font-mono text-xs font-bold text-coral">
                  STAGE {step.number}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-txt-muted">
                  {step.kicker}
                </span>
              </div>

              <div>
                <h3 className="font-display font-normal text-3xl text-plum">
                  {step.title}
                </h3>
                <p className="text-sm text-txt-secondary leading-relaxed mt-2">
                  {step.description}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] text-txt-muted uppercase tracking-wider block font-medium">
                  SYSTEM ACTIONS:
                </span>
                <ul className="space-y-2">
                  {step.activities.map((act, aIdx) => (
                    <li key={aIdx} className="flex items-start space-x-2 text-xs text-plum">
                      <CheckCircle2 className="h-3.5 w-3.5 text-coral shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-cream/40 border border-border-subtle text-xs text-txt-secondary">
                <span className="font-mono text-[10px] text-coral block font-semibold">OUTCOME:</span>
                {step.outcome}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
