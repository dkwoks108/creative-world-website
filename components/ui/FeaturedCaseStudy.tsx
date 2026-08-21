import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CaseStudyItem } from '@/types';
import { CaseStudyVisualPlaceholder } from './CaseStudyVisualPlaceholder';
import { CaseStudyResultBadge } from './CaseStudyResultBadge';
import { Button } from '@/components/ui/Button';

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudyItem;
}

export function FeaturedCaseStudy({ caseStudy }: FeaturedCaseStudyProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-[#151821] border border-white/10 hover:border-[#B8FF2C]/40 shadow-2xl transition-all duration-300">
      {/* Visual Canvas (7 cols on desktop) */}
      <div className="lg:col-span-7 w-full h-[360px] sm:h-[420px] relative rounded-xl overflow-hidden border border-white/10">
        {caseStudy.image ? (
          <>
            <Image
              src={caseStudy.image}
              alt={caseStudy.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-10">
              <span className="px-3 py-1 rounded bg-[#08090C]/90 backdrop-blur-sm border border-white/10 text-white font-medium">
                SECTOR: {caseStudy.clientPlaceholderName}
              </span>
              <span className="px-3 py-1 rounded bg-[#B8FF2C] text-[#08090C] font-bold">
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

      {/* Editorial Information (5 cols on desktop) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-[#B8FF2C]/10 text-[#B8FF2C] border border-[#B8FF2C]/20 rounded font-bold">
              FEATURED CASE STUDY
            </span>
            <span className="font-mono text-xs text-white/50">
              {caseStudy.industryPlaceholder}
            </span>
          </div>

          <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight uppercase">
            {caseStudy.title}
          </h3>

          <p className="text-sm text-[#C5CBD3] leading-relaxed">
            {caseStudy.shortDescription}
          </p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {caseStudy.services.map((service, sIdx) => (
              <span
                key={sIdx}
                className="px-2 py-0.5 text-[10px] font-mono text-white/70 bg-[#08090C] border border-white/10 rounded"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Metrics Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {caseStudy.metrics.map((metric, mIdx) => (
            <CaseStudyResultBadge key={mIdx} metric={metric} />
          ))}
        </div>

        {/* Action Link */}
        <div className="pt-4 border-t border-white/10">
          <Link href={`/work/${caseStudy.slug}`}>
            <Button variant="primary" size="md" className="w-full sm:w-auto bg-[#B8FF2C] text-[#08090C] font-bold hover:bg-[#a6f514]" icon={<ArrowRight className="h-4 w-4" />}>
              VIEW PLAYBOOK →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
