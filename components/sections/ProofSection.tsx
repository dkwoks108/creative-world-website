'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Quote, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { MouseParallax } from '@/components/motion/MouseParallax';
import { TechScrambler } from '@/components/motion/TechScrambler';
import { testimonialsData } from '@/data/testimonials';

export function ProofSection() {
  const featuredTestimonial = testimonialsData[0];

  return (
    <section className="relative py-28 bg-ivory border-b border-border-subtle overflow-hidden">
      {/* Background Lighting Glow with Parallax */}
      <MouseParallax strength={14} invert className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-coral/5 blur-[160px] rounded-full" />
      </MouseParallax>

      <Container variant="standard" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            <TechScrambler
              text="AUDITED PROOF & EVIDENCE"
              className="font-mono text-xs uppercase tracking-widest text-txt-secondary"
            />
          </div>

          <RevealText>
            <h2 className="font-display font-normal text-4xl sm:text-6xl lg:text-7xl text-plum tracking-tight leading-[1.08]">
              Credibility Built on <br />
              <span className="text-coral italic font-normal">Verifiable Proof.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-txt-secondary leading-relaxed font-normal">
            We hold ourselves to rigorous data transparency. Testimonials and revenue claims are published only when fully audited and verified with client permission.
          </p>
        </div>

        {/* Generated 3D Audited Proof Visual Embed */}
        <RevealOnScroll variant="clip-up">
          <ImageReveal duration={1.2} className="rounded-2xl overflow-hidden shadow-editorial border border-border-subtle">
            <div className="relative w-full h-[220px] sm:h-[280px]">
              <Image
                src="/images/visuals/audited_proof_visual.png"
                alt="High tech 3D audited proof ledger visual"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 space-y-1">
                <TechScrambler text="[ VERIFIED PROOF LEDGER ]" className="text-xs font-mono text-coral font-semibold" />
                <span className="text-sm font-mono text-white/90">
                  Cryptographically & Audited ROI Ledger Metrics
                </span>
              </div>
            </div>
          </ImageReveal>
        </RevealOnScroll>

        {/* Featured Editorial Testimonial Card */}
        {featuredTestimonial && (
          <RevealOnScroll variant="scale-in">
            <MouseParallax strength={5}>
              <div className="relative p-8 sm:p-12 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-8">
                {/* Background SVG Quote Mark with 0.20x depth */}
                <Quote className="absolute top-6 right-8 h-20 w-20 text-border-subtle/30 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center space-x-2 text-xs font-mono text-coral font-medium">
                    <ShieldCheck className="h-4 w-4" />
                    <TechScrambler text="AUDITED CLIENT PROOF CARD" />
                  </div>

                  <blockquote className="font-display font-normal text-2xl sm:text-3xl text-plum leading-relaxed italic max-w-4xl">
                    &ldquo;{featuredTestimonial.quotePlaceholder}&rdquo;
                  </blockquote>
                </div>

                {/* Client Identity & Relationship to Case Study */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-border-subtle relative z-10">
                  <div className="space-y-1">
                    <span className="font-mono text-sm font-bold text-plum block">
                      {featuredTestimonial.clientNamePlaceholder}
                    </span>
                    <span className="text-xs text-txt-secondary block">
                      {featuredTestimonial.clientRolePlaceholder} • {featuredTestimonial.companyPlaceholder}
                    </span>
                  </div>

                  {featuredTestimonial.relatedCaseStudySlug && (
                    <Link
                      href={`/work/${featuredTestimonial.relatedCaseStudySlug}`}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cream/40 border border-border-subtle hover:border-border-active text-xs font-mono text-coral font-medium transition-colors"
                    >
                      <span>VIEW RELATED CASE STUDY</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </MouseParallax>
          </RevealOnScroll>
        )}

        {/* Section Layer Tag */}
        <div className="pt-4 border-t border-border-subtle text-xs font-mono text-txt-muted flex justify-between items-center">
          <TechScrambler text="[ SYSTEM LAYER: 07 / AUDITED EVIDENCE ]" />
          <span>DATA TRANSPARENCY</span>
        </div>
      </Container>
    </section>
  );
}
