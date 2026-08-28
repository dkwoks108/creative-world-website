'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, Target, Video, Share2, Code, MapPin, BarChart, Sparkles, Layers, ChevronRight } from 'lucide-react';
import { servicesData } from '@/data/services';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWButton } from '@/components/ui/CWButton';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWCard } from '@/components/ui/CWCard';

export function InteractiveServicePanel() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(servicesData[0].id);
  const activeService = servicesData.find(s => s.id === selectedServiceId) || servicesData[0];

  const serviceIcons: Record<string, any> = {
    'website-development': Code,
    'seo': Search,
    'google-ads': Target,
    'meta-ads': Target,
    'performance-marketing': BarChart,
    'social-media-marketing': Share2,
    'reels-video-production': Video,
    'local-seo-google-maps': MapPin,
    'cro-landing-pages': Layers,
  };

  return (
    <section className="py-24 bg-[#FAFBFF] text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-slate-200 pb-10">
          <div className="lg:col-span-8 space-y-4">
            <RevealOnScroll variant="fade-up">
              <CWBadge variant="cyan">
                <Sparkles size={13} />
                <span>Interactive Capabilities Workspace</span>
              </CWBadge>
            </RevealOnScroll>

            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
              Capabilities engineered for <br />
              <span className="text-cw-gradient">predictable commercial growth.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 text-sm text-slate-600 font-light">
            <p>
              Select a core capability module below to inspect system architecture, key deliverables, and commercial benchmarks.
            </p>
          </div>
        </div>

        {/* Floating Service Pill Tabs */}
        <div className="flex flex-wrap gap-2.5">
          {servicesData.map((svc) => {
            const Icon = serviceIcons[svc.id] || Layers;
            const isSelected = svc.id === selectedServiceId;
            return (
              <button
                key={svc.id}
                onClick={() => setSelectedServiceId(svc.id)}
                className={`px-5 py-3 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2.5 border ${
                  isSelected 
                    ? 'bg-cw-gradient text-white border-transparent shadow-cw-glow scale-[1.02]' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <Icon size={15} className={isSelected ? 'text-white' : 'text-slate-500'} />
                <span>{svc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Central Active Service Panel */}
        <RevealOnScroll key={selectedServiceId} variant="fade-up">
          <div className="cw-light-glass-card rounded-3xl p-8 sm:p-12 border border-slate-200 bg-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Details & Deliverables */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CWBadge variant="cyan">
                      <span>{activeService.title}</span>
                    </CWBadge>
                    <span className="text-xs font-mono text-slate-500">
                      BENCHMARK: {activeService.outcomeStatement}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
                    {activeService.title}
                  </h3>

                  <p className="text-slate-600 text-base leading-relaxed font-light">
                    {activeService.fullDescription}
                  </p>
                </div>

                {/* Key Deliverables Grid */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h4 className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Core Capability Deliverables:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.deliverables.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#1769FF]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dark Action Card */}
              <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-950 border border-white/10 text-white space-y-8 shadow-2xl">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <div className="font-mono text-xs text-[#00CFFF] font-semibold uppercase">
                    PRIMARY OUTCOME BENCHMARK
                  </div>
                  <div className="font-display font-bold text-2xl text-white">
                    {activeService.outcomeStatement}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-display font-bold text-xl text-white">Strategic Advantage</h4>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    {activeService.keyBenefits[0] || 'Engineered with transparent reporting, conversion-focused strategy, and dedicated account management in Jaipur.'}
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <Link href={`/services/${activeService.slug}`}>
                    <CWButton variant="gradient" size="md" fullWidth>
                      <span>Explore {activeService.title}</span>
                      <ArrowUpRight size={16} />
                    </CWButton>
                  </Link>

                  <Link href="/contact" className="block text-center font-mono text-xs text-slate-400 hover:text-white transition-colors">
                    Request Strategy Consultation →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
