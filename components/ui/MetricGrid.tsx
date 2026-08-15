import React from 'react';
import { MetricPlaceholder } from '@/types';

interface MetricGridProps {
  metrics: MetricPlaceholder[];
}

export function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {metrics.map((metric, idx) => (
        <div
          key={metric.id || idx}
          className="relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-border-subtle hover:border-border-active shadow-editorial transition-all duration-300 group"
        >
          {/* Subtle Accent Edge */}
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-coral/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="space-y-3">
            {/* Metric Tag */}
            <span className="font-mono text-[10px] uppercase tracking-widest text-txt-muted block font-medium">
              {metric.labelPlaceholder}
            </span>

            {/* Metric Value */}
            <div className="font-display font-normal text-3xl sm:text-4xl text-plum tracking-tight">
              {metric.valuePlaceholder}
            </div>
          </div>

          {/* Subtext Explanation & Verified Badge */}
          <div className="pt-6 mt-6 border-t border-border-subtle space-y-2">
            <p className="text-xs text-txt-secondary leading-relaxed font-normal">
              {metric.subtextPlaceholder}
            </p>
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-txt-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-semantic-success" />
              <span>AUDITED PERFORMANCE METRIC</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
