'use client';

import React from 'react';
import Image from 'next/image';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { FeaturedCaseStudy } from '@/components/ui/FeaturedCaseStudy';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { caseStudiesData } from '@/data/case-studies';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MaskReveal } from '@/components/motion/MaskReveal';

export function CaseStudiesSection() {
  const featuredStudy = caseStudiesData.find((cs) => cs.featured) || caseStudiesData[0];
  const secondaryStudies = caseStudiesData.filter((cs) => cs.id !== featuredStudy.id);

  return (
    <MonochromeSection id="work" divider="thick" texture="grid">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white">
            <span className="w-2 h-2 bg-black inline-block" aria-hidden="true" />
            <span>04 / SELECTED CASE STUDIES & PROOF</span>
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-6xl text-black tracking-tight uppercase leading-none">
            WORK THAT MOVED<br />
            THE COMMERCIAL NEEDLE<span className="text-neutral-400">.</span>
          </h2>

          <p className="font-serifBody text-lg sm:text-xl text-neutral-800 leading-relaxed max-w-2xl">
            Explore how our integrated growth systems turn strategy and engineering into verified revenue scale across direct-to-consumer, real estate, and hospitality brands.
          </p>
        </div>

        {/* Bespoke 3D Growth Matrix Visual Showcase Banner */}
        <MaskReveal delay={0.2} duration={0.9}>
          <div className="border-4 border-black bg-black relative overflow-hidden">
            <div className="relative w-full h-[240px] sm:h-[320px]">
              <Image
                src="/images/visuals/growth_matrix_visual.png"
                alt="3D computational growth matrix visual"
                fill
                className="object-cover grayscale contrast-125"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-2">
                <span className="font-mono text-xs text-white uppercase tracking-widest">[ COMPUTATIONAL GROWTH MODEL ]</span>
                <h3 className="font-serif text-2xl sm:text-4xl text-white font-bold uppercase">
                  Data-Driven Funnel Optimization & Attribution
                </h3>
              </div>
            </div>
          </div>
        </MaskReveal>

        {/* Featured Case Study Panel */}
        <ScrollReveal direction="bottom" delay={0.2}>
          <FeaturedCaseStudy caseStudy={featuredStudy} />
        </ScrollReveal>

        {/* Secondary Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {secondaryStudies.map((caseStudy, idx) => (
            <ScrollReveal key={caseStudy.id} direction="bottom" delay={idx * 0.1}>
              <CaseStudyCard caseStudy={caseStudy} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </MonochromeSection>
  );
}

