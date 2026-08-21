import React from 'react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { GrowthAuditForm } from '@/components/ui/GrowthAuditForm';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export function ConversionSection() {
  return (
    <section id="contact" className="relative py-28 bg-[#08090C] text-white border-b border-white/10 overflow-hidden">
      {/* Precision Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <Container variant="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Narrative (5 cols on desktop) */}
          <RevealOnScroll variant="fade-up" className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-sm bg-white/10 border border-white/15 text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8FF2C]">
                  [ REQUEST STRATEGIC AUDIT ]
                </span>
              </div>

              <RevealText>
                <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tighter uppercase leading-[1.02]">
                  READY TO ESCAPE <br />
                  <span className="text-[#B8FF2C]">AGENCY MEDIOCRITY?</span>
                </h2>
              </RevealText>

              <p className="text-base text-[#C5CBD3] leading-relaxed font-normal">
                Tell us where your revenue growth is stalling. Our engineering & performance leads will audit your position, web architecture, and acquisition funnel within 24 hours.
              </p>
            </div>

            {/* Value Reassurance Items */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start space-x-3 text-xs text-[#C5CBD3]">
                <CheckCircle2 className="h-4 w-4 text-[#B8FF2C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Forensic Channel Audit:</strong>
                  <span>Pinpoint wasted spend across Meta, Google, and organic search.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs text-[#C5CBD3]">
                <CheckCircle2 className="h-4 w-4 text-[#B8FF2C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Attribution & Technical Health:</strong>
                  <span>Diagnose server-side tracking and funnel conversion drop-offs.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs text-[#C5CBD3]">
                <ShieldCheck className="h-4 w-4 text-[#31E7FF] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">No Spam & Zero High-Pressure Sales:</strong>
                  <span>Direct technical review by senior growth architects within 24 hours.</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Embedded Conversion Form (7 cols on desktop) */}
          <RevealOnScroll variant="scale-in" delay={0.15} className="lg:col-span-7">
            <GrowthAuditForm />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
