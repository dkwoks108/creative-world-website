import React from 'react';
import Link from 'next/link';
import { ArrowRight, Quote, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { testimonialsData } from '@/data/testimonials';

export function ProofSection() {
  const featuredTestimonial = testimonialsData[0];

  return (
    <section className="relative py-28 bg-[#08090C] text-white border-b border-white/10 overflow-hidden">
      {/* Background Lighting Glow */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#B8FF2C]/5 blur-[160px] rounded-full" />

      <Container variant="standard" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#B8FF2C]">
              AUDITED PROOF & EVIDENCE
            </span>
          </div>

          <RevealText>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tighter uppercase leading-[1.08]">
              Credibility Built on <br />
              <span className="text-[#B8FF2C]">Verifiable Proof.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-[#C5CBD3] leading-relaxed font-normal">
            We hold ourselves to rigorous data transparency. Testimonials and revenue claims are published only when fully audited and verified with client permission.
          </p>
        </div>

        {/* Featured Editorial Testimonial Placeholder Card */}
        {featuredTestimonial && (
          <div className="relative p-8 sm:p-12 rounded-2xl bg-[#151821] border border-white/10 shadow-2xl space-y-8">
            {/* Background SVG Quote Mark */}
            <Quote className="absolute top-6 right-8 h-20 w-20 text-white/5 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#B8FF2C] font-bold">
                <ShieldCheck className="h-4 w-4" />
                <span>AUDITED CLIENT PROOF CARD</span>
              </div>

              <blockquote className="font-display font-bold text-2xl sm:text-3xl text-white leading-relaxed italic max-w-4xl">
                &ldquo;{featuredTestimonial.quotePlaceholder}&rdquo;
              </blockquote>
            </div>

            {/* Client Identity & Relationship to Case Study */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10 relative z-10">
              <div className="space-y-1">
                <span className="font-mono text-sm font-bold text-white block">
                  {featuredTestimonial.clientNamePlaceholder}
                </span>
                <span className="text-xs text-[#C5CBD3] block">
                  {featuredTestimonial.clientRolePlaceholder} • {featuredTestimonial.companyPlaceholder}
                </span>
              </div>

              {featuredTestimonial.relatedCaseStudySlug && (
                <Link
                  href={`/work/${featuredTestimonial.relatedCaseStudySlug}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#08090C] border border-white/10 hover:border-[#B8FF2C]/40 text-xs font-mono text-[#B8FF2C] font-bold transition-colors"
                >
                  <span>VIEW RELATED CASE STUDY</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
