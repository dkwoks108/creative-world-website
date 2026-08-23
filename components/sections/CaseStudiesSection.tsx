'use client';

import React from 'react';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { FeaturedCaseStudy } from '@/components/ui/FeaturedCaseStudy';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { caseStudiesData } from '@/data/case-studies';

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
        <RevealOnScroll variant="clip-up">
          <ImageReveal duration={1.2} className="rounded-2xl overflow-hidden shadow-editorial border border-border-subtle">
            <div className="relative w-full h-[240px] sm:h-[320px]">
              <Image
                src="/images/visuals/growth_matrix_visual.png"
                alt="3D computational growth matrix visual"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-2">
                <TechScrambler text="[ COMPUTATIONAL GROWTH MODEL ]" className="text-xs font-mono text-coral font-semibold" />
                <h3 className="font-display text-2xl sm:text-4xl text-white font-normal">
                  Data-Driven Funnel Optimization & Attribution
                </h3>
              </div>
            </div>
          </ImageReveal>
        </RevealOnScroll>

        {/* Featured Case Study Panel */}
        <RevealOnScroll variant="scale-in">
          <MouseParallax strength={4}>
            <FeaturedCaseStudy caseStudy={featuredStudy} />
          </MouseParallax>
        </RevealOnScroll>

        {/* Secondary Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {secondaryStudies.map((caseStudy) => (
            <RevealOnScroll key={caseStudy.id} variant="fade-up">
              <CaseStudyCard caseStudy={caseStudy} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </MonochromeSection>
  );
}

