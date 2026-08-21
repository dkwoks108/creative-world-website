import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { PackageTier } from '@/types';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';

interface PackageCardProps {
  pkg: PackageTier;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div
      className={`relative flex flex-col justify-between p-8 border-4 border-black bg-white transition-colors duration-100 space-y-8 ${
        pkg.featured ? 'bg-neutral-50' : ''
      }`}
    >
      {pkg.featured && (
        <div className="absolute -top-4 left-6 px-3 py-1 border-2 border-black bg-black text-white font-mono text-[10px] font-bold uppercase tracking-widest">
          MOST POPULAR GROWTH TIER
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-serif font-bold text-3xl uppercase tracking-tight text-black">{pkg.name}</h3>
          <p className="font-serifBody text-xs text-neutral-700 leading-relaxed">{pkg.subtitle}</p>
        </div>

        <div className="flex items-baseline space-x-2 border-b-2 border-black pb-4">
          <span className="font-serif font-bold text-4xl sm:text-5xl text-black">
            {pkg.price}
          </span>
          <span className="text-xs font-mono text-neutral-600 font-bold uppercase">{pkg.period}</span>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase text-black block font-bold tracking-widest">
            IDEAL FOR:
          </span>
          <p className="font-serifBody text-xs text-neutral-800 leading-relaxed">{pkg.idealFor}</p>
        </div>

        <div className="space-y-3 pt-2">
          <span className="text-[11px] font-mono uppercase text-black block font-bold tracking-widest">
            INCLUDED DELIVERABLES:
          </span>
          <ul className="space-y-2.5 text-xs font-serifBody text-neutral-900">
            {pkg.inclusions.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2.5">
                <Check size={16} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t-2 border-black">
        <Link href="/growth-audit">
          <MonochromeButton
            variant={pkg.featured ? 'primary' : 'secondary'}
            className="w-full justify-center"
            showArrow
          >
            {pkg.ctaText}
          </MonochromeButton>
        </Link>

        {pkg.disclaimer && (
          <p className="text-[10px] font-mono text-neutral-500 text-center leading-relaxed font-semibold uppercase">
            {pkg.disclaimer}
          </p>
        )}
      </div>
    </div>
  );
}

