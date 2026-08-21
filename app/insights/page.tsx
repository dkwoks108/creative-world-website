import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { getPublishedInsights } from '@/lib/db-content';

export const metadata: Metadata = {
  title: 'Insights & Digital Growth Guides | Surnax Technologies',
  description: 'Practical guides and technical articles on Web Engineering, Local Search, Performance Marketing, Video Production, and Web Conversion.',
  openGraph: {
    title: 'Insights & Technical Growth Guides | Surnax Technologies',
    description: 'Expert digital marketing and engineering articles tailored to growth-oriented businesses.',
  },
};

export default async function InsightsPage() {
  const articles = await getPublishedInsights();

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
                <span>DIGITAL INSIGHTS & KNOWLEDGE HUB</span>
              </div>

              <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                INSIGHTS &<br />
                DIGITAL DISPATCH<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal max-w-4xl">
                Actionable strategies, local search breakdowns, and performance marketing tactics written to help Jaipur companies make informed marketing decisions.
              </p>
            </div>
          </MonochromeSection>

          {/* 2. ARTICLES GRID */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="space-y-12">
              <span className="font-mono text-xs text-black uppercase tracking-widest block font-bold">
                RECENT DISPATCHES & ARTICLES
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </MonochromeSection>

          {/* 3. INVERTED BOTTOM CTA */}
          <MonochromeSection inverted divider="none" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                STRATEGIC DIAGNOSIS
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none uppercase">
                Want Custom Insights for Your Business?
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Request a free growth audit. Our team will evaluate your search rankings, current ad strategy, and digital assets.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    Request Free Audit
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

