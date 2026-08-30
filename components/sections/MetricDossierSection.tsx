'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { testimonialsData } from '@/data/testimonials';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';

export function MetricDossierSection() {
  return (
    <section className="py-24 bg-[#FAFBFF] text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-slate-200 pb-10">
          <div className="lg:col-span-8 space-y-4">
            <RevealOnScroll variant="fade-up">
              <CWBadge variant="cyan">
                <span>Verified Commercial Impact</span>
              </CWBadge>
            </RevealOnScroll>

            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
              Proven pipeline results for <br />
              <span className="text-cw-gradient">Jaipur regional market leaders.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-sm text-slate-600 font-light">
            <p>
              Every case study represents verified lead growth, reduced acquisition costs, and closed-loop attribution for real commercial clients.
            </p>
          </div>
        </div>

        {/* Testimonials & Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonialsData.slice(0, 3).map((item, idx) => (
            <RevealOnScroll key={item.id} variant="fade-up" delay={idx * 0.1}>
              <div className="cw-light-glass-card rounded-3xl p-8 space-y-6 bg-white border border-slate-200 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full font-mono text-xs font-semibold">
                      {item.companyPlaceholder}
                    </span>
                    <span className="text-[#1769FF] font-mono text-xs font-bold flex items-center gap-1">
                      <TrendingUp size={14} />
                      Verified Result
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-slate-900">
                      {item.clientNamePlaceholder} — <span className="text-slate-600 text-sm font-normal">{item.clientRolePlaceholder}</span>
                    </h3>
                    <p className="text-slate-600 text-sm font-light leading-relaxed italic">
                      &ldquo;{item.quotePlaceholder}&rdquo;
                    </p>
                  </div>

                  {/* Primary Growth Metric Highlight */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white space-y-1 shadow-lg">
                    <div className="font-mono text-xs text-[#00CFFF] font-semibold uppercase">VERIFIED BENCHMARK</div>
                    <div className="font-display font-extrabold text-3xl text-white text-cw-gradient">
                      {item.metricHighlightPlaceholder}
                    </div>
                  </div>
                </div>

                {item.relatedCaseStudySlug && (
                  <div className="pt-4 border-t border-slate-100">
                    <Link href={`/work/${item.relatedCaseStudySlug}`}>
                      <CWButton variant="secondary" className="!bg-slate-950 !text-white hover:!bg-[#1769FF] font-semibold transition-all shadow-md" size="sm" fullWidth>
                        <span>View Verified Dossier</span>
                        <ArrowUpRight size={15} className="text-[#00CFFF]" />
                      </CWButton>
                    </Link>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
