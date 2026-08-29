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
    <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] flex items-center justify-center p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md overflow-hidden text-white">
      {/* Background Ambient Glow */}
      <div className="absolute w-48 h-48 rounded-full bg-[#1769FF]/15 blur-[80px]" />
      <div className="absolute w-48 h-48 rounded-full bg-[#00CFFF]/15 blur-[90px]" />

      {/* Grid Lines Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem]" />

      <div className="relative z-10 w-full space-y-6 text-center">
        {/* Active Node Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-white/10 shadow-lg">
          <span className="font-mono text-xs font-bold text-[#00CFFF]">
            NODE {activeService.number}
          </span>
          <span className="text-slate-500 text-xs font-mono">•</span>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            {activeService.kicker}
          </span>
        </div>

        {/* Central Connected Core Box */}
        <div className="mx-auto max-w-sm p-6 rounded-xl bg-slate-800/90 border border-[#00CFFF]/30 shadow-2xl space-y-3 transition-all duration-300">
          <div className="h-12 w-12 rounded-lg bg-[#00CFFF]/10 border border-[#00CFFF]/30 flex items-center justify-center mx-auto text-[#00CFFF]">
            <IconComponent className="h-6 w-6" />
          </div>

          <h4 className="font-display font-bold text-2xl text-white">
            {activeService.title}
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed">
            {activeService.description}
          </p>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#00CFFF] font-semibold">
            <span>GROWTH SYSTEM FEED</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Dynamic Connected Node Indicators */}
        <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>CONNECTED TO SHARED DATA ENGINE</span>
        </div>
      </div>
    </div>
  );
}
