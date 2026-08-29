'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Check, Zap } from 'lucide-react';
import { IndustryCaseStudy } from '@/data/industryCaseStudies';

interface Props {
  caseStudy: IndustryCaseStudy;
  onExplore: (caseStudy: IndustryCaseStudy) => void;
}

export function CaseStudyIndustryCard({ caseStudy, onExplore }: Props) {
  return (
    <article className="group bg-slate-900/60 text-white border border-white/10 p-6 sm:p-8 flex flex-col justify-between h-full min-h-[580px] transition-all duration-300 hover:border-[#00CFFF]/50 hover:shadow-2xl rounded-3xl backdrop-blur-md">
      
      <div className="space-y-6">
        {/* Top Full-Bleed Image Frame with Creativee World Grayscale-to-Color Hover Effect */}
        {caseStudy.image ? (
          <div className="relative h-48 sm:h-56 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden border-b border-white/10 rounded-t-3xl bg-slate-950">
            <Image
              src={caseStudy.image}
              alt={caseStudy.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute top-3 right-3 px-3 py-1 bg-slate-900/90 text-[#00CFFF] font-mono text-[10px] uppercase font-bold tracking-wider border border-[#00CFFF]/30 rounded-full backdrop-blur-md">
              {caseStudy.industryName}
            </div>
          </div>
        ) : null}

        {/* Category & Kicker Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-widest text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#00CFFF]" aria-hidden="true" />
            <span>{caseStudy.category}</span>
          </div>
          <span className="px-2.5 py-0.5 border border-white/10 bg-slate-800/80 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300 rounded-md">
            {caseStudy.kicker}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight leading-snug text-white">
          {caseStudy.title}
        </h3>

        {/* Short Problem Statement */}
        <div className="p-4 rounded-xl border border-white/10 bg-slate-950/60 space-y-1.5">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#00CFFF] flex items-center gap-1.5">
            <Zap size={12} className="text-[#00CFFF]" />
            <span>BUSINESS CHALLENGE</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {caseStudy.shortProblem}
          </p>
        </div>

        {/* Creativee World Solution Tags */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-slate-400">
            CREATIVEE SOLUTION MATRIX:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {caseStudy.creativeeSolution.servicesUsed.map((srv, idx) => (
              <span key={idx} className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10 rounded-md bg-slate-800 text-slate-300">
                {srv}
              </span>
            ))}
          </div>
        </div>

        {/* Key Capabilities */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-slate-400">
            KEY CAPABILITIES:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {caseStudy.capabilities.slice(0, 2).map((cap, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check size={14} className="shrink-0 mt-0.5 text-[#00CFFF] font-bold" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Explore Button CTA */}
      <div className="pt-6 border-t border-white/10 mt-6">
        <button
          onClick={() => onExplore(caseStudy)}
          className="w-full flex items-center justify-between p-3.5 rounded-full border border-white/15 bg-slate-800/80 hover:bg-[#00CFFF] hover:text-[#050608] hover:border-[#00CFFF] text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md"
        >
          <span>Explore Case Study</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}
