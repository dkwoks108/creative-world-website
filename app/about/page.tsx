import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Target, Zap } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { aboutData } from '@/data/about';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Surnax Technologies | Web Engineering & Growth Studio',
  description: 'Surnax Technologies is a result-driven digital growth and web engineering studio focused on connected search visibility, performance marketing, video production, and web conversion.',
  openGraph: {
    title: 'About Surnax Technologies | Web & Digital Growth Partner',
    description: 'Discover Surnax Technologies mission, growth philosophy, and connected digital marketing systems.',
  },
};

export default function AboutPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <Navbar />

        <main>
          {/* 1. EDITORIAL HERO SECTION */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
                <span>AGENCY OVERVIEW & PHILOSOPHY</span>
              </div>

              <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                CONNECTED DIGITAL<br />
                GROWTH STUDIO<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal">
                    {aboutData.tagline}
                  </p>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link href="/growth-audit">
                    <MonochromeButton variant="primary" showArrow>
                      Request Growth Consultation
                    </MonochromeButton>
                  </Link>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 2. MISSION & VISION SECTION */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Mission Card */}
              <div className="p-8 border-4 border-black bg-white space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-black font-bold uppercase tracking-widest">
                    <Target size={16} />
                    <span>OUR AGENCY MISSION</span>
                  </div>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase">
                    Performance Over Vanity Metrics
                  </h2>
                  <p className="font-serifBody text-base text-neutral-800 leading-relaxed font-normal">
                    {aboutData.mission}
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="p-8 border-4 border-black bg-white space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-black font-bold uppercase tracking-widest">
                    <Zap size={16} />
                    <span>OUR VISION</span>
                  </div>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase">
                    Rajasthan&apos;s Growth Benchmark
                  </h2>
                  <p className="font-serifBody text-base text-neutral-800 leading-relaxed font-normal">
                    {aboutData.vision}
                  </p>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 3. GROWTH PHILOSOPHY & PRINCIPLES */}
          <MonochromeSection divider="thick" texture="lines">
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6 text-left">
                  <span className="font-mono text-xs uppercase tracking-widest text-black font-bold block">
                    OUR PHILOSOPHY
                  </span>
                  <h2 className="font-serif font-bold text-4xl sm:text-6xl text-black uppercase leading-tight">
                    Why Disconnected Marketing Wastes Ad Budget.
                  </h2>
                  <p className="font-serifBody text-base sm:text-xl text-neutral-800 leading-relaxed font-normal">
                    {aboutData.philosophy}
                  </p>
                </div>
                <div className="lg:col-span-5 relative h-72 sm:h-96 border-4 border-black bg-white overflow-hidden">
                  <Image
                    src="/images/about/surnax-philosophy-portrait.jpg"
                    alt="Surnax Technologies Leadership - Growth Philosophy"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-top hover:scale-105 transition-all duration-300"
                    priority
                  />
                </div>
              </div>

              {/* Core Principles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {aboutData.corePrinciples.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-6 border-2 border-black bg-white space-y-3 flex flex-col justify-between hover:bg-neutral-50 transition-colors"
                  >
                    <div className="space-y-2">
                      <span className="font-mono text-xs text-black border border-black px-2 py-0.5 font-bold inline-block">0{idx + 1}</span>
                      <h3 className="font-serif font-bold text-2xl text-black uppercase">
                        {principle.title}
                      </h3>
                      <p className="font-serifBody text-xs text-neutral-800 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MonochromeSection>

          {/* 4. INVERTED BOTTOM CTA */}
          <MonochromeSection inverted divider="none" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">
                <ShieldCheck size={16} />
                <span>100% HONEST PROOF COMMITMENT</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none uppercase">
                Ready for Real Business Outcomes?
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                We believe trust is earned through verifiable business outcomes. Request a free growth audit to evaluate your current channel performance.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    {siteConfig.primaryCTA}
                  </MonochromeButton>
                </Link>
              </div>
            </div>
          </MonochromeSection>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}

