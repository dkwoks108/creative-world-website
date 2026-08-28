import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';
import { getPublishedInsightBySlug } from '@/lib/db-content';

interface InsightPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const article = await getPublishedInsightBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | Creativee World',
    };
  }

  return {
    title: `${article.title} | Creativee World Jaipur`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author],
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const article = await getPublishedInsightBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'Creativee World',
      url: 'https://creativeworld.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Creativee World',
      logo: {
        '@type': 'ImageObject',
        url: 'https://creativeworld.in/logo.png',
      },
    },
    datePublished: article.publishedDate,
    mainEntityOfPage: `https://creativeworld.in/insights/${article.slug}`,
  };

  return (
    <MotionProvider>
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        <Navbar />

        <main className="pt-32">
          {/* Ambient Spectrum Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

          {/* 1. HERO SECTION */}
          <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00CFFF] hover:text-white transition-colors font-semibold"
            >
              <ArrowLeft size={14} />
              <span>Back to Insights</span>
            </Link>

            <div className="space-y-6 max-w-4xl">
              <CWBadge variant="cyan">
                <Sparkles size={13} />
                <span>Dispatch — {article.category}</span>
              </CWBadge>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white">
                {article.title}
              </h1>

              <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
                {article.summary}
              </p>
            </div>
          </section>

          {/* 2. METADATA BAR */}
          <section className="relative z-10 py-4 bg-slate-900/60 border-y border-white/10 font-mono text-xs text-slate-300 px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-1.5">
                <User size={14} className="text-[#00CFFF]" />
                <span>{article.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Clock size={14} className="text-[#00CFFF]" />
                <span>{article.readTime}</span>
              </span>
            </div>
            <span className="text-slate-400">{article.publishedDate}</span>
          </section>

          {/* 3. COVER IMAGE */}
          {article.image && (
            <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-12">
              <div className="relative h-72 sm:h-[450px] w-full rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover object-center hover:scale-105 transition-all duration-500"
                />
              </div>
            </section>
          )}

          {/* 4. ARTICLE BODY & KEY TAKEAWAYS */}
          <section className="relative z-10 py-16 bg-slate-950/80 border-t border-white/10">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
              {/* Key Takeaways Box */}
              <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/15 space-y-4">
                <span className="font-mono text-xs font-semibold text-[#00CFFF] uppercase tracking-widest block">
                  ● ARTICLE KEY TAKEAWAYS
                </span>
                <ul className="space-y-3 text-sm sm:text-base text-slate-200 font-light">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check size={18} className="text-[#00CFFF] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Content Sections */}
              <div className="space-y-12 pt-6">
                {article.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4 border-t border-white/10 pt-8">
                    <span className="font-mono text-xs text-slate-400 font-semibold uppercase tracking-widest block">
                      SECTION 0{idx + 1}
                    </span>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. BOTTOM CTA */}
          <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="rounded-3xl p-10 md:p-16 bg-gradient-to-tr from-[#1769FF]/20 via-[#673BFF]/20 to-[#D900FF]/20 border border-white/20 text-center space-y-6">
              <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold block">
                STRATEGIC DIAGNOSIS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-2xl mx-auto">
                Ready to apply these strategies?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-light max-w-xl mx-auto">
                Request a free growth audit to discuss your local search rankings, paid ads budget, and website conversion setup.
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
