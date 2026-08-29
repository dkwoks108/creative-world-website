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
          className="relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 shadow-xl transition-all duration-300 group text-white"
        >
          {/* Subtle Accent Edge */}
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#00CFFF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="space-y-3">
            {/* Metric Tag */}
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block font-medium">
              {metric.labelPlaceholder}
            </span>

            {/* Metric Value */}
            <div className="font-display font-bold text-3xl sm:text-4xl text-[#00CFFF] tracking-tight">
              {metric.valuePlaceholder}
            </div>
          </div>

          {/* Subtext Explanation & Verified Badge */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {metric.subtextPlaceholder}
            </p>
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>AUDITED PERFORMANCE METRIC</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
