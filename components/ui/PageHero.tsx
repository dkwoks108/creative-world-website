import React from 'react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { Breadcrumbs, BreadcrumbItem } from '@/components/ui/Breadcrumbs';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({
  eyebrow,
  title,
  titleHighlight,
  description,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 bg-[#07090E] border-b border-white/10 overflow-hidden text-white">
      {/* Subtle Background Lighting Accent */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-[500px] h-[300px] bg-gradient-to-r from-[#1769FF]/10 to-[#00CFFF]/10 blur-[140px] rounded-full" />

      <Container variant="wide" className="relative z-10 space-y-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="max-w-4xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-white/10 shadow-lg backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00CFFF] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
              {eyebrow}
            </span>
          </div>

          <RevealText>
            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
              {title}{' '}
              {titleHighlight && <span className="text-[#00CFFF] font-bold">{titleHighlight}</span>}
            </h1>
          </RevealText>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
