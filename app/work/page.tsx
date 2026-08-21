import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { FeaturedCaseStudy } from '@/components/ui/FeaturedCaseStudy';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { caseStudiesData } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Growth Playbooks & Sector Frameworks | Surnax Technologies',
  description: 'Explore Surnax Technologies strategic digital growth playbooks engineered for Jaipur education, real estate, tech, and retail sectors.',
  openGraph: {
    title: 'Growth Playbooks & Frameworks | Surnax Technologies',
    description: 'Strategic growth execution blueprints demonstrating our approach to Jaipur and national digital acquisition and web engineering.',
  },
};

export default function WorkPage() {
  const featured = caseStudiesData.find((c) => c.featured) || caseStudiesData[0];
  const remaining = caseStudiesData.filter((c) => c.id !== featured.id);

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
                <span>CASE STUDIES & CLIENT WORK</span>
              </div>

              <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                JAIPUR SECTOR<br />
                GROWTH PLAYBOOKS<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal">
                    Until client-verified data is authorized, all work examples are clearly presented as strategic Growth Playbooks—demonstrating our real-world execution methodology for key Jaipur economic sectors.
                  </p>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link href="/growth-audit">
                    <MonochromeButton variant="primary" showArrow>
                      Request Playbook Audit
                    </MonochromeButton>
                  </Link>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 2. HONEST PROOF NOTICE */}
          <div className="py-4 border-b-2 border-black bg-neutral-100 font-mono text-xs text-black font-bold uppercase tracking-widest px-4 text-center flex items-center justify-center gap-2">
            <ShieldCheck size={16} strokeWidth={2} />
            <span>NO FAKE METRICS POLICY: ALL FRAMEWORKS BELOW REPRESENT STRATEGIC CAMPAIGN EXECUTION MODELS.</span>
          </div>

          {/* 3. FEATURED PLAYBOOK SECTION */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="space-y-8">
              <span className="font-mono text-xs text-black uppercase tracking-widest block font-bold">
                FEATURED GROWTH PLAYBOOK
              </span>
              <FeaturedCaseStudy caseStudy={featured} />
            </div>
          </MonochromeSection>

          {/* 4. REMAINING PLAYBOOKS SECTION */}
          <MonochromeSection divider="thick" texture="lines">
            <div className="space-y-12">
              <span className="font-mono text-xs text-black uppercase tracking-widest block font-bold">
                SECTOR FRAMEWORKS
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {remaining.map((study) => (
                  <CaseStudyCard key={study.id} caseStudy={study} />
                ))}
              </div>
            </div>
          </MonochromeSection>

          {/* 5. INVERTED BOTTOM CTA SECTION */}
          <MonochromeSection inverted divider="none" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                CUSTOM ROADMAP
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none uppercase">
                Want a Customized Playbook for Your Business?
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Request a free growth audit. We will analyze your search rankings, current ad channels, and website infrastructure to build a custom growth roadmap.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    Request Custom Growth Audit
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

