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

        {/* Featured Case Study Panel */}
        <FeaturedCaseStudy caseStudy={featuredStudy} />

        {/* Secondary Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {secondaryStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </MonochromeSection>
  );
}

