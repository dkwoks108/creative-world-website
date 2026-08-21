import React from 'react';
import { CaseStudyMetric } from '@/types';

interface CaseStudyResultBadgeProps {
  metric: CaseStudyMetric;
}

export function CaseStudyResultBadge({ metric }: CaseStudyResultBadgeProps) {
  return (
    <div className="p-4 rounded-xl bg-[#08090C] border border-white/10 space-y-1">
      <span className="font-mono text-[10px] text-[#B8FF2C] uppercase tracking-widest block font-bold">
        {metric.label}
      </span>
      <div className="font-display font-bold text-2xl text-white">
        {metric.value}
      </div>
      <p className="text-xs text-[#9299A8]">{metric.context}</p>
    </div>
  );
}
