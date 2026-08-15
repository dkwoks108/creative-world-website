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
  return (
    <section className="relative py-24 bg-ivory border-b border-border-subtle overflow-hidden">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-coral/5 blur-[120px] rounded-full" />

      <Container variant="wide" className="space-y-16 relative z-10">
        {/* Section Header */}
        <RevealOnScroll variant="fade-up" className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-txt-secondary">
              BUILT FOR MEASURABLE GROWTH
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl text-plum tracking-tight leading-tight">
              Strategy is only valuable when it produces measurable movement.
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-txt-secondary leading-relaxed">
            We partner with Jaipur businesses and local market leaders to replace fragmented marketing tactics with structured digital growth systems.
          </p>
        </RevealOnScroll>

        {/* Metric Grid Display */}
        <RevealOnScroll variant="scale-in" delay={0.1}>
          <MetricGrid metrics={metricsData} />
        </RevealOnScroll>

        {/* Client Logos Display */}
        <RevealOnScroll variant="fade-up" delay={0.2} className="pt-8 border-t border-border-subtle">
          <ClientLogoRow clients={clientsData} />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
