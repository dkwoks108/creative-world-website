import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Layers, Shield, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Editorial Showcase | Creativee World Design System',
  description: 'A stark, authoritative, editorial visual experience built with Midnight Canvas, Electric Cyan, and dark glass architecture.',
};

export default function MonochromeShowcasePage() {
  return (
    <main className="min-h-screen bg-[#07090E] text-[#F5F7FA] font-sans selection:bg-[#00CFFF] selection:text-[#050608]">
      {/* Editorial Top Bar / Navigation */}
      <header className="sticky top-0 z-50 bg-[#07090E]/80 border-b border-white/10 backdrop-blur-xl py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest font-bold text-[#A2A8B4]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00CFFF] inline-block animate-pulse" />
          <span className="text-white">CREATIVEE EDITORIAL</span>
          <span className="text-slate-500">/ SYSTEM SHOWCASE</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-medium text-slate-400">
          <a href="#philosophy" className="hover:text-[#00CFFF] transition-colors">Philosophy</a>
          <a href="#editorial" className="hover:text-[#00CFFF] transition-colors">Editorial</a>
          <a href="#gallery" className="hover:text-[#00CFFF] transition-colors">Gallery</a>
          <a href="#pricing" className="hover:text-[#00CFFF] transition-colors">Monograph</a>
        </nav>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/15 bg-slate-900/60 text-xs font-mono text-white hover:border-[#00CFFF]/50 hover:text-[#00CFFF] transition-all"
        >
          <span>← Main Site</span>
        </Link>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative py-20 md:py-32 border-b border-white/10 bg-[#050608] overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00CFFF]/10 blur-[140px] rounded-full" />
        <Container variant="wide" className="relative z-10 space-y-8">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#00CFFF]">
            <span className="w-2 h-2 rounded-full bg-[#00CFFF]" />
            <span>EDITORIAL SHOWCASE — DESIGN AS DISCIPLINE</span>
          </div>

          <h1 className="font-sans font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-white my-4">
            REDUCTION<br />
            TO ESSENCE<span className="text-[#00CFFF]">.</span>
          </h1>

          <div className="w-full h-px bg-white/10 my-4" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-slate-300 tracking-tight font-normal">
                Minimalist Dark Glass strips design down to its most fundamental elements: obsidian canvas, precise cyan light, and authoritative typography. Every decision stands on its own merit.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end gap-4">
              <Link
                href="/growth-audit"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#00CFFF] text-[#050608] font-bold text-xs uppercase tracking-wider hover:bg-[#33d6ff] transition-all shadow-[0_0_20px_rgba(0,207,255,0.25)]"
              >
                <span>Start Audit</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-[#07090E] text-white relative py-16 md:py-24 border-b border-white/10">
        <Container variant="wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0 md:pl-0 space-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Contrast Ratio</p>
              <p className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-[#00CFFF]">21:1</p>
              <p className="font-mono text-xs text-slate-400">WCAG AAA Certified</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-8 space-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Border Radius</p>
              <p className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-white">24<span className="text-sm font-mono font-normal text-slate-400">px</span></p>
              <p className="font-mono text-xs text-slate-400">Pill & Glass Precision</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-8 space-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Theme Base</p>
              <p className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-[#00CFFF]">#07090E</p>
              <p className="font-mono text-xs text-slate-400">Midnight Canvas</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-8 space-y-1">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Accent Token</p>
              <p className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-white">#00CFFF</p>
              <p className="font-mono text-xs text-slate-400">Electric Cyan</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. EDITORIAL ARTICLE SECTION */}
      <section id="editorial" className="py-20 border-b border-white/10">
        <Container variant="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#00CFFF] font-bold block">01 / ARCHITECTURE</span>
              <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tight leading-none text-white uppercase">
                The Discipline of Light
              </h2>
              <div className="w-12 h-1 bg-[#00CFFF]" />
              <p className="text-base text-slate-400 leading-relaxed">
                In a digital ecosystem saturated with flat noise, refined dark glass architecture and vibrant cyan accents become an authoritative statement.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-4">
                <p className="text-lg md:text-xl leading-relaxed text-slate-200">
                  Dark glass typography demands unyielding rigor. Scale, contrast, tracking, and negative space become the instruments of hierarchy. The page is a live canvas illuminated by subtle glows and electric signals.
                </p>
                <div className="p-4 rounded-xl border border-[#00CFFF]/30 bg-[#00CFFF]/5 text-xs font-mono uppercase tracking-wider text-[#00CFFF]">
                  KEY RULE: Midnight Canvas + Electric Cyan + Dark Glass. Zero legacy serif fonts.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. FEATURE CARDS GRID */}
      <section id="philosophy" className="py-20 border-b border-white/10">
        <Container variant="wide">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#00CFFF] font-bold block mb-2">02 / CORE PILLARS</span>
            <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-tight uppercase text-white">
              Design Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#11151C] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00CFFF] transition-colors">
                <Layers size={20} className="text-[#00CFFF]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 block mb-2">Pillar 01</span>
              <h3 className="font-bold text-2xl mb-4 tracking-tight uppercase text-white group-hover:text-[#00CFFF] transition-colors">Dark Glass Layers</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Multi-layered depth created through backdrop blur, subtle hairlines, and electric cyan glows instead of harsh flat boxes.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#11151C] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00CFFF] transition-colors">
                <Shield size={20} className="text-[#00CFFF]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 block mb-2">Pillar 02</span>
              <h3 className="font-bold text-2xl mb-4 tracking-tight uppercase text-white group-hover:text-[#00CFFF] transition-colors">Pill & Radius Precision</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Consistent rounded-full pills for action triggers and rounded-2xl cards for high-density information layout.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#11151C] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00CFFF] transition-colors">
                <Sparkles size={20} className="text-[#00CFFF]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 block mb-2">Pillar 03</span>
              <h3 className="font-bold text-2xl mb-4 tracking-tight uppercase text-white group-hover:text-[#00CFFF] transition-colors">Fluid Interactions</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Smooth transitions with electric cyan hover highlights for maximum tactile feedback and user engagement.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050608] border-t border-white/10 py-12 px-6 md:px-12">
        <Container variant="wide" className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-3 font-bold text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00CFFF] inline-block" />
            <span>CREATIVEE WORLD © 2026</span>
          </div>
          <div>EDITORIAL DARK GLASS SYSTEM</div>
          <Link href="/" className="hover:text-[#00CFFF] transition-colors text-white font-bold">
            Back to Homepage →
          </Link>
        </Container>
      </footer>
    </main>
  );
}

