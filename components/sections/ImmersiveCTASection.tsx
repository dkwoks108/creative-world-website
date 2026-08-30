'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Mail, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';

export function ImmersiveCTASection() {
  return (
    <section className="py-32 bg-[#07090E] text-slate-100 border-b border-white/10 relative overflow-hidden">
      
      {/* Background Subtle Spectrum Glow & Conversion Signal Visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/15 blur-3xl pointer-events-none rounded-full" />
      
      {/* Ambient Conversion Signal Visual Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src="/visuals/homepage/conversion-signal.webp"
          alt="Growth Signal Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Eyebrow badge */}
        <RevealOnScroll variant="fade-up">
          <CWBadge variant="cyan">
            <Sparkles size={14} />
            <span>Commercial Growth Initiation</span>
          </CWBadge>
        </RevealOnScroll>

        {/* Oversized Kinetic Heading */}
        <div className="space-y-6 max-w-5xl">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
            Your next stage <br />
            <span className="text-cw-gradient">of growth starts here.</span>
          </h2>
          <p className="font-sans text-lg sm:text-xl text-slate-300 max-w-3xl font-light leading-relaxed">
            Stop losing qualified leads to competitors with better search visibility and faster web experiences. Let&apos;s build your custom acquisition engine today.
          </p>
        </div>

        {/* Primary Action Triggers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          <Link href="/growth-audit" className="group block">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-[#00CFFF]/50 text-white space-y-4 hover:shadow-cw-glow transition-all duration-300 h-full flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#00CFFF]">OPTION 01</span>
                <ArrowUpRight size={24} className="text-[#00CFFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-white">Request Growth Audit</h3>
                <p className="text-xs text-slate-300 font-light pt-1">Comprehensive analysis of your organic search, ads, and web pipeline.</p>
              </div>
            </div>
          </Link>

          <Link href="/contact" className="group block">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 text-white space-y-4 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#00CFFF]">OPTION 02</span>
                <MessageSquare size={24} className="text-[#00CFFF] group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-white">Strategy Consultation</h3>
                <p className="text-xs text-slate-300 font-light pt-1">Connect directly with our strategy directors.</p>
              </div>
            </div>
          </Link>

          <Link href="/contact" className="group block">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 text-white space-y-4 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">OPTION 03</span>
                <Mail size={24} className="text-white group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-white">Direct Inquiry Form</h3>
                <p className="text-xs text-slate-300 font-light pt-1">Submit your project details and scope requirements.</p>
              </div>
            </div>
          </Link>

        </div>

        {/* Location & Quick Contact Line */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 font-mono text-xs text-slate-400 uppercase tracking-wider">
          <div>LOCATION: {siteConfig.locationPlaceholder}</div>
          <div>EMAIL: {siteConfig.contactEmailPlaceholder}</div>
          <div>WEB: {siteConfig.websiteUrlPlaceholder}</div>
        </div>

      </div>
    </section>
  );
}
