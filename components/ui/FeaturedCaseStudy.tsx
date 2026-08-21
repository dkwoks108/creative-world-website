import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CaseStudyItem } from '@/types';
import { CaseStudyVisualPlaceholder } from './CaseStudyVisualPlaceholder';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudyItem;
}

export function FeaturedCaseStudy({ caseStudy }: FeaturedCaseStudyProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 border-4 border-black bg-white space-y-6 lg:space-y-0">
      {/* Visual Canvas (7 cols on desktop) */}
      <div className="lg:col-span-7 w-full h-[340px] sm:h-[400px] relative border-2 border-black overflow-hidden bg-neutral-100">
        {caseStudy.image ? (
          <>
            <Image
              src={caseStudy.image}
              alt={caseStudy.title}
              fill
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center filter grayscale hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-10">
              <span className="px-3 py-1 bg-black text-white font-bold uppercase tracking-widest border border-black">
                SECTOR: {caseStudy.clientPlaceholderName}
              </span>
              <span className="px-3 py-1 bg-white text-black border-2 border-black font-bold uppercase tracking-widest">
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
            <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-black text-white font-bold tracking-widest">
              FEATURED PLAYBOOK
            </span>
            <span className="font-mono text-xs text-neutral-600 font-bold uppercase">
              {caseStudy.industryPlaceholder}
            </span>
          </div>

          <h3 className="font-serif font-bold text-3xl sm:text-4xl text-black tracking-tight leading-tight uppercase">
            {caseStudy.title}
          </h3>

          <p className="font-serifBody text-sm text-neutral-800 leading-relaxed">
            {caseStudy.shortDescription}
          </p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {caseStudy.services.map((service, sIdx) => (
              <span
                key={sIdx}
                className="px-2 py-1 text-[10px] font-mono text-black bg-neutral-100 border border-black font-bold uppercase"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Metrics Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {caseStudy.metrics.map((metric, mIdx) => (
            <div key={mIdx} className="p-3 border-2 border-black bg-neutral-50 space-y-1">
              <div className="font-serif font-bold text-2xl text-black leading-none">{metric.value}</div>
              <div className="font-mono text-[10px] text-neutral-600 uppercase font-bold tracking-widest">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="pt-4 border-t-2 border-black">
          <Link href={`/work/${caseStudy.slug}`}>
            <MonochromeButton variant="primary" showArrow className="w-full justify-center">
              View Complete Playbook
            </MonochromeButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

