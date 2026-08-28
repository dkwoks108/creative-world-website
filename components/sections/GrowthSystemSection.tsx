'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sparkles, Eye, Target, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWButton } from '@/components/ui/CWButton';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWCard } from '@/components/ui/CWCard';

const systemStages = [
  {
    step: '01',
    name: 'Attention',
    label: 'High-Hook Content',
    icon: Eye,
    title: 'Capturing Market Attention',
    desc: 'Deploying high-production Meta reels, YouTube shorts, and targeted Google search campaigns to hook ready-to-buy audiences.',
    deliverables: ['Reels Scripting & Video Production', 'High-Intent Google Search Ads', 'Meta Performance Campaigns'],
  },
  {
    step: '02',
    name: 'Interest',
    label: 'Search Authority',
    icon: Target,
    title: 'Building Search Dominance',
    desc: 'Dominating organic search results and Google Maps Pack for local Jaipur keywords so prospects find you first.',
    deliverables: ['Local Maps Pack Optimization', 'High-E-E-A-T Technical SEO', 'Keyword Dominance Architecture'],
  },
  {
    step: '03',
    name: 'Trust',
    label: 'Brand & Proof',
    icon: ShieldCheck,
    title: 'Establishing Commercial Trust',
    desc: 'Showcasing verified case studies, video testimonials, and authoritative brand storytelling to eliminate sales resistance.',
    deliverables: ['Verified Case Study Dossiers', 'Video Testimonial Production', 'High-Conversion Landing Pages'],
  },
  {
    step: '04',
    name: 'Action',
    label: 'Sub-2s Web App',
    icon: Zap,
    title: 'Instant Lead Conversion',
    desc: 'Routing traffic to custom Next.js web applications with sub-2s page loads and frictionless WhatsApp & call triggers.',
    deliverables: ['Custom Next.js App Router', 'Frictionless Diagnostic Intake', 'Direct WhatsApp Routing'],
  },
  {
    step: '05',
    name: 'Growth',
    label: 'Scale & Attribution',
    icon: TrendingUp,
    title: 'Closed-Loop Scaling',
    desc: 'Measuring CPL and customer acquisition cost across channels to systematically scale winning campaigns.',
    deliverables: ['Closed-Loop CRM Attribution', 'Weekly Conversion Audits', 'Channel Expansion Playbook'],
  },
];

export function GrowthSystemSection() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStage = systemStages[activeStep];
  const IconComponent = currentStage.icon;

  return (
    <section className="py-24 bg-[#07090E] text-slate-100 relative overflow-hidden cw-ambient-glow border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <RevealOnScroll variant="fade-up">
            <CWBadge variant="magenta">
              <Sparkles size={13} />
              <span>Interactive Growth System</span>
            </CWBadge>
          </RevealOnScroll>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            The 5-stage framework for <br />
            <span className="text-cw-gradient">predictable customer acquisition.</span>
          </h2>
          <p className="text-slate-300 text-base font-light">
            Click through each stage of our connected growth system to explore deliverables.
          </p>
        </div>

        {/* 5 Node Interactive Stage Switcher */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-2 rounded-3xl bg-slate-900/90 border border-white/15 backdrop-blur-xl">
          {systemStages.map((stage, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl transition-all duration-300 text-left space-y-1 relative ${
                  isActive
                    ? 'bg-cw-gradient text-white shadow-cw-glow scale-[1.02]'
                    : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="font-mono text-xs font-bold opacity-80">{stage.step}</div>
                <div className="font-display font-bold text-sm sm:text-base">{stage.name}</div>
                <div className="text-[11px] opacity-90 truncate font-light">{stage.label}</div>
              </button>
            );
          })}
        </div>

        {/* Stage Active Workspace Panel */}
        <RevealOnScroll key={activeStep} variant="fade-up">
          <div className="cw-glass-card rounded-3xl p-8 sm:p-12 border border-white/15 bg-slate-900/80 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Content */}
            <div className="space-y-6 lg:max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cw-gradient flex items-center justify-center text-white shadow-cw-glow">
                  <IconComponent size={24} />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-wider font-semibold">
                    STAGE {currentStage.step} — {currentStage.name.toUpperCase()}
                  </span>
                  <h3 className="font-display font-bold text-3xl text-white">
                    {currentStage.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-base leading-relaxed font-light">
                {currentStage.desc}
              </p>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                  Core Stage Deliverables:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStage.deliverables.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00CFFF]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="w-full lg:w-80 shrink-0 p-8 rounded-3xl bg-slate-950/90 border border-white/10 text-center space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs text-[#D900FF] font-semibold uppercase">SYSTEM STAGE {currentStage.step}</div>
                <h4 className="font-display font-bold text-xl text-white">Deploy Stage {currentStage.name}</h4>
                <p className="text-xs text-slate-400 font-light">Integrate this stage into your Jaipur marketing pipeline.</p>
              </div>

              <Link href="/growth-audit" className="block w-full">
                <CWButton variant="gradient" size="md" fullWidth>
                  <span>Audit Stage {currentStage.step}</span>
                  <ArrowUpRight size={16} />
                </CWButton>
              </Link>
            </div>

          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
