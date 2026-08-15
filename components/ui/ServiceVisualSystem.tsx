'use client';

import React from 'react';
import { ServiceItem } from '@/types';
import { ShieldCheck, ArrowRight, Zap, Target, Search, RefreshCw, Sparkles, Layers } from 'lucide-react';

interface ServiceVisualSystemProps {
  activeService: ServiceItem;
}

export function ServiceVisualSystem({ activeService }: ServiceVisualSystemProps) {
  // Service-specific icon mapping
  const serviceIcons = {
    'performance-marketing': Target,
    'search-intelligence': Search,
    'conversion-optimization': RefreshCw,
    'creative-science': Sparkles,
    'web-experiences': Layers,
  };

  const IconComponent = serviceIcons[activeService.id as keyof typeof serviceIcons] || Zap;

  return (
    <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] flex items-center justify-center p-6 rounded-2xl bg-cream/40 border border-border-subtle overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute w-48 h-48 rounded-full bg-coral/10 blur-[80px]" />
      <div className="absolute w-48 h-48 rounded-full bg-gold/15 blur-[90px]" />

      {/* Grid Lines Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1b133c08_1px,transparent_1px),linear-gradient(to_bottom,#1b133c08_1px,transparent_1px)] bg-[size:2rem_2rem]" />

      <div className="relative z-10 w-full space-y-6 text-center">
        {/* Active Node Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
          <span className="font-mono text-xs font-bold text-coral">
            NODE {activeService.number}
          </span>
          <span className="text-txt-muted text-xs font-mono">•</span>
          <span className="font-mono text-xs uppercase tracking-wider text-txt-secondary">
            {activeService.kicker}
          </span>
        </div>

        {/* Central Connected Core Box */}
        <div className="mx-auto max-w-sm p-6 rounded-xl bg-white border border-border-active shadow-editorial space-y-3 transition-all duration-300">
          <div className="h-12 w-12 rounded-lg bg-coral/10 border border-coral/30 flex items-center justify-center mx-auto text-coral">
            <IconComponent className="h-6 w-6" />
          </div>

          <h4 className="font-display font-normal text-2xl text-plum">
            {activeService.title}
          </h4>

          <p className="text-xs text-txt-secondary leading-relaxed">
            {activeService.description}
          </p>

          <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-coral font-medium">
            <span>GROWTH SYSTEM FEED</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Dynamic Connected Node Indicators */}
        <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-txt-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-semantic-success" />
          <span>CONNECTED TO SHARED DATA ENGINE</span>
        </div>
      </div>
    </div>
  );
}
