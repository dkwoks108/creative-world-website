import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';
import { caseStudiesData } from '@/data/case-studies';
import { CaseStudyVisualPlaceholder } from '@/components/ui/CaseStudyVisualPlaceholder';
import { CaseStudyResultBadge } from '@/components/ui/CaseStudyResultBadge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';
import { siteConfig } from '@/data/site';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = caseStudiesData.find((cs) => cs.slug === params.slug);

  if (!study) {
    return {
      title: `Growth Playbook Not Found | ${siteConfig.brandName}`,
    };
  }

  return {
    title: `${study.title} | ${siteConfig.brandName} Growth Playbook`,
    description: study.shortDescription,
    openGraph: {
      title: `${study.title} | ${siteConfig.brandName}`,
      description: study.shortDescription,
    },
  };
}

export default function CaseStudyDetailPage({ params }: Props) {
  const study = caseStudiesData.find((cs) => cs.slug === params.slug);

  if (!study) {
    notFound();
  }

  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        <Navbar />

        <main className="pt-32">
          {/* Ambient Spectrum Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

          {/* 1. HERO SECTION */}
          <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00CFFF] hover:text-white transition-colors font-semibold"
            >
              <ArrowLeft size={14} />
              <span>Back to Growth Playbooks</span>
            </Link>

            <div className="space-y-6 max-w-4xl">
              <CWBadge variant="cyan">
                <Sparkles size={13} />
                <span>Sector Playbook — {study.industryPlaceholder}</span>
              </CWBadge>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white">
                {study.title}
              </h1>

              <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
                {study.shortDescription}
              </p>
            </div>
          </section>

          {/* 2. MEDIA / VISUAL SECTION */}
          <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pb-16">
            <div className="relative h-72 sm:h-[450px] w-full rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
              {study.image ? (
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover object-center hover:scale-105 transition-all duration-500"
                />
              ) : (
                <CaseStudyVisualPlaceholder
                  clientName={study.clientPlaceholderName}
                  industry={study.industryPlaceholder}
                />
              )}
            </div>
          </section>

          {/* 3. METRICS CALLOUT */}
          <section className="relative z-10 py-16 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/15 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold">
                  ● STRATEGIC PLAYBOOK METRICS & TARGETS
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400 font-medium">
                  <ShieldCheck size={16} className="text-[#00CFFF]" />
                  <span>CONCEPTUAL GROWTH BLUEPRINT</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.metrics.map((metric, idx) => (
                  <CaseStudyResultBadge key={idx} metric={metric} />
                ))}
              </div>
            </div>
          </section>

          {/* 4. STRUCTURED ESSAY STORY BREAKDOWN */}
          <section className="relative z-10 py-24 bg-slate-950/80 border-t border-white/10">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-16">
              {/* Section 01: The Challenge */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest block font-semibold">
                  01 — THE CHALLENGE
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Market Context & Friction
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                  {study.challenge}
                </p>
              </div>

              {/* Section 02: The Strategy */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest block font-semibold">
                  02 — THE STRATEGY
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Systemic Growth Architecture
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                  {study.strategy}
                </p>
              </div>

              {/* Section 03: The Execution */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest block font-semibold">
                  03 — THE EXECUTION
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Technical Implementation Steps
                </h2>
                <ul className="space-y-3">
                  {study.execution.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-sm text-slate-200">
                      <Check size={18} className="text-[#00CFFF] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 04: Key Takeaway */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest block font-semibold">
                  04 — STRATEGIC TAKEAWAY
                </span>
                <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/15">
                  <p className="font-sans text-lg sm:text-xl text-slate-200 font-light italic leading-relaxed">
                    &ldquo;{study.takeaway}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. BOTTOM CTA */}
          <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="rounded-3xl p-10 md:p-16 bg-gradient-to-tr from-[#1769FF]/20 via-[#673BFF]/20 to-[#D900FF]/20 border border-white/20 text-center space-y-6">
              <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold block">
                CUSTOM ROADMAP
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-2xl mx-auto">
                Ready to implement this growth playbook?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-light max-w-xl mx-auto">
                Request a free growth audit to see how this strategy applies to your specific Jaipur business.
              </p>
              <div className="pt-4 flex justify-center">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>Request Free Growth Audit</span>
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
