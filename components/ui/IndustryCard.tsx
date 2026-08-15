import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { IndustryItem } from '@/types';

interface IndustryCardProps {
  industry: IndustryItem;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  return (
    <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-surface-primary border border-border-subtle hover:border-signal-cyan/40 transition-all space-y-6 group overflow-hidden">
      {industry.image && (
        <div className="relative h-44 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-2 overflow-hidden border-b border-border-subtle">
          <Image
            src={industry.image}
            alt={industry.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-surface-primary/20 to-transparent" />
        </div>
      )}

      <div className="space-y-4">
        <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest block">
          {industry.kicker}
        </span>

        <h3 className="font-display font-bold text-xl sm:text-2xl text-txt-primary group-hover:text-signal-cyan transition-colors">
          {industry.title}
        </h3>

        <p className="text-sm text-txt-secondary leading-relaxed font-normal">
          {industry.shortDescription}
        </p>

        <div className="space-y-2 pt-2 border-t border-border-subtle/50">
          <span className="text-[11px] font-mono uppercase text-txt-muted block font-semibold">
            KEY GROWTH FOCUS:
          </span>
          <ul className="space-y-1.5 text-xs text-txt-secondary font-normal">
            {industry.strategyPoints.slice(0, 2).map((point, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-signal-cyan shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href={`/industries/${industry.slug}`}
        className="inline-flex items-center space-x-2 text-xs font-mono text-signal-cyan group-hover:translate-x-1 transition-transform"
      >
        <span>EXPLORE INDUSTRY STRATEGY</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
