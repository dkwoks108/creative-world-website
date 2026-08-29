import React from 'react';
import { CaseStudyMetric } from '@/types';

interface CaseStudyResultBadgeProps {
  metric: CaseStudyMetric;
}

export function CaseStudyResultBadge({ metric }: CaseStudyResultBadgeProps) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 transition-colors space-y-1 text-white">
      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block font-medium">
        {metric.label}
      </span>
      <div className="font-display font-bold text-2xl text-[#00CFFF]">
        {metric.value}
      </div>
      <p className="text-xs text-slate-300">{metric.context}</p>
    </div>
  );
}
