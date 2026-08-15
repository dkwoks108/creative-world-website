import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { caseStudiesData } from '@/data/case-studies';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CaseStudyVisualPlaceholder } from '@/components/ui/CaseStudyVisualPlaceholder';
import { CaseStudyResultBadge } from '@/components/ui/CaseStudyResultBadge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
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
      <div className="relative min-h-screen bg-obsidian text-txt-primary">
        <Navbar />

        <main className="pt-32 pb-24 space-y-16">
          <Container variant="standard">
            {/* Navigation Back Link */}
            <Link
              href="/work"
              className="inline-flex items-center space-x-2 text-xs font-mono text-txt-muted hover:text-signal-cyan transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>BACK TO GROWTH PLAYBOOKS</span>
            </Link>

            {/* Editorial Header */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-surface-primary border border-border-subtle text-signal-cyan">
                  {study.industryPlaceholder}
                </span>
                <span className="font-mono text-xs text-txt-muted">
                  SECTOR: {study.clientPlaceholderName}
                </span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-txt-primary tracking-tight leading-tight">
                {study.title}
              </h1>

              <p className="text-lg text-txt-secondary leading-relaxed max-w-3xl">
                {study.shortDescription}
              </p>
            </div>

            {/* Visual Canvas Container */}
            <div className="my-10 h-[380px] sm:h-[460px] w-full relative rounded-2xl overflow-hidden border border-border-subtle">
              {study.image ? (
                <>
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent pointer-events-none" />
                </>
              ) : (
                <CaseStudyVisualPlaceholder
                  clientName={study.clientPlaceholderName}
                  industry={study.industryPlaceholder}
                />
              )}
            </div>

            {/* Results Callout Banner */}
            <div className="p-8 rounded-2xl bg-surface-primary border border-signal-cyan/40 space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest font-semibold">
                  STRATEGIC PLAYBOOK METRICS & TARGETS
                </span>
                <span className="flex items-center space-x-1.5 text-xs font-mono text-signal-cyan">
                  <ShieldCheck className="h-4 w-4" />
                  <span>CONCEPTUAL GROWTH BLUEPRINT</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.metrics.map((metric, idx) => (
                  <CaseStudyResultBadge key={idx} metric={metric} />
                ))}
              </div>
            </div>

            {/* Structured Editorial Story Breakdown */}
            <div className="space-y-12 pt-8">
              {/* Section 01: The Challenge */}
              <div className="space-y-3 border-t border-border-subtle pt-8">
                <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest block font-semibold">
                  01 — THE CHALLENGE
                </span>
                <h2 className="font-display font-bold text-2xl text-txt-primary">
                  Market Context & Friction
                </h2>
                <p className="text-base text-txt-secondary leading-relaxed max-w-3xl">
                  {study.challenge}
                </p>
              </div>

              {/* Section 02: The Strategy */}
              <div className="space-y-3 border-t border-border-subtle pt-8">
                <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest block font-semibold">
                  02 — THE STRATEGY
                </span>
                <h2 className="font-display font-bold text-2xl text-txt-primary">
                  Systemic Growth Architecture
                </h2>
                <p className="text-base text-txt-secondary leading-relaxed max-w-3xl">
                  {study.strategy}
                </p>
              </div>

              {/* Section 03: The Execution */}
              <div className="space-y-4 border-t border-border-subtle pt-8">
                <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest block font-semibold">
                  03 — THE EXECUTION
                </span>
                <h2 className="font-display font-bold text-2xl text-txt-primary">
                  Technical Implementation Steps
                </h2>
                <ul className="space-y-3 max-w-3xl">
                  {study.execution.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-txt-secondary">
                      <CheckCircle2 className="h-4 w-4 text-signal-cyan shrink-0 mt-1" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 04: Key Takeaway */}
              <div className="space-y-3 border-t border-border-subtle pt-8">
                <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest block font-semibold">
                  04 — STRATEGIC TAKEAWAY
                </span>
                <div className="p-6 rounded-xl bg-surface-primary border border-border-subtle">
                  <p className="text-base text-txt-primary font-medium italic">
                    &ldquo;{study.takeaway}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="pt-12 text-center border-t border-border-subtle mt-16 space-y-6">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-txt-primary">
                Ready to Implement This Growth Playbook?
              </h3>
              <p className="text-sm text-txt-secondary max-w-md mx-auto">
                Request a free growth audit to see how this strategy applies to your specific Jaipur business.
              </p>
              <div>
                <Link href="/growth-audit">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    Request Free Growth Audit
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
