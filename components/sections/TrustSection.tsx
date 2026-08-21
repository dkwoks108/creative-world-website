import React from 'react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { ClientLogoRow } from '@/components/ui/ClientLogoRow';
import { MetricGrid } from '@/components/ui/MetricGrid';
import { clientsData } from '@/data/clients';
import { metricsData } from '@/data/metrics';

export function TrustSection() {
  const stats = [
    { value: '₹12.4Cr+', label: 'REVENUE INFLUENCED', detail: 'Across direct-to-consumer & high-ticket B2B client portfolios', color: 'text-[#B8FF2C]' },
    { value: '38M+', label: 'AUDIENCE REACHED', detail: 'Targeted organic & performance media brand engagements', color: 'text-white' },
    { value: '4.8×', label: 'AVERAGE ROAS', detail: 'Cross-platform paid media & search engine acquisition efficiency', color: 'text-[#4D5CFF]' },
    { value: '27', label: 'BRANDS SCALED', detail: 'Category leaders engineered in Jaipur & pan-India markets', color: 'text-[#31E7FF]' },
  ];

  return (
    <section className="relative py-28 bg-[#151821] text-white overflow-hidden border-b border-white/10">
      {/* Precision Editorial Lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem]" />

      <Container variant="wide" className="space-y-20 relative z-10">
        {/* Section Header */}
        <RevealOnScroll variant="fade-up" className="max-w-4xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-sm bg-white/10 border border-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8FF2C]">
              [ PROOF OF EFFICIENCY ]
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tighter uppercase leading-[1.05]">
              WE BUILD DEMAND, <span className="text-[#B8FF2C]">NOT JUST TRAFFIC.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-[#C5CBD3] leading-relaxed font-normal max-w-2xl">
            Strategy is only valuable when it produces measurable commercial velocity. We replace fragmented agency tactics with integrated growth infrastructure.
          </p>
        </RevealOnScroll>

        {/* Oversized Unboxed Statistics Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-4 border-t border-white/10">
          {stats.map((stat, idx) => (
            <RevealOnScroll key={idx} variant="fade-up" delay={idx * 0.1} className="space-y-3">
              <div className={`font-display font-bold text-5xl sm:text-6xl xl:text-7xl tracking-tighter leading-none ${stat.color}`}>
                {stat.value}
              </div>
              <div className="font-mono text-xs text-[#B8FF2C] uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
              <p className="text-xs text-[#9299A8] font-normal leading-relaxed">
                {stat.detail}
              </p>
            </RevealOnScroll>
          ))}
        </div>

        {/* Client Logos Display */}
        <RevealOnScroll variant="fade-up" delay={0.3} className="pt-12 border-t border-white/10">
          <div className="text-center font-mono text-[11px] uppercase tracking-widest text-white/40 mb-8">
            TRUSTED BY FORWARD-THINKING BRANDS & INDUSTRY LEADERS
          </div>
          <ClientLogoRow clients={clientsData} />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
