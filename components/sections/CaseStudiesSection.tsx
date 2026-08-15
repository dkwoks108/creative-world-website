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
    <section id="work" className="relative py-28 bg-ivory border-b border-border-subtle overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/4 left-10 w-[500px] h-[500px] bg-coral/5 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[500px] bg-gold/10 blur-[160px] rounded-full" />

      <Container variant="wide" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-txt-secondary">
              PROVEN CASE STUDIES
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-normal text-4xl sm:text-6xl lg:text-7xl text-plum tracking-tight leading-[1.08]">
              Work That Moved <br />
              <span className="text-coral italic font-normal">the Business.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-txt-secondary leading-relaxed font-normal">
            Explore how our connected growth system turns marketing investments into measurable revenue scale across tech, e-commerce, and enterprise sectors.
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
