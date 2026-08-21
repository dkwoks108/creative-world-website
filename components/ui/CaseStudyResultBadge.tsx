import React from 'react';
import { CaseStudyMetric } from '@/types';

interface CaseStudyResultBadgeProps {
  metric: CaseStudyMetric;
}

export function CaseStudyResultBadge({ metric }: CaseStudyResultBadgeProps) {
  return (
    <div className="p-4 rounded-xl bg-cream/40 border border-border-subtle hover:border-border-active transition-colors space-y-1">
      <span className="font-mono text-[10px] text-txt-muted uppercase tracking-widest block font-medium">
        {metric.label}
      </span>
      <div className="font-display font-normal text-2xl text-plum">
        {metric.value}
      </div>
      <p className="text-xs text-txt-secondary">{metric.context}</p>
    </div>
  );
}
