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
    <section id="methodology" className="relative py-28 bg-[#151821] text-white border-b border-white/10 overflow-hidden">
      {/* Precision Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem]" />

      <Container variant="wide" className="relative z-10 space-y-16">
        {/* Section Header */}
        <RevealOnScroll variant="fade-up" className="max-w-4xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-sm bg-white/10 border border-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8FF2C]">
              [ EXECUTION METHODOLOGY ]
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tighter uppercase leading-[1.05]">
              GROWTH IS A SYSTEM, <span className="text-[#B8FF2C]">NOT A CAMPAIGN.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-[#C5CBD3] leading-relaxed font-normal max-w-2xl">
            We execute a disciplined, four-stage protocol engineered to identify acquisition bottlenecks, build custom web infrastructure, and scale commercial velocity.
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
        <div className="grid grid-cols-1 gap-6 lg:hidden">
          {processData.map((step) => (
            <div
              key={step.id}
              className="p-6 rounded-xl bg-[#08090C] border border-white/10 space-y-5 text-white"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold text-[#B8FF2C]">
                  STAGE {step.number}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                  {step.kicker}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl uppercase">
                  {step.title}
                </h3>
                <p className="text-sm text-[#C5CBD3] leading-relaxed mt-2">
                  {step.description}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] text-[#B8FF2C] uppercase tracking-wider block font-bold">
                  SYSTEM ACTIONS:
                </span>
                <div className="space-y-2">
                  {step.activities.map((act, aIdx) => (
                    <div key={aIdx} className="flex items-start space-x-2 text-xs text-white/90">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#4D5CFF] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#151821] border border-white/10 text-xs text-white/80">
                <span className="font-mono text-[10px] text-[#B8FF2C] block font-bold">COMMERCIAL DELIVERABLE:</span>
                {step.outcome}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
