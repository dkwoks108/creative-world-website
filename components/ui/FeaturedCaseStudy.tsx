import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';
import { CaseStudyVisualPlaceholder } from './CaseStudyVisualPlaceholder';
import { CWButton } from '@/components/ui/CWButton';

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudyItem;
}

export function FeaturedCaseStudy({ caseStudy }: FeaturedCaseStudyProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/15 shadow-2xl">
      {/* Visual Canvas (7 cols on desktop) */}
      <div className="lg:col-span-7 w-full h-[340px] sm:h-[400px] relative rounded-2xl border border-white/10 overflow-hidden bg-slate-950">
        {caseStudy.image ? (
          <>
            <Image
              src={caseStudy.image}
              alt={caseStudy.title}
              fill
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center hover:scale-105 transition-all duration-500"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-10">
              <span className="px-3 py-1 bg-slate-900/90 text-[#00CFFF] font-semibold uppercase tracking-wider rounded-full border border-white/10 backdrop-blur-md">
                SECTOR: {caseStudy.clientPlaceholderName}
              </span>
              <span className="px-3 py-1 bg-slate-900/90 text-white border border-white/10 font-semibold uppercase tracking-wider rounded-full backdrop-blur-md">
                FEATURED PLAYBOOK
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

      {/* Information (5 cols on desktop) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 text-[11px] font-mono uppercase bg-white/10 text-[#00CFFF] font-semibold tracking-wider rounded-full border border-white/10">
              FEATURED PLAYBOOK
            </span>
            <span className="font-mono text-xs text-slate-400 font-semibold uppercase">
              {caseStudy.industryPlaceholder}
            </span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            {caseStudy.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed font-light">
            {caseStudy.shortDescription}
          </p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {caseStudy.services.map((service, sIdx) => (
              <span
                key={sIdx}
                className="px-2.5 py-1 text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 rounded-full font-medium uppercase"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Metrics Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {caseStudy.metrics.map((metric, mIdx) => (
            <div key={mIdx} className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-1">
              <div className="font-display font-extrabold text-2xl text-[#00CFFF] leading-none">{metric.value}</div>
              <div className="font-mono text-[10px] text-slate-400 uppercase font-medium tracking-wider">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="pt-4 border-t border-white/10">
          <Link href={`/work/${caseStudy.slug}`}>
            <CWButton variant="gradient" size="md" className="w-full justify-center">
              <span>View Complete Playbook</span>
              <ArrowUpRight size={16} />
            </CWButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
