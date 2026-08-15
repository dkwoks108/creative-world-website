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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-white border border-border-subtle hover:border-border-active shadow-editorial transition-all duration-300">
      {/* Visual Canvas (7 cols on desktop) */}
      <div className="lg:col-span-7 w-full h-[360px] sm:h-[420px] relative rounded-xl overflow-hidden border border-border-subtle">
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
            <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-10">
              <span className="px-3 py-1 rounded bg-white/90 backdrop-blur-sm border border-border-subtle text-plum font-medium">
                SECTOR: {caseStudy.clientPlaceholderName}
              </span>
              <span className="px-3 py-1 rounded bg-coral/20 text-coral border border-coral/30 font-medium">
                FEATURED GROWTH PLAYBOOK
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
            <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-coral/10 text-coral border border-coral/20 rounded font-medium">
              FEATURED CASE STUDY
            </span>
            <span className="font-mono text-xs text-txt-muted">
              {caseStudy.industryPlaceholder}
            </span>
          </div>

          <h3 className="font-display font-normal text-3xl sm:text-4xl text-plum tracking-tight leading-tight">
            {caseStudy.title}
          </h3>

          <p className="text-sm text-txt-secondary leading-relaxed">
            {caseStudy.shortDescription}
          </p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {caseStudy.services.map((service, sIdx) => (
              <span
                key={sIdx}
                className="px-2 py-0.5 text-[10px] font-mono text-txt-muted bg-cream/60 border border-border-subtle rounded"
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
        <div className="pt-4 border-t border-border-subtle">
          <Link href={`/work/${caseStudy.slug}`}>
            <Button variant="primary" size="md" className="w-full sm:w-auto" icon={<ArrowRight className="h-4 w-4" />}>
              View Case Study
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
