'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, CheckCircle2, Cpu } from 'lucide-react';
import { IndustryCaseStudy } from '@/data/industryCaseStudies';
import { IndustryVisualPreview } from './IndustryVisualPreview';
import { BeforeAfterVisualizer } from './BeforeAfterVisualizer';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';

interface Props {
  caseStudy: IndustryCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyDetailModal({ caseStudy, isOpen, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !caseStudy) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 md:p-10 animate-fade-in overscroll-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      {/* Outer Card Container with Fixed Explicit Height Viewport Constraint */}
      <div 
        className="relative w-full max-w-5xl h-[85vh] sm:h-[90vh] bg-white text-black border-4 border-black shadow-2xl flex flex-col my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header Bar */}
        <div className="shrink-0 bg-black text-white p-4 sm:p-6 border-b-4 border-black flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-white inline-block animate-pulse shrink-0" />
            <div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">
                CREATIVEE SECTOR DOSSIER
              </span>
              <h2 id="modal-title" className="font-serif font-bold text-base sm:text-xl text-white tracking-tight leading-none truncate max-w-[260px] sm:max-w-xl">
                {caseStudy.industryName}: {caseStudy.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border-2 border-white bg-black hover:bg-white hover:text-black transition-colors text-white font-mono text-xs uppercase font-bold flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shrink-0 ml-2 cursor-pointer"
            aria-label="Close dossier"
          >
            <span className="hidden sm:inline">CLOSE</span>
            <X size={18} />
          </button>
        </div>

        {/* Dedicated Scrollable Content Area */}
        <div className="flex-1 h-full min-h-0 overflow-y-auto p-5 sm:p-8 md:p-10 space-y-10 sm:space-y-12 font-serifBody text-black selection:bg-black selection:text-white overscroll-contain">
          
          {/* 01 — OVERVIEW */}
          <section className="space-y-4 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
              <span className="px-2 py-0.5 border border-black bg-neutral-100 text-black">01</span>
              <span>OVERVIEW &amp; CONTEXT</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-4xl text-black tracking-tight leading-tight">
              {caseStudy.title}
            </h3>
            <p className="font-serif text-base sm:text-xl text-neutral-800 leading-relaxed max-w-4xl">
              {caseStudy.overview}
            </p>
          </section>

          {/* 02 — CHALLENGE */}
          <section className="space-y-6 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
              <span className="px-2 py-0.5 border border-black bg-neutral-100 text-black">02</span>
              <span>BUSINESS CHALLENGE</span>
            </div>
            <p className="font-serifBody text-base text-neutral-700 leading-relaxed font-semibold">
              {caseStudy.businessChallenge.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {caseStudy.businessChallenge.points.map((pt, idx) => (
                <div key={idx} className="p-4 border-2 border-black bg-neutral-50 space-y-2">
                  <div className="font-mono text-xs font-bold text-neutral-600 flex items-center gap-2">
                    <span className="w-4 h-4 border border-black bg-white text-black text-[10px] flex items-center justify-center font-mono shrink-0">✕</span>
                    <span>BOTTLENECK 0{idx + 1}</span>
                  </div>
                  <p className="font-serifBody text-sm text-neutral-800">{pt}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 03 — STRATEGY */}
          <section className="space-y-6 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
              <span className="px-2 py-0.5 border border-black bg-neutral-100 text-black">03</span>
              <span>CREATIVEE STRATEGY</span>
            </div>
            <p className="font-serifBody text-base text-neutral-800 leading-relaxed font-medium">
              {caseStudy.creativeeSolution.summary}
            </p>

            <div className="space-y-3">
              {caseStudy.creativeeSolution.points.map((pt, idx) => (
                <div key={idx} className="p-4 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-100 space-y-1 group">
                  <div className="font-mono text-xs font-bold text-neutral-500 group-hover:text-neutral-300 flex items-center gap-2 transition-colors">
                    <CheckCircle2 size={16} className="text-black group-hover:text-white transition-colors shrink-0" />
                    <span>STRATEGIC PILLAR 0{idx + 1}</span>
                  </div>
                  <p className="font-serifBody text-sm leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 04 — SOLUTION & SERVICES */}
          <section className="space-y-6 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
              <span className="px-2 py-0.5 border border-black bg-neutral-100 text-black">04</span>
              <span>SOLUTION &amp; ARCHITECTURE</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {caseStudy.creativeeSolution.servicesUsed.map((srv, idx) => (
                <span key={idx} className="px-3 py-1.5 border-2 border-black bg-black text-white font-mono text-xs font-bold uppercase tracking-wider">
                  {srv}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {caseStudy.capabilities.map((cap, idx) => (
                <div key={idx} className="p-4 border-2 border-black bg-neutral-50 font-mono text-xs font-bold uppercase tracking-wider text-black flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-black inline-block shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 05 — EXPERIENCE CONCEPT VISUAL */}
          <section className="space-y-6 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
              <span className="px-2 py-0.5 border border-black bg-neutral-100 text-black">05</span>
              <span>DIGITAL SYSTEM EXPERIENCE CONCEPT</span>
            </div>
            
            <IndustryVisualPreview 
              concept={caseStudy.visualConcept}
              industryName={caseStudy.industryName}
            />
          </section>

          {/* 06 — TRANSFORMATION (BEFORE / AFTER) */}
          <section className="space-y-6 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
              <span className="px-2 py-0.5 border border-black bg-neutral-100 text-black">06</span>
              <span>BEFORE / AFTER TRANSFORMATION</span>
            </div>

            <BeforeAfterVisualizer
              beforePoints={caseStudy.transformation.before}
              afterPoints={caseStudy.transformation.after}
              title={`Transforming ${caseStudy.industryName}`}
            />
          </section>

          {/* 07 — POTENTIAL IMPACT */}
          <section className="space-y-6 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
              <span className="px-2 py-0.5 border border-black bg-neutral-100 text-black">07</span>
              <span>PROJECTED POTENTIAL IMPACT</span>
            </div>

            <p className="font-serifBody text-sm text-neutral-600 italic">
              {caseStudy.potentialImpact.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {caseStudy.potentialImpact.highlights.map((item, idx) => (
                <div key={idx} className="p-6 border-2 border-black bg-white space-y-2 text-center">
                  <div className="font-mono text-[10px] uppercase font-bold text-neutral-500 tracking-widest">{item.label}</div>
                  <div className="font-serif font-bold text-2xl text-black">{item.value}</div>
                  <div className="font-serifBody text-xs text-neutral-600">{item.subtext}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 08 — TECHNOLOGY STACK */}
          <section className="space-y-6 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
              <span className="px-2 py-0.5 border border-black bg-neutral-100 text-black">08</span>
              <span>ENTERPRISE TECH STACK &amp; INTEGRATIONS</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {caseStudy.technologyStack.map((tech, idx) => (
                <div key={idx} className="px-4 py-2 border-2 border-black bg-neutral-100 font-mono text-xs font-bold text-black flex items-center gap-2">
                  <Cpu size={14} className="text-black shrink-0" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 09 — FINAL CTA */}
          <section className="p-6 sm:p-8 bg-black text-white border-4 border-black space-y-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                09 / NEXT STEPS
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Build Something Better With Creativee World
              </h3>
              <p className="font-serifBody text-sm text-neutral-300">
                Ready to transform your {caseStudy.industryName} business with automated digital systems?
              </p>
            </div>

            <Link href="/contact" onClick={onClose}>
              <MonochromeButton variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-black whitespace-nowrap" showArrow>
                Start Your Project
              </MonochromeButton>
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}
