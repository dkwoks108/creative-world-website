'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { MouseParallax } from '@/components/motion/MouseParallax';
import { TechScrambler } from '@/components/motion/TechScrambler';
import { FeaturedCaseStudy } from '@/components/ui/FeaturedCaseStudy';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { caseStudiesData } from '@/data/case-studies';

export function CaseStudiesSection() {
  const featuredStudy = caseStudiesData.find((cs) => cs.featured) || caseStudiesData[0];
  const secondaryStudies = caseStudiesData.filter((cs) => cs.id !== featuredStudy.id);

  return (
    <section id="work" className="relative py-28 bg-ivory border-b border-border-subtle overflow-hidden">
      {/* Background Glow with Mouse Parallax Depth */}
      <MouseParallax strength={14} invert className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-coral/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gold/10 blur-[160px] rounded-full" />
      </MouseParallax>

      <Container variant="wide" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            <TechScrambler
              text="PROVEN CASE STUDIES"
              className="font-mono text-xs uppercase tracking-widest text-txt-secondary"
            />
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

        {/* Section Layer Tag */}
        <div className="pt-4 border-t border-border-subtle text-xs font-mono text-txt-muted flex justify-between items-center">
          <TechScrambler text="[ SYSTEM LAYER: 05 / CASE STUDIES ]" />
          <span>VERIFIABLE REVENUE RESULTS</span>
        </div>
      </Container>
    </section>
  );
}
