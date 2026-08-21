import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { IndustryItem } from '@/types';

interface IndustryCardProps {
  industry: IndustryItem;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  return (
    <div className="group bg-white text-black border-2 border-black p-6 sm:p-8 flex flex-col justify-between h-full min-h-[420px] transition-colors duration-100 hover:bg-black hover:text-white rounded-none focus-within:ring-2 focus-within:ring-black">
      {industry.image && (
        <div className="relative h-48 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden border-b-2 border-black bg-neutral-100">
          <Image
            src={industry.image}
            alt={industry.title}
            fill
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 font-bold">
          <span>{industry.kicker}</span>
          <span className="w-2.5 h-2.5 border border-current bg-current inline-block" aria-hidden="true" />
        </div>

        <h3 className="font-serif font-bold text-2xl sm:text-3xl tracking-tight leading-snug">
          {industry.title}
        </h3>

        <p className="font-serifBody text-sm leading-relaxed opacity-90">
          {industry.shortDescription}
        </p>

        <div className="space-y-2 pt-4 border-t border-current">
          <span className="text-[11px] font-mono uppercase tracking-wider block font-bold text-neutral-500 group-hover:text-neutral-400">
            KEY GROWTH FOCUS:
          </span>
          <ul className="space-y-2 font-serifBody text-xs">
            {industry.strategyPoints.slice(0, 2).map((point, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <Check className="h-4 w-4 shrink-0 mt-0.5 text-black group-hover:text-white transition-colors duration-100" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-current mt-6">
        <Link
          href={`/industries/${industry.slug}`}
          className="flex items-center justify-between font-mono text-xs uppercase tracking-widest font-bold group-hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-current"
        >
          <span>EXPLORE STRATEGY</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

