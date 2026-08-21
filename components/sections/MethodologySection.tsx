'use client';

import React, { useState } from 'react';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { processData } from '@/data/process';
import { Check } from 'lucide-react';
import { CinematicVideoPlayer } from '@/components/monochrome/CinematicVideoPlayer';
import { AnimatedMetricCounter } from '@/components/monochrome/EditorialScrollReveal';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MaskReveal } from '@/components/motion/MaskReveal';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';

export function MethodologySection() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const VIDEO_3_URL =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4';

  return (
    <MonochromeSection id="methodology" divider="thick" texture="lines">
      <div className="space-y-16">
        {/* Section Header & Video Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal direction="bottom" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white">
                <span className="w-2 h-2 bg-black inline-block" aria-hidden="true" />
                <span>05 / EXECUTION METHODOLOGY</span>
              </div>
            </ScrollReveal>

            <SplitTextReveal
              as="h2"
              text="GROWTH IS A SYSTEM, NOT A CAMPAIGN."
              className="font-serif font-bold text-4xl sm:text-6xl text-black tracking-tight uppercase leading-none"
            />

            <ScrollReveal direction="bottom" delay={0.25}>
              <p className="font-serifBody text-lg sm:text-xl text-neutral-800 leading-relaxed max-w-2xl">
                We execute a disciplined, four-stage protocol engineered to identify acquisition bottlenecks, build custom web infrastructure, and scale commercial velocity.
              </p>
            </ScrollReveal>

            {/* Quick Metrics Ribbon */}
            <ScrollReveal direction="bottom" delay={0.35}>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t-2 border-black font-mono text-xs text-black">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">PIPELINE SLA</span>
                  <span className="font-serif font-bold text-2xl text-black block">
                    <AnimatedMetricCounter value="100%" />
                  </span>
                </div>
                <div className="space-y-1 border-l-2 border-black pl-4">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">AUDIT RIGOR</span>
                  <span className="font-serif font-bold text-2xl text-black block">
                    <AnimatedMetricCounter value="99.7%" />
                  </span>
                </div>
                <div className="space-y-1 border-l-2 border-black pl-4">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">SPEED CAP</span>
                  <span className="font-serif font-bold text-2xl text-black block">
                    <AnimatedMetricCounter value="2.4ms" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <MaskReveal delay={0.2} duration={0.9}>
              <div className="border-4 border-black bg-black relative">
                <CinematicVideoPlayer
                  src={VIDEO_3_URL}
                  overlayOpacity={0.3}
                  grayscale
                  contrast={1.2}
                  scanlines
                  className="h-[280px] sm:h-[340px] w-full"
                />
                <div className="absolute top-3 left-3 bg-white border-2 border-black px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-black">
                  EXECUTION PROTOCOL
                </div>
              </div>
            </MaskReveal>
          </div>
        </div>

        {/* Desktop Process System */}
        <div className="hidden lg:block">
          <ProcessTimeline
            steps={processData}
            activeStepIndex={activeStepIndex}
            onStepSelect={setActiveStepIndex}
          />
        </div>

        {/* Mobile Stacked Editorial Process Flow */}
        <div className="grid grid-cols-1 gap-6 lg:hidden font-serifBody">
          {processData.map((step, idx) => (
            <ScrollReveal key={step.id} direction="bottom" delay={idx * 0.1}>
              <div className="p-6 border-2 border-black bg-white space-y-5 text-black">
                <div className="flex items-center justify-between border-b-2 border-black pb-3">
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-widest">
                    STAGE {step.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                    {step.kicker}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-2xl uppercase">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-800 leading-relaxed mt-2 font-serifBody">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest block font-bold">
                    SYSTEM ACTIONS:
                  </span>
                  <div className="space-y-2">
                    {step.activities.map((act, aIdx) => (
                      <div key={aIdx} className="flex items-start space-x-2 text-xs text-black">
                        <Check size={14} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 border-2 border-black bg-black text-white text-xs space-y-1 font-mono">
                  <span className="text-[10px] text-neutral-400 block font-bold uppercase tracking-widest">COMMERCIAL DELIVERABLE:</span>
                  <p className="font-serifBody">{step.outcome}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </MonochromeSection>
  );
}



