import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { PackageCard } from '@/components/ui/PackageCard';
import { packagesData } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Growth Packages & Custom Quotes | Surnax Technologies',
  description: 'Structured growth packages and custom retainers for web engineering, video production, performance ads, and SEO at Surnax Technologies.',
  openGraph: {
    title: 'Growth Packages & Retainers | Surnax Technologies',
    description: 'Bespoke retainer structures and transparent project pricing tailored to your business scale and technical goals.',
  },
};

export default function PackagesPage() {
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
                <span>GROWTH PACKAGES & PRICING</span>
              </div>

              <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                COMMERCIAL<br />
                GROWTH TIERS<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal">
                    Predictable deliverables, transparent scope, and custom quotes built around your business goals in Jaipur and beyond. Select your target scope to begin.
                  </p>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link href="/growth-audit">
                    <MonochromeButton variant="primary" showArrow>
                      Request Custom Quote
                    </MonochromeButton>
                  </Link>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 2. TRANSPARENT PRICING GUARANTEE */}
          <div className="py-4 border-b-2 border-black bg-neutral-100 font-mono text-xs text-black font-bold uppercase tracking-widest px-4 text-center flex items-center justify-center gap-2">
            <ShieldCheck size={16} strokeWidth={2} />
            <span>TRANSPARENT PRICING POLICY: CUSTOM SCOPE PROPOSALS WITH DIRECT AD ACCOUNT OWNERSHIP.</span>
          </div>

          {/* 3. PRICING CARDS GRID */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="space-y-12">
              <span className="font-mono text-xs text-black uppercase tracking-widest block font-bold">
                RETAINER & PROJECT PACKAGES
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {packagesData.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </div>
          </MonochromeSection>

          {/* 4. COMMERCIAL FAQS */}
          <MonochromeSection divider="thick" texture="lines">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="space-y-3 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white mx-auto">
                  <HelpCircle size={14} />
                  <span>COMMERCIAL & SCOPE FAQS</span>
                </div>
                <h2 className="font-serif font-bold text-4xl text-black uppercase">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-6">
                <div className="p-6 border-2 border-black bg-white space-y-2">
                  <h3 className="font-serif font-bold text-xl text-black uppercase">
                    How is ad spend handled for Google Ads & Meta Ads?
                  </h3>
                  <p className="font-serifBody text-base text-neutral-800 leading-relaxed">
                    Ad budget is paid directly to Google or Meta via your business ad account. Surnax Technologies manages the strategy, targeting, creative assets, video editing, copywriting, and bid optimization transparently.
                  </p>
                </div>

                <div className="p-6 border-2 border-black bg-white space-y-2">
                  <h3 className="font-serif font-bold text-xl text-black uppercase">
                    Are there any hidden setup fees?
                  </h3>
                  <p className="font-serifBody text-base text-neutral-800 leading-relaxed">
                    No. All setup fees, initial audits, and tracking configuration are clearly outlined in your initial package agreement before work begins.
                  </p>
                </div>

                <div className="p-6 border-2 border-black bg-white space-y-2">
                  <h3 className="font-serif font-bold text-xl text-black uppercase">
                    Can we request custom deliverables outside standard packages?
                  </h3>
                  <p className="font-serifBody text-base text-neutral-800 leading-relaxed">
                    Yes. We build custom package scopes for multi-location businesses, enterprise real estate projects, and specialized e-commerce brands.
                  </p>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 5. INVERTED BOTTOM CTA */}
          <MonochromeSection inverted divider="none" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                RECOMMENDED TIER
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none uppercase">
                Unsure Which Tier Fits Your Budget?
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Request a free growth audit. We will evaluate your business stage and recommend the exact package tier suited for your growth targets.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    Get Recommended Package
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

