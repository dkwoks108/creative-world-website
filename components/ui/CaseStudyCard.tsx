import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';
import { CaseStudyVisualPlaceholder } from './CaseStudyVisualPlaceholder';
import { CaseStudyResultBadge } from './CaseStudyResultBadge';

interface CaseStudyCardProps {
  caseStudy: CaseStudyItem;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#151821] border border-white/10 hover:border-[#4D5CFF]/60 shadow-xl transition-all duration-300 group space-y-6">
      <div className="space-y-4">
        <div className="relative h-[220px] w-full rounded-xl overflow-hidden border border-white/10 group">
          {caseStudy.image ? (
            <>
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono z-10">
                <span className="px-2 py-0.5 rounded bg-[#08090C]/90 backdrop-blur-sm border border-white/10 text-white font-medium">
                  {caseStudy.industryPlaceholder}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#4D5CFF] text-white font-semibold">
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

        <div className="flex items-center justify-between text-xs font-mono text-white/50 pt-2">
          <span>{caseStudy.industryPlaceholder}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C]" />
        </div>

        <h3 className="font-display font-bold text-2xl text-white uppercase group-hover:text-[#B8FF2C] transition-colors">
          {caseStudy.title}
        </h3>

        <p className="text-xs text-[#C5CBD3] leading-relaxed">
          {caseStudy.shortDescription}
        </p>

        {/* Metric Badges */}
        <div className="space-y-2 pt-2">
          {caseStudy.metrics.slice(0, 1).map((metric, mIdx) => (
            <CaseStudyResultBadge key={mIdx} metric={metric} />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {caseStudy.services.map((service, sIdx) => (
            <span key={sIdx} className="px-2 py-0.5 text-[9px] font-mono text-white/70 bg-[#08090C] border border-white/10 rounded">
              {service}
            </span>
          ))}
        </div>

        <Link
          href={`/work/${caseStudy.slug}`}
          className="inline-flex items-center space-x-1 text-xs font-mono text-[#B8FF2C] hover:text-white font-bold transition-colors"
        >
          <span>EXPLORE</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
