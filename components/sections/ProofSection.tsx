'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Quote, ShieldCheck } from 'lucide-react';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { testimonialsData } from '@/data/testimonials';

export function ProofSection() {
  const featuredTestimonial = testimonialsData[0];

  return (
    <MonochromeSection divider="thick" texture="lines">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white">
            <span className="w-2 h-2 bg-black inline-block" aria-hidden="true" />
            <span>07 / AUDITED PROOF & EVIDENCE</span>
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-6xl text-black tracking-tight uppercase leading-none">
            CREDIBILITY BUILT ON<br />
            VERIFIABLE PROOF<span className="text-neutral-400">.</span>
          </h2>

          <p className="font-serifBody text-lg sm:text-xl text-neutral-800 leading-relaxed font-normal">
            We hold ourselves to rigorous data transparency. Testimonials and revenue claims are published only when fully audited and verified with client permission.
          </p>
        </div>

        {/* Featured Editorial Testimonial Card */}
        {featuredTestimonial && (
          <div className="relative p-8 sm:p-12 border-4 border-black bg-white space-y-8">
            <Quote size={80} className="absolute top-6 right-8 text-neutral-200 pointer-events-none stroke-1" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center space-x-2 text-xs font-mono text-black font-bold uppercase tracking-widest">
                <ShieldCheck size={16} strokeWidth={2} className="text-black" />
                <span>AUDITED CLIENT PROOF CARD</span>
              </div>

              <blockquote className="font-serif font-bold text-2xl sm:text-3xl text-black leading-relaxed italic max-w-4xl">
                &ldquo;{featuredTestimonial.quotePlaceholder}&rdquo;
              </blockquote>
            </div>

            {/* Client Identity & Relationship to Case Study */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t-2 border-black relative z-10">
              <div className="space-y-1">
                <span className="font-serif font-bold text-lg text-black block uppercase tracking-tight">
                  {featuredTestimonial.clientNamePlaceholder}
                </span>
                <span className="font-serifBody text-xs text-neutral-600 block">
                  {featuredTestimonial.clientRolePlaceholder} • {featuredTestimonial.companyPlaceholder}
                </span>
              </div>

              {featuredTestimonial.relatedCaseStudySlug && (
                <Link
                  href={`/work/${featuredTestimonial.relatedCaseStudySlug}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors duration-100 text-xs font-mono font-bold uppercase tracking-widest"
                >
                  <span>VIEW RELATED CASE STUDY</span>
                  <ArrowRight size={14} strokeWidth={2} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </MonochromeSection>
  );
}

