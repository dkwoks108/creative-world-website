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
    <div className="flex flex-col justify-between p-6 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-100 group space-y-6">
      <div className="space-y-4">
        <div className="relative h-[200px] w-full border-2 border-black overflow-hidden bg-neutral-100">
          {caseStudy.image ? (
            <>
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono z-10">
                <span className="px-2 py-0.5 bg-black text-white font-bold uppercase tracking-widest border border-black group-hover:bg-white group-hover:text-black">
                  {caseStudy.industryPlaceholder}
                </span>
                <span className="px-2 py-0.5 bg-white text-black font-bold uppercase tracking-widest border border-black group-hover:bg-black group-hover:text-white">
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

        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-neutral-300 pt-2 font-bold uppercase tracking-widest">
          <span>{caseStudy.industryPlaceholder}</span>
          <span className="w-2 h-2 bg-black group-hover:bg-white inline-block" />
        </div>

        <h3 className="font-serif font-bold text-2xl uppercase tracking-tight text-black group-hover:text-white">
          {caseStudy.title}
        </h3>

        <p className="font-serifBody text-xs leading-relaxed text-neutral-700 group-hover:text-neutral-300">
          {caseStudy.shortDescription}
        </p>

        {/* Metric Badges */}
        <div className="space-y-2 pt-2">
          {caseStudy.metrics.slice(0, 1).map((metric, mIdx) => (
            <div key={mIdx} className="p-3 border border-black group-hover:border-white bg-neutral-50 group-hover:bg-neutral-900 space-y-1">
              <div className="font-serif font-bold text-xl leading-none text-black group-hover:text-white">{metric.value}</div>
              <div className="font-mono text-[9px] text-neutral-600 group-hover:text-neutral-400 uppercase font-bold tracking-widest">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t-2 border-black group-hover:border-white flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {caseStudy.services.map((service, sIdx) => (
            <span key={sIdx} className="px-2 py-0.5 text-[9px] font-mono text-black group-hover:text-white bg-neutral-100 group-hover:bg-neutral-800 border border-black group-hover:border-white font-bold uppercase">
              {service}
            </span>
          ))}
        </div>

        <Link
          href={`/work/${caseStudy.slug}`}
          className="inline-flex items-center space-x-1 text-xs font-mono text-black group-hover:text-white font-bold tracking-widest"
        >
          <span>EXPLORE</span>
          <ArrowUpRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}

