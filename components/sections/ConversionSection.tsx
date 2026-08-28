'use client';

import React from 'react';
import Image from 'next/image';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { GrowthAuditForm } from '@/components/ui/GrowthAuditForm';
import { Check, ShieldCheck } from 'lucide-react';

export function ConversionSection() {
  return (
    <MonochromeSection id="contact" divider="none" texture="grid">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-serifBody">
        {/* Left Editorial Narrative (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white">
              <span className="w-2 h-2 bg-black inline-block" aria-hidden="true" />
              <span>08 / REQUEST STRATEGIC AUDIT</span>
            </div>

            <h2 className="font-serif font-bold text-4xl sm:text-6xl text-black tracking-tight uppercase leading-none">
              READY TO ESCAPE<br />
              AGENCY MEDIOCRITY<span className="text-neutral-400">?</span>
            </h2>

            <p className="font-serifBody text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
              Tell us where your revenue growth is stalling. Our engineering & performance leads will audit your position, web architecture, and acquisition funnel within 24 hours.
            </p>
          </div>

          {/* Bespoke Telemetry Dashboard Visual */}
          <div className="border-2 border-black bg-black p-3 relative overflow-hidden">
            <div className="relative h-36 w-full border border-neutral-800">
              <Image
                src="/images/sections/growth-audit-telemetry.png"
                alt="Creativee World Growth Audit Diagnostics Telemetry Dashboard"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center grayscale contrast-125 opacity-90"
              />
              <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 border border-white/20 font-mono text-[9px] uppercase tracking-widest text-white">
                AUDIT_TELEMETRY // LIVE DIAGNOSTICS
              </div>
            </div>
          </div>

          {/* Value Reassurance Items */}
          <div className="space-y-4 pt-6 border-t-2 border-black">
            <div className="flex items-start space-x-3 text-xs text-black">
              <Check size={16} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block font-serif font-bold uppercase text-sm">Forensic Channel Audit:</strong>
                <span className="font-serifBody text-neutral-800">Pinpoint wasted spend across Meta, Google, and organic search.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs text-black">
              <Check size={16} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block font-serif font-bold uppercase text-sm">Attribution & Technical Health:</strong>
                <span className="font-serifBody text-neutral-800">Diagnose server-side tracking and funnel conversion drop-offs.</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs text-black">
              <ShieldCheck size={16} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
              <div>
                <strong className="text-black block font-serif font-bold uppercase text-sm">Direct Senior Architect Review:</strong>
                <span className="font-serifBody text-neutral-800">Direct technical review by senior growth architects within 24 hours.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Embedded Conversion Form (7 cols on desktop) */}
        <div className="lg:col-span-7">
          <GrowthAuditForm />
        </div>
      </div>
    </MonochromeSection>
  );
}

