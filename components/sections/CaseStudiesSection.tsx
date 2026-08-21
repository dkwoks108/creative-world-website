import React from 'react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { FeaturedCaseStudy } from '@/components/ui/FeaturedCaseStudy';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { caseStudiesData } from '@/data/case-studies';

export function CaseStudiesSection() {
  const featuredStudy = caseStudiesData.find((cs) => cs.featured) || caseStudiesData[0];
  const secondaryStudies = caseStudiesData.filter((cs) => cs.id !== featuredStudy.id);

  return (
    <section id="work" className="relative py-28 bg-[#08090C] text-white border-b border-white/10 overflow-hidden">
      {/* Precision Grid Lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <Container variant="wide" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-sm bg-white/10 border border-white/15 text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8FF2C]">
              [ SELECTED CASE STUDIES & PROOF ]
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tighter uppercase leading-[1.05]">
              WORK THAT MOVED <span className="text-[#B8FF2C]">THE COMMERCIAL NEEDLE.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-[#C5CBD3] leading-relaxed font-normal max-w-2xl">
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
      </Container>
    </section>
  );
}
