import React from 'react';

interface CaseStudyVisualPlaceholderProps {
  clientName: string;
  industry: string;
  className?: string;
}

export function CaseStudyVisualPlaceholder({
  clientName,
  industry,
  className = '',
}: CaseStudyVisualPlaceholderProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[260px] sm:min-h-[320px] rounded-xl bg-cream/40 border border-border-subtle overflow-hidden flex flex-col justify-between p-6 ${className}`}
    >
      {/* Background Lighting Gradients */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-coral/10 blur-[70px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1b133c08_1px,transparent_1px),linear-gradient(to_bottom,#1b133c08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

      {/* Top Metadata Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-border-subtle pb-3">
        <span className="font-mono text-[10px] text-txt-muted uppercase tracking-widest">
          GROWTH PLAYBOOK BLUEPRINT
        </span>
        <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-coral/10 text-coral border border-coral/30 font-medium">
          {industry}
        </span>
      </div>

      {/* Center Technical Graphic Abstract Node */}
      <div className="relative z-10 my-auto text-center space-y-2 py-4">
        <div className="mx-auto w-12 h-12 rounded-lg bg-white border border-border-subtle shadow-editorial-sm flex items-center justify-center text-plum">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <span className="font-display font-normal text-xl text-plum block">
          {clientName}
        </span>
        <span className="text-[10px] text-txt-muted font-mono uppercase tracking-wider block">
          JAIPUR SECTOR BLUEPRINT
        </span>
      </div>

      {/* Bottom Footer Indicator */}
      <div className="relative z-10 flex items-center justify-between border-t border-border-subtle pt-3 text-[10px] font-mono text-txt-muted">
        <span>STRATEGY STATUS: ACTIVE BLUEPRINT</span>
        <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
      </div>
    </div>
  );
}
