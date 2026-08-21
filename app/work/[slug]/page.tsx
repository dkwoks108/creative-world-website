import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { caseStudiesData } from '@/data/case-studies';
import { CaseStudyVisualPlaceholder } from '@/components/ui/CaseStudyVisualPlaceholder';
import { CaseStudyResultBadge } from '@/components/ui/CaseStudyResultBadge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
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
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <Navbar />

        <main>
          {/* 1. EDITORIAL HERO SECTION */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black hover:underline underline-offset-4 font-bold"
              >
                <ArrowLeft size={14} />
                <span>BACK TO GROWTH PLAYBOOKS</span>
              </Link>

              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold pt-2">
                <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
                <span>SECTOR PLAYBOOK — {study.industryPlaceholder}</span>
              </div>

              <h1 className="font-serif font-bold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-none text-black my-2">
                {study.title}<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-2" />

              <p className="font-serif text-xl sm:text-2xl leading-relaxed text-black tracking-tight font-normal max-w-3xl">
                {study.shortDescription}
              </p>
            </div>
          </MonochromeSection>

          {/* 2. MEDIA / VISUAL SECTION */}
          <div className="border-b-4 border-black bg-neutral-100 p-6 sm:p-12">
            <div className="max-w-6xl mx-auto relative h-72 sm:h-[450px] w-full border-4 border-black bg-white overflow-hidden">
              {study.image ? (
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <CaseStudyVisualPlaceholder
                  clientName={study.clientPlaceholderName}
                  industry={study.industryPlaceholder}
                />
              )}
            </div>
          </div>

          {/* 3. METRICS CALLOUT */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="p-8 border-4 border-black bg-white space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-4 gap-2">
                <span className="font-mono text-xs text-black uppercase tracking-widest font-bold">
                  STRATEGIC PLAYBOOK METRICS & TARGETS
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-neutral-600 font-bold">
                  <ShieldCheck size={16} />
                  <span>CONCEPTUAL GROWTH BLUEPRINT</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.metrics.map((metric, idx) => (
                  <CaseStudyResultBadge key={idx} metric={metric} />
                ))}
              </div>
            </div>
          </MonochromeSection>

          {/* 4. STRUCTURED ESSAY STORY BREAKDOWN */}
          <MonochromeSection divider="thick" texture="lines">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Section 01: The Challenge */}
              <div className="space-y-3 border-t-2 border-black pt-8">
                <span className="font-mono text-xs text-black uppercase tracking-widest block font-bold">
                  01 — THE CHALLENGE
                </span>
                <h2 className="font-serif font-bold text-3xl text-black uppercase">
                  Market Context & Friction
                </h2>
                <p className="font-serifBody text-base sm:text-lg text-neutral-800 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* Section 02: The Strategy */}
              <div className="space-y-3 border-t-2 border-black pt-8">
                <span className="font-mono text-xs text-black uppercase tracking-widest block font-bold">
                  02 — THE STRATEGY
                </span>
                <h2 className="font-serif font-bold text-3xl text-black uppercase">
                  Systemic Growth Architecture
                </h2>
                <p className="font-serifBody text-base sm:text-lg text-neutral-800 leading-relaxed">
                  {study.strategy}
                </p>
              </div>

              {/* Section 03: The Execution */}
              <div className="space-y-4 border-t-2 border-black pt-8">
                <span className="font-mono text-xs text-black uppercase tracking-widest block font-bold">
                  03 — THE EXECUTION
                </span>
                <h2 className="font-serif font-bold text-3xl text-black uppercase">
                  Technical Implementation Steps
                </h2>
                <ul className="space-y-3">
                  {study.execution.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-3 p-4 border-2 border-black bg-white text-base text-black">
                      <Check size={18} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 04: Key Takeaway */}
              <div className="space-y-3 border-t-2 border-black pt-8">
                <span className="font-mono text-xs text-black uppercase tracking-widest block font-bold">
                  04 — STRATEGIC TAKEAWAY
                </span>
                <div className="p-8 border-4 border-black bg-neutral-100">
                  <p className="font-serif text-xl text-black font-normal italic leading-relaxed">
                    &ldquo;{study.takeaway}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 5. INVERTED BOTTOM CTA */}
          <MonochromeSection inverted divider="none" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                CUSTOM ROADMAP
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none uppercase">
                Ready to Implement This Growth Playbook?
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Request a free growth audit to see how this strategy applies to your specific Jaipur business.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    Request Free Growth Audit
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

