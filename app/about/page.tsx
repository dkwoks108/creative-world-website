import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Target, Zap, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';
import { aboutData } from '@/data/about';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Creativee World | Digital Growth Agency in Jaipur',
  description: 'Creativee World is a result-driven digital growth agency in Jaipur focused on connected search visibility, performance marketing, brand content, and web conversion.',
  openGraph: {
    title: 'About Creativee World | Digital Growth Partner in Jaipur',
    description: 'Discover Creativee World\'s mission, growth philosophy, and connected digital marketing systems for Jaipur businesses.',
  },
};

export default function AboutPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        <Navbar />

        <main className="pt-32">
          {/* Ambient Spectrum Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

          {/* 1. HERO SECTION */}
          <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="space-y-8">
              <RevealOnScroll variant="fade-up">
                <CWBadge variant="cyan">
                  <Sparkles size={13} />
                  <span>Agency Overview & Philosophy</span>
                </CWBadge>
              </RevealOnScroll>

              <div className="space-y-4 max-w-4xl">
                <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                  Connected digital <br />
                  <span className="text-cw-gradient">growth studio.</span>
                </h1>

                <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed pt-2">
                  {aboutData.tagline}
                </p>
              </div>

              <div className="pt-2">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>Request Growth Consultation</span>
                    <ArrowUpRight size={18} />
                  </CWButton>
                </Link>
              </div>
            </div>
          </section>

          {/* 2. MISSION & VISION SECTION */}
          <section className="relative z-10 py-16 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <RevealOnScroll variant="fade-up">
                <div className="h-full rounded-3xl p-8 bg-slate-900/60 border border-white/10 space-y-6 flex flex-col justify-between hover:border-white/20 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#00CFFF] uppercase tracking-wider font-semibold">
                      <Target size={16} />
                      <span>OUR AGENCY MISSION</span>
                    </div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                      Performance Over Vanity Metrics
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {aboutData.mission}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-up" delay={0.1}>
                <div className="h-full rounded-3xl p-8 bg-slate-900/60 border border-white/10 space-y-6 flex flex-col justify-between hover:border-white/20 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#00CFFF] uppercase tracking-wider font-semibold">
                      <Zap size={16} />
                      <span>OUR VISION</span>
                    </div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                      Rajasthan&apos;s Growth Benchmark
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {aboutData.vision}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* 3. GROWTH PHILOSOPHY & PRINCIPLES */}
          <section className="relative z-10 py-24 bg-slate-950/80 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6 text-left">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#00CFFF] font-semibold block">
                    OUR PHILOSOPHY
                  </span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-tight">
                    Why disconnected marketing wastes your ad budget.
                  </h2>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                    {aboutData.philosophy}
                  </p>
                </div>
                <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about/creative-philosophy-portrait.jpg"
                    alt="Creativee World Leadership - Growth Philosophy"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-top hover:scale-105 transition-all duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Core Principles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {aboutData.corePrinciples.map((principle, idx) => (
                  <RevealOnScroll key={idx} variant="fade-up" delay={idx * 0.1}>
                    <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3 hover:border-white/20 transition-all h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-[#00CFFF] font-bold">
                          0{idx + 1}
                        </div>
                        <h3 className="font-display font-bold text-xl text-white">
                          {principle.title}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          {/* 4. BOTTOM CTA */}
          <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="rounded-3xl p-10 md:p-16 bg-gradient-to-tr from-[#1769FF]/20 via-[#673BFF]/20 to-[#D900FF]/20 border border-white/20 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#00CFFF]">
                <ShieldCheck size={16} />
                <span>100% HONEST PROOF COMMITMENT</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-2xl mx-auto">
                Ready for real business outcomes?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-light max-w-xl mx-auto">
                We believe trust is earned through verifiable business outcomes. Request a free growth audit to evaluate your current channel performance.
              </p>
              <div className="pt-4 flex justify-center">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>{siteConfig.primaryCTA}</span>
                    <ArrowUpRight size={18} />
                  </CWButton>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
