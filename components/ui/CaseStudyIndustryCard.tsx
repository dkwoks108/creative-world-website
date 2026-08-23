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
    <article className="group bg-white text-black border-4 border-black p-6 sm:p-8 flex flex-col justify-between h-full min-h-[580px] transition-colors duration-100 hover:bg-black hover:text-white rounded-none focus-within:ring-4 focus-within:ring-black">
      
      <div className="space-y-6">
        {/* Top Full-Bleed Image Frame with Surnax Grayscale-to-Color Hover Effect */}
        {caseStudy.image ? (
          <div className="relative h-48 sm:h-56 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden border-b-4 border-black bg-neutral-100">
            <Image
              src={caseStudy.image}
              alt={caseStudy.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute top-3 right-3 px-2 py-1 bg-black text-white font-mono text-[10px] uppercase font-bold tracking-wider border border-white/20 group-hover:bg-white group-hover:text-black group-hover:border-black transition-colors">
              {caseStudy.industryName}
            </div>
          </div>
        ) : null}

        {/* Category & Kicker Bar */}
        <div className="flex items-center justify-between border-b-2 border-black group-hover:border-white pb-3 transition-colors">
          <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold tracking-widest text-neutral-500 group-hover:text-neutral-300">
            <span className="w-2.5 h-2.5 bg-black group-hover:bg-white inline-block transition-colors" aria-hidden="true" />
            <span>{caseStudy.category}</span>
          </div>
          <span className="px-2 py-0.5 border border-black group-hover:border-white bg-neutral-100 group-hover:bg-neutral-900 font-mono text-[10px] font-bold uppercase tracking-wider text-black group-hover:text-white transition-colors">
            {caseStudy.kicker}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-2xl sm:text-3xl tracking-tight leading-snug text-black group-hover:text-white transition-colors">
          {caseStudy.title}
        </h3>

        {/* Short Problem Statement */}
        <div className="p-4 border-2 border-black group-hover:border-white bg-neutral-50 group-hover:bg-neutral-900 space-y-1 transition-colors">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 flex items-center gap-1.5 transition-colors">
            <Zap size={12} className="text-black group-hover:text-white transition-colors" />
            <span>BUSINESS CHALLENGE</span>
          </div>
          <p className="font-serifBody text-xs sm:text-sm text-neutral-800 group-hover:text-neutral-200 leading-relaxed transition-colors">
            {caseStudy.shortProblem}
          </p>
        </div>

        {/* Surnax Solution Tags */}
        <div className="space-y-2 pt-2 border-t border-black group-hover:border-white transition-colors">
          <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-neutral-500 group-hover:text-neutral-400 transition-colors">
            SURNAX SOLUTION MATRIX:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {caseStudy.surnaxSolution.servicesUsed.map((srv, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-black group-hover:border-white bg-white group-hover:bg-black text-black group-hover:text-white transition-colors">
                {srv}
              </span>
            ))}
          </div>
        </div>

        {/* Key Capabilities */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-neutral-500 group-hover:text-neutral-400 transition-colors">
            KEY CAPABILITIES:
          </span>
          <ul className="space-y-1.5 font-serifBody text-xs text-neutral-800 group-hover:text-neutral-200">
            {caseStudy.capabilities.slice(0, 2).map((cap, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check size={14} className="shrink-0 mt-0.5 text-black group-hover:text-white font-bold transition-colors" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Explore Button CTA */}
      <div className="pt-6 border-t-2 border-black group-hover:border-white mt-6 transition-colors">
        <button
          onClick={() => onExplore(caseStudy)}
          className="w-full flex items-center justify-between p-3 border-2 border-black group-hover:border-white bg-black text-white group-hover:bg-white group-hover:text-black font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-current"
        >
          <span>Explore Case Study</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}
