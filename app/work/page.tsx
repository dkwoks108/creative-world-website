import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';
import { FeaturedCaseStudy } from '@/components/ui/FeaturedCaseStudy';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { caseStudiesData } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Growth Playbooks & Sector Frameworks | Creativee World Jaipur',
  description: 'Explore Creativee World\'s strategic digital growth playbooks engineered for Jaipur education, real estate, and retail sectors.',
  openGraph: {
    title: 'Growth Playbooks & Frameworks | Creativee World Jaipur',
    description: 'Strategic growth execution blueprints demonstrating our approach to Jaipur digital acquisition and conversion.',
  },
};

export default function WorkPage() {
  const featured = caseStudiesData.find((c) => c.featured) || caseStudiesData[0];
  const remaining = caseStudiesData.filter((c) => c.id !== featured.id);

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
                  <span>Case Studies & Client Work</span>
                </CWBadge>
              </RevealOnScroll>

              <div className="space-y-4 max-w-4xl">
                <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                  Jaipur sector <br />
                  <span className="text-cw-gradient">growth playbooks.</span>
                </h1>

                <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed pt-2">
                  Until client-verified data is authorized, all work examples are clearly presented as strategic Growth Playbooks—demonstrating our real-world execution methodology for key Jaipur economic sectors.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>Request Playbook Audit</span>
                    <ArrowUpRight size={18} />
                  </CWButton>
                </Link>
              </div>
            </div>
          </section>

          {/* 2. HONEST PROOF NOTICE */}
          <section className="relative z-10 py-4 bg-slate-900/60 border-y border-white/10 font-mono text-xs text-slate-300 px-6 text-center flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-[#00CFFF]" />
            <span>NO FAKE METRICS POLICY: ALL FRAMEWORKS BELOW REPRESENT STRATEGIC CAMPAIGN EXECUTION MODELS.</span>
          </section>

          {/* 3. FEATURED PLAYBOOK SECTION */}
          <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold">
                ● FEATURED GROWTH PLAYBOOK
              </span>
            </div>

            <FeaturedCaseStudy caseStudy={featured} />
          </section>

          {/* 4. REMAINING PLAYBOOKS SECTION */}
          <section className="relative z-10 py-24 bg-slate-950/80 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold">
                  ● SECTOR FRAMEWORKS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {remaining.map((study, idx) => (
                  <RevealOnScroll key={study.id} variant="fade-up" delay={idx * 0.1}>
                    <CaseStudyCard caseStudy={study} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          {/* 5. BOTTOM CTA SECTION */}
          <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="rounded-3xl p-10 md:p-16 bg-gradient-to-tr from-[#1769FF]/20 via-[#673BFF]/20 to-[#D900FF]/20 border border-white/20 text-center space-y-6">
              <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold block">
                CUSTOM ROADMAP
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-2xl mx-auto">
                Want a customized playbook for your business?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-light max-w-xl mx-auto">
                Request a free growth audit. We will analyze your search rankings, current ad channels, and website infrastructure to build a custom growth roadmap.
              </p>
              <div className="pt-4 flex justify-center">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>Request Custom Growth Audit</span>
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
