'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Quote, ShieldCheck, Pause, Play } from 'lucide-react';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { testimonialsData } from '@/data/testimonials';

export function ProofSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = testimonialsData.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const activeTestimonial = testimonialsData[currentIndex];

  return (
    <MonochromeSection id="testimonials" divider="thick" texture="lines">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white">
              <span className="w-2 h-2 bg-black inline-block" aria-hidden="true" />
              <span>07 / AUDITED CLIENT PROOF & TESTIMONIALS</span>
            </div>

            <h2 className="font-serif font-bold text-4xl sm:text-6xl text-black tracking-tight uppercase leading-none">
              VERIFIED IMPACT<br />
              & CLIENT SENTIMENT<span className="text-neutral-400">.</span>
            </h2>

            <p className="font-serifBody text-lg sm:text-xl text-neutral-800 leading-relaxed font-normal">
              Direct insights from leaders and founders who partnered with Surnax to scale search visibility, digital marketing ROI, and web systems.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-150 aria-label='Toggle Auto Slide'"
              title={isPaused ? 'Resume Auto-Play' : 'Pause Auto-Play'}
            >
              {isPaused ? <Play size={18} strokeWidth={2} /> : <Pause size={18} strokeWidth={2} />}
            </button>

            <button
              onClick={prevSlide}
              className="p-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-150"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </button>

            <button
              onClick={nextSlide}
              className="p-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-150"
              aria-label="Next Testimonial"
            >
              <ArrowRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Featured Editorial Auto-Swiping Testimonial Card */}
        <div
          className="relative p-8 sm:p-12 border-4 border-black bg-white space-y-8 min-h-[360px] flex flex-col justify-between shadow-2xl transition-all duration-300"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Quote size={90} className="absolute top-6 right-8 text-neutral-200 pointer-events-none stroke-1" />

          <div className="space-y-6 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-black font-bold uppercase tracking-widest bg-neutral-100 px-3 py-1 border border-black">
                <ShieldCheck size={16} strokeWidth={2} className="text-black" />
                <span>VERIFIED PROOF benchmark</span>
              </div>

              {activeTestimonial.metricHighlightPlaceholder && (
                <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-black text-white border border-black">
                  {activeTestimonial.metricHighlightPlaceholder}
                </span>
              )}
            </div>

            <blockquote className="font-serif font-bold text-2xl sm:text-3xl text-black leading-relaxed italic max-w-4xl transition-all duration-300">
              &ldquo;{activeTestimonial.quotePlaceholder}&rdquo;
            </blockquote>
          </div>

          {/* Client Identity & Relationship to Case Study */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t-2 border-black relative z-10">
            <div className="space-y-1">
              <span className="font-serif font-bold text-xl text-black block uppercase tracking-tight">
                {activeTestimonial.clientNamePlaceholder}
              </span>
              <span className="font-serifBody text-sm text-neutral-600 block">
                {activeTestimonial.clientRolePlaceholder} • <strong className="text-black">{activeTestimonial.companyPlaceholder}</strong>
              </span>
            </div>

            {activeTestimonial.relatedCaseStudySlug ? (
              <Link
                href={`/work/${activeTestimonial.relatedCaseStudySlug}`}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors duration-100 text-xs font-mono font-bold uppercase tracking-widest"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            ) : (
              <Link
                href="/growth-audit"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-100 text-xs font-mono font-bold uppercase tracking-widest"
              >
                <span>GET AUDIT RESULTS</span>
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            )}
          </div>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {testimonialsData.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 transition-all duration-300 border border-black ${
                idx === currentIndex ? 'w-10 bg-black' : 'w-3 bg-neutral-200 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </MonochromeSection>
  );
}
