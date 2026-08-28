import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';
import { CaseStudyVisualPlaceholder } from './CaseStudyVisualPlaceholder';

interface CaseStudyCardProps {
  caseStudy: CaseStudyItem;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 group space-y-6 h-full">
      <div className="space-y-4">
        <div className="relative h-[200px] w-full rounded-2xl border border-white/10 overflow-hidden bg-slate-950">
          {caseStudy.image ? (
            <>
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono z-10">
                <span className="px-2.5 py-1 bg-slate-900/90 text-[#00CFFF] font-semibold uppercase tracking-wider rounded-full border border-white/10 backdrop-blur-md">
                  {caseStudy.industryPlaceholder}
                </span>
                <span className="px-2.5 py-1 bg-slate-900/90 text-white font-semibold uppercase tracking-wider rounded-full border border-white/10 backdrop-blur-md">
                  PLAYBOOK
                </span>
              </div>
            </>
          ) : (
            <CaseStudyVisualPlaceholder
              clientName={caseStudy.clientPlaceholderName}
              industry={caseStudy.industryPlaceholder}
            />
          )}
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 font-semibold uppercase tracking-wider">
          <span>{caseStudy.industryPlaceholder}</span>
          <span className="w-2 h-2 rounded-full bg-[#00CFFF] inline-block" />
        </div>

        <h3 className="font-display font-bold text-xl text-white group-hover:text-[#00CFFF] transition-colors leading-snug">
          {caseStudy.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          {caseStudy.shortDescription}
        </p>

        {/* Metric Badges */}
        <div className="space-y-2 pt-2">
          {caseStudy.metrics.slice(0, 1).map((metric, mIdx) => (
            <div key={mIdx} className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-1">
              <div className="font-display font-extrabold text-2xl leading-none text-[#00CFFF]">{metric.value}</div>
              <div className="font-mono text-[10px] text-slate-300 uppercase font-medium tracking-wider">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {caseStudy.services.map((service, sIdx) => (
            <span key={sIdx} className="px-2.5 py-0.5 text-[10px] font-mono text-slate-300 bg-white/5 rounded-full border border-white/10 font-medium uppercase">
              {service}
            </span>
          ))}
        </div>

        <Link
          href={`/work/${caseStudy.slug}`}
          className="inline-flex items-center space-x-1 text-xs font-mono text-white group-hover:text-[#00CFFF] transition-colors font-semibold tracking-wider"
        >
          <span>EXPLORE</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
