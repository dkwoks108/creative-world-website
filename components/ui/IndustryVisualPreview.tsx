'use client';

import React from 'react';
import { 
  GraduationCap, 
  Megaphone, 
  TrendingUp, 
  Building2, 
  FileCheck, 
  Compass, 
  Video, 
  Stethoscope, 
  Scale, 
  School, 
  Camera, 
  Sparkles, 
  Activity, 
  Dumbbell, 
  Coffee, 
  Smartphone, 
  ShoppingBag, 
  Leaf,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { IndustryCaseStudy } from '@/data/industryCaseStudies';

interface Props {
  concept: IndustryCaseStudy['visualConcept'];
  industryName: string;
  className?: string;
}

export function IndustryVisualPreview({ concept, industryName, className = '' }: Props) {
  const getIcon = () => {
    switch (concept.type) {
      case 'dashboard': return <GraduationCap className="w-5 h-5 text-black" />;
      case 'analytics': return <Megaphone className="w-5 h-5 text-black" />;
      case 'trading': return <TrendingUp className="w-5 h-5 text-black" />;
      case 'booking': return <Building2 className="w-5 h-5 text-black" />;
      case 'document': return <FileCheck className="w-5 h-5 text-black" />;
      case 'itinerary': return <Compass className="w-5 h-5 text-black" />;
      case 'creator': return <Video className="w-5 h-5 text-black" />;
      case 'medical': return <Stethoscope className="w-5 h-5 text-black" />;
      case 'legal': return <Scale className="w-5 h-5 text-black" />;
      case 'campus': return <School className="w-5 h-5 text-black" />;
      case 'portfolio': return <Camera className="w-5 h-5 text-black" />;
      case 'beauty': return <Sparkles className="w-5 h-5 text-black" />;
      case 'rehab': return <Activity className="w-5 h-5 text-black" />;
      case 'fitness': return <Dumbbell className="w-5 h-5 text-black" />;
      case 'cafe': return <Coffee className="w-5 h-5 text-black" />;
      case 'funnel': return <Smartphone className="w-5 h-5 text-black" />;
      case 'storefront': return <ShoppingBag className="w-5 h-5 text-black" />;
      case 'organic': return <Leaf className="w-5 h-5 text-black" />;
      default: return <Zap className="w-5 h-5 text-black" />;
    }
  };

  return (
    <div className={`relative overflow-hidden bg-white border-4 border-black p-5 font-mono text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4 text-[11px] uppercase tracking-wider font-bold">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-black inline-block animate-pulse" />
          <span className="text-black tracking-widest">{industryName}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="px-2 py-0.5 border border-black bg-black text-white font-bold">
            SYS_ONLINE
          </span>
        </div>
      </div>

      {/* Main Interactive Visual Frame */}
      <div className="relative bg-neutral-50 border-2 border-black p-4 space-y-3">
        {/* Title Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white border-2 border-black">
              {getIcon()}
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">SURNAX DIGITAL CORE</span>
              <h4 className="text-xs sm:text-sm font-bold text-black tracking-wide truncate max-w-[220px]">{concept.tagline}</h4>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2 py-1 bg-black text-white text-[9px] font-bold tracking-widest uppercase">
            SPECIFICATION
          </span>
        </div>

        {/* Dynamic Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-white p-2.5 border-2 border-black space-y-1">
            <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">FLOW STATUS</div>
            <div className="text-xs font-bold text-black flex items-center gap-1">
              <CheckCircle2 size={12} className="text-black" />
              <span>ACTIVE</span>
            </div>
          </div>

          <div className="bg-white p-2.5 border-2 border-black space-y-1">
            <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">RESPONSE</div>
            <div className="text-xs font-bold text-black font-mono">&lt; 150ms</div>
          </div>

          <div className="bg-white p-2.5 border-2 border-black space-y-1">
            <div className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider">PIPELINE</div>
            <div className="text-xs font-bold text-black font-mono">100% AUTOMATED</div>
          </div>
        </div>

        {/* Signal Lines */}
        <div className="pt-2 border-t-2 border-black space-y-1.5">
          <div className="flex justify-between text-[9px] text-neutral-600 font-bold">
            <span>SYSTEM MONITORING</span>
            <span className="text-black uppercase">OPTIMIZED</span>
          </div>
          <div className="h-2 w-full bg-neutral-200 border border-black overflow-hidden flex">
            <div className="h-full bg-black w-[65%]" />
            <div className="h-full bg-neutral-400 w-[35%]" />
          </div>
        </div>
      </div>

      {/* Footer System Watermark */}
      <div className="mt-3 flex items-center justify-between text-[9px] text-neutral-600 font-mono font-bold">
        <span className="flex items-center gap-1">
          <ShieldCheck size={12} className="text-black" />
          SURNAX ARCHITECTURE SPEC
        </span>
        <span className="text-black hover:underline transition-colors flex items-center gap-1 uppercase">
          SYSTEM SPECIFIED <ArrowRight size={10} />
        </span>
      </div>
    </div>
  );
}
