import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { IndustryCard } from '@/components/ui/IndustryCard';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { industriesData } from '@/data/industries';

export const metadata: Metadata = {
  title: 'Industry Growth Strategies | Surnax Technologies',
  description: 'Tailored digital growth systems for business sectors: Coaching, Real Estate, Restaurants, Salons & Clinics, Jewelry, Clothing boutiques, and Tech.',
  openGraph: {
    title: 'Industry Digital Marketing Strategies | Surnax Technologies',
    description: 'Explore sector-specific search, video production, paid ads, and web engineering strategies designed for growth-oriented brands.',
  },
};

export default function IndustriesPage() {
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
                <span>SECTOR GROWTH & PLAYBOOKS</span>
              </div>

              <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                SECTOR-SPECIFIC<br />
                GROWTH SYSTEMS<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal">
                    Generic marketing templates fail because every local industry operates with distinct buying cycles, trust barriers, and search behaviors. Explore our specialized digital strategies for key Jaipur sectors.
                  </p>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link href="/growth-audit">
                    <MonochromeButton variant="primary" showArrow>
                      Request Sector Audit
                    </MonochromeButton>
                  </Link>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 2. INDUSTRY CARDS GRID SECTION */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold block mb-2">
                  SECTOR ARCHITECTURE
                </span>
                <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-none">
                  Jaipur Sector Frameworks
                </h2>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-600 max-w-xs font-semibold">
                Hover cards to inspect sector focus and binary interaction states.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industriesData.map((industry) => (
                <IndustryCard key={industry.id} industry={industry} />
              ))}
            </div>
          </MonochromeSection>

          {/* 3. INVERTED BOTTOM CTA SECTION */}
          <MonochromeSection inverted divider="ultra" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                CUSTOM SECTOR ENGAGEMENT
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none">
                Don&apos;t See Your Specific Industry Listed?
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                Our core growth principles—search intent capture, local trust building, high-converting ad funnels, and responsive web engineering—apply across all B2B and consumer sectors in Jaipur.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    Discuss Your Business Sector
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

