'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Building2, GraduationCap, Stethoscope, Gem, Hotel, Scale, Sparkles } from 'lucide-react';
import { INDUSTRY_CASE_STUDIES } from '@/data/industryCaseStudies';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWCard } from '@/components/ui/CWCard';
import { CWButton } from '@/components/ui/CWButton';

export function IndustryStoryWall() {
  const sectorIcons: Record<string, any> = {
    'ias-upsc-coaching': GraduationCap,
    'coaching': GraduationCap,
    'politician-campaigns': Building2,
    'real-estate': Building2,
    'healthcare-clinics': Stethoscope,
    'hospitality-resorts': Hotel,
    'retail-jewelry': Gem,
    'corporate-legal': Scale,
  };

  return (
    <section className="py-24 bg-[#07090E] text-slate-100 relative overflow-hidden cw-ambient-glow border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-10">
          <div className="lg:col-span-8 space-y-4">
            <RevealOnScroll variant="fade-up">
              <CWBadge variant="cyan">
                <Sparkles size={13} />
                <span>Sector Specialization Universe</span>
              </CWBadge>
            </RevealOnScroll>

            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Tailored growth playbooks for <br />
              <span className="text-cw-gradient">Jaipur&apos;s core commercial verticals.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-sm text-slate-400 font-light">
            <p>
              We don&apos;t use generic templates. Every sector strategy is built around specific buyer psychology and search intent in Rajasthan.
            </p>
          </div>
        </div>

        {/* Sector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRY_CASE_STUDIES.slice(0, 6).map((ind, idx) => {
            const Icon = sectorIcons[ind.id] || Building2;
            const topHighlight = ind.potentialImpact?.highlights?.[0]?.value || 'Verified';
            return (
              <RevealOnScroll key={ind.id} variant="fade-up" delay={idx * 0.08}>
                <CWCard variant="dark" className="h-full flex flex-col justify-between space-y-6 group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-cw-gradient flex items-center justify-center text-white shadow-cw-glow">
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-xs text-[#00CFFF] font-semibold">
                        {ind.category}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl text-white group-hover:text-[#00CFFF] transition-colors">
                      {ind.title}
                    </h3>

                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      {ind.shortProblem}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-[#00CFFF] flex items-center justify-between">
                      <span>PROJECTED IMPACT:</span>
                      <span className="font-bold text-white">{topHighlight}</span>
                    </div>

                    <Link href={`/industries/${ind.slug}`} className="block">
                      <CWButton variant="glass" size="sm" fullWidth>
                        <span>Explore Industry Strategy</span>
                        <ArrowUpRight size={15} />
                      </CWButton>
                    </Link>
                  </div>
                </CWCard>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
}
