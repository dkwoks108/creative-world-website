import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowUpRight, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { FAQSection } from '@/components/ui/FAQSection';
import { getPublishedInsights } from '@/lib/db-content';

export const metadata: Metadata = {
  title: 'Insights & Digital Growth Guides | Creativee World Jaipur',
  description: 'Practical guides and articles on SEO, Local Search, Performance Marketing, Social Media Reels, and Web Conversion for Jaipur business owners.',
  keywords: [
    'digital marketing blog Jaipur',
    'SEO guides Jaipur',
    'performance marketing insights Jaipur',
    'local search tips Jaipur',
    'web development blog Jaipur',
  ],
  openGraph: {
    title: 'Insights & Digital Growth Guides | Creativee World Jaipur',
    description: 'Expert digital marketing articles and growth breakdowns tailored to Jaipur market dynamics.',
    url: 'https://creativeworld.in/insights',
    siteName: 'Creativee World',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'Creativee World Insights' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights & Digital Growth Guides | Creativee World Jaipur',
    description: 'Actionable strategies, local search breakdowns, and performance marketing tactics.',
    images: ['/brand/og-image.png'],
  },
  alternates: {
    canonical: 'https://creativeworld.in/insights',
  },
};

const blogFaqs = [
  {
    question: 'How frequently does Creativee World publish new digital growth insights?',
    answer: 'We publish weekly tactical guides covering Jaipur local SEO trends, Meta/Google ad algorithm updates, Core Web Vitals optimization, and video content production.',
  },
  {
    question: 'Can I request a custom article topic or industry analysis?',
    answer: 'Yes! We frequently cover industry-specific growth breakdowns for Jaipur real estate, higher education, healthcare, and commercial retail.',
  },
];

export default function InsightsPage() {
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
                  <BookOpen size={13} />
                  <span>Digital Insights &amp; Knowledge Hub</span>
                </CWBadge>
              </RevealOnScroll>

              <div className="space-y-4 max-w-4xl">
                <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                  Insights &amp; <br />
                  <span className="text-cw-gradient">digital dispatch.</span>
                </h1>

                <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed pt-2">
                  Actionable strategies, local search breakdowns, and performance marketing tactics written to help Jaipur companies make informed marketing decisions.
                </p>
              </div>
            </div>
          </section>

          {/* 2. ARTICLES GRID */}
          <section className="relative z-10 py-16 max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold">
                ● RECENT DISPATCHES &amp; ARTICLES
              </span>
            </div>

            {/* Fetch and Render Articles */}
            <ArticlesFetcher />
          </section>

          {/* 3. INSIGHTS FAQS WITH JSON-LD SCHEMA */}
          <FAQSection
            badge="INSIGHTS & EDITORIAL FAQ"
            title="Questions About Our Content & Articles"
            description="Clear details on our editorial standards, publishing frequency, and topic requests."
            faqs={blogFaqs}
          />

          {/* 4. BOTTOM CTA */}
          <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="rounded-3xl p-10 md:p-16 bg-gradient-to-tr from-[#1769FF]/20 via-[#673BFF]/20 to-[#D900FF]/20 border border-white/20 text-center space-y-6">
              <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold block">
                STRATEGIC DIAGNOSIS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-2xl mx-auto">
                Want custom insights for your business?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-light max-w-xl mx-auto">
                Request a free growth audit. Our team will evaluate your search rankings, current ad strategy, and digital assets.
              </p>
              <div className="pt-4 flex justify-center">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>Request Free Audit</span>
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

async function ArticlesFetcher() {
  const articles = await getPublishedInsights();

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 border border-white/10 rounded-2xl bg-slate-900/40">
        <p className="text-slate-400 text-sm font-light">No published insights found yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, idx) => (
        <RevealOnScroll key={article.id} variant="fade-up" delay={idx * 0.08}>
          <ArticleCard article={article} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
