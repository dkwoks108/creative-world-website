import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PackageTier } from '@/types';
import { Button } from '@/components/ui/Button';

interface PackageCardProps {
  pkg: PackageTier;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div
      className={`relative flex flex-col justify-between p-8 rounded-2xl bg-surface-primary border transition-all duration-300 space-y-8 shadow-elevated hover:shadow-hover hover:-translate-y-1 ${
        pkg.featured
          ? 'border-signal-cyan shadow-glow'
          : 'border-border-subtle hover:border-border-active'
      }`}
    >
      {pkg.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-signal-cyan text-obsidian font-mono text-[10px] font-bold uppercase tracking-widest shadow-subtle">
          MOST POPULAR GROWTH TIER
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-display font-extrabold text-2xl text-txt-primary">{pkg.name}</h3>
          <p className="text-xs text-txt-secondary leading-relaxed">{pkg.subtitle}</p>
        </div>

        <div className="flex items-baseline space-x-1 border-b border-border-subtle/50 pb-4">
          <span className="font-display font-extrabold text-3xl sm:text-4xl text-signal-cyan">
            {pkg.price}
          </span>
          <span className="text-xs font-mono text-txt-muted">{pkg.period}</span>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase text-txt-muted block font-semibold">
            IDEAL FOR:
          </span>
          <p className="text-xs text-txt-secondary leading-relaxed">{pkg.idealFor}</p>
        </div>

        <div className="space-y-3 pt-2">
          <span className="text-[11px] font-mono uppercase text-txt-muted block font-semibold">
            INCLUDED DELIVERABLES:
          </span>
          <ul className="space-y-2.5 text-xs text-txt-secondary">
            {pkg.inclusions.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-signal-cyan shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border-subtle/50">
        <Link href="/growth-audit">
          <Button
            variant={pkg.featured ? 'primary' : 'outline'}
            size="lg"
            className="w-full"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            {pkg.ctaText}
          </Button>
        </Link>

        {pkg.disclaimer && (
          <p className="text-[10px] font-mono text-txt-muted text-center leading-relaxed">
            {pkg.disclaimer}
          </p>
        )}
      </div>
    </div>
  );
}
