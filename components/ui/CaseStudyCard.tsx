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
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-border-subtle hover:border-border-active shadow-editorial hover:shadow-editorial-lg transition-all duration-300 group space-y-6">
      <div className="space-y-4">
        <div className="relative h-[220px] w-full rounded-xl overflow-hidden border border-border-subtle group">
          {caseStudy.image ? (
            <>
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono z-10">
                <span className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm border border-border-subtle text-plum font-medium">
                  {caseStudy.industryPlaceholder}
                </span>
                <span className="px-2 py-0.5 rounded bg-coral/20 text-coral border border-coral/30 font-medium">
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

        <div className="flex items-center justify-between text-xs font-mono text-txt-muted pt-2">
          <span>{caseStudy.industryPlaceholder}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
        </div>

        <h3 className="font-display font-normal text-2xl text-plum group-hover:text-coral transition-colors">
          {caseStudy.title}
        </h3>

        <p className="text-xs text-txt-secondary leading-relaxed">
          {caseStudy.shortDescription}
        </p>

        {/* Metric Badges */}
        <div className="space-y-2 pt-2">
          {caseStudy.metrics.slice(0, 1).map((metric, mIdx) => (
            <CaseStudyResultBadge key={mIdx} metric={metric} />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {caseStudy.services.map((service, sIdx) => (
            <span key={sIdx} className="px-2 py-0.5 text-[9px] font-mono text-txt-muted bg-cream/50 border border-border-subtle rounded">
              {service}
            </span>
          ))}
        </div>

        <Link
          href={`/work/${caseStudy.slug}`}
          className="inline-flex items-center space-x-1 text-xs font-mono text-plum hover:text-coral font-semibold transition-colors"
        >
          <span>EXPLORE</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
