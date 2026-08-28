'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Zap, Rocket, Crown, ShieldCheck } from 'lucide-react';
import { packagesData } from '@/data/packages';
import { PackageTier } from '@/types';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';

export function PackageDecisionMatrix() {
  const [activeStage, setActiveStage] = useState<'START' | 'GROW' | 'SCALE'>('GROW');

  const stageMap: Record<'START' | 'GROW' | 'SCALE', string> = {
    START: 'starter',
    GROW: 'growth',
    SCALE: 'dominance',
  };

  const currentPackage: PackageTier = packagesData.find(pkg => pkg.id === stageMap[activeStage]) || packagesData[1];

  return (
    <section className="py-24 bg-[#07090E] text-slate-100 border-b border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#1769FF]/10 via-[#673BFF]/10 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-10">
          <div className="lg:col-span-8 space-y-4">
            <RevealOnScroll variant="fade-up">
              <CWBadge variant="cyan">
                <Zap size={14} />
                <span>Engagement Decision Matrix</span>
              </CWBadge>
            </RevealOnScroll>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-tight text-white">
              Select your commercial <br />
              <span className="text-cw-gradient">growth stage.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 font-mono text-xs text-slate-400 space-y-2 uppercase tracking-wider">
            <p className="text-[#00CFFF] font-semibold">
              ● DECISION ENGINE: MATCH SCOPE TO GOALS
            </p>
            <p className="text-slate-300 font-sans normal-case text-sm">
              Choose your current business stage to inspect the optimal package scope.
            </p>
          </div>
        </div>

        {/* 3 Growth Stage Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { stage: 'START', label: 'STAGE 01 // START', desc: 'Establishing Organic & Search Presence', icon: Rocket },
            { stage: 'GROW', label: 'STAGE 02 // GROW', desc: 'Multi-Channel Acquisition & Reels', icon: Zap },
            { stage: 'SCALE', label: 'STAGE 03 // SCALE', desc: 'Full-Funnel Dominance & Custom Next.js', icon: Crown },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeStage === item.stage;
            return (
              <button
                key={item.stage}
                onClick={() => setActiveStage(item.stage as any)}
                className={`p-6 rounded-2xl text-left transition-all flex flex-col justify-between space-y-4 ${
                  isSelected 
                    ? 'border-2 border-[#00CFFF]/50 bg-slate-900/90 text-white shadow-cw-glow' 
                    : 'border border-white/10 bg-slate-900/40 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs font-semibold">
                  <span className={isSelected ? 'text-[#00CFFF]' : 'text-slate-400'}>{item.label}</span>
                  <Icon size={20} className={isSelected ? 'text-[#00CFFF]' : 'text-slate-400'} />
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-white">{item.stage} STAGE</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed pt-1">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Package Scope Card */}
        <RevealOnScroll variant="fade-up">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-slate-900/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Scope Info */}
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#00CFFF] font-mono text-xs font-semibold tracking-wider">
                  <span>RECOMMENDED MODEL // {currentPackage.name.toUpperCase()}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
                    {currentPackage.name}
                  </h3>
                  <p className="font-display font-semibold text-lg text-[#00CFFF]">
                    {currentPackage.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed font-light pt-1">
                    {currentPackage.idealFor}
                  </p>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                    PACKAGE DELIVERABLES & INCLUSIONS:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentPackage.inclusions.map((feat: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 p-3 rounded-xl border border-white/10 bg-slate-950/60">
                        <Check size={14} className="text-[#00CFFF] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 font-mono text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#00CFFF]" />
                <span>Transparent Scope & Monthly Commercial Deliverables</span>
              </div>
            </div>

            {/* Right Pricing & Action Card */}
            <div className="lg:col-span-5 p-8 rounded-2xl border border-white/15 bg-slate-950/80 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider border-b border-white/10 pb-3">
                  INVESTMENT & SCOPE
                </div>

                <div className="space-y-1">
                  <div className="font-display font-extrabold text-4xl text-white">
                    {currentPackage.price}
                  </div>
                  <div className="font-mono text-xs text-slate-400 uppercase">
                    SCOPE BASIS: {currentPackage.period}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">TARGET BUSINESS TYPE:</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {currentPackage.idealFor}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/growth-audit" className="block">
                  <CWButton variant="gradient" size="md" className="w-full justify-center">
                    <span>RESERVE {currentPackage.name.toUpperCase()} SCOPE</span>
                    <ArrowUpRight size={16} />
                  </CWButton>
                </Link>

                <Link href="/packages" className="block text-center font-mono text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
                  COMPARE ALL PACKAGES SIDE-BY-SIDE →
                </Link>
              </div>
            </div>

          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
