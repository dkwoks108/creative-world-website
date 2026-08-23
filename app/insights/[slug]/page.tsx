import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
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
      title: 'Article Not Found | Ceativee World',
    };
  }

  return {
    title: `${article.title} | Ceativee World Jaipur`,
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
      name: 'Ceativee World',
      url: 'https://creativeworld.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ceativee World',
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
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <Navbar />

        <main>
          {/* 1. EDITORIAL HERO SECTION */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black hover:underline underline-offset-4 font-bold"
              >
                <ArrowLeft size={14} />
                <span>BACK TO INSIGHTS</span>
              </Link>

              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold pt-2">
                <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
                <span>DISPATCH — {article.category}</span>
              </div>

              <h1 className="font-serif font-bold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-none text-black my-2">
                {article.title}<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-2" />

              <p className="font-serif text-xl sm:text-2xl leading-relaxed text-black tracking-tight font-normal max-w-3xl">
                {article.summary}
              </p>
            </div>
          </MonochromeSection>

          {/* 2. METADATA BAR */}
          <div className="py-4 border-b-2 border-black bg-neutral-100 font-mono text-xs text-black font-bold uppercase tracking-widest px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-1.5">
                <User size={14} />
                <span>{article.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </span>
            </div>
            <span className="text-neutral-600">{article.publishedDate}</span>
          </div>

          {/* 3. COVER IMAGE */}
          {article.image && (
            <div className="border-b-4 border-black bg-neutral-50 p-6 sm:p-12">
              <div className="max-w-5xl mx-auto relative h-72 sm:h-[450px] w-full border-4 border-black bg-white overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* 4. ARTICLE BODY & KEY TAKEAWAYS */}
          <MonochromeSection divider="thick" texture="lines">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Key Takeaways Box */}
              <div className="p-8 border-4 border-black bg-white space-y-4">
                <span className="font-mono text-xs font-bold text-black uppercase tracking-widest block">
                  01 / ARTICLE KEY TAKEAWAYS
                </span>
                <ul className="space-y-3 font-serifBody text-base text-black font-normal">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check size={18} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Content Sections */}
              <div className="space-y-12 pt-6">
                {article.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4 border-t-2 border-black pt-8">
                    <span className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-widest block">
                      SECTION 0{idx + 2}
                    </span>
                    <h2 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="font-serifBody text-base sm:text-xl text-neutral-800 leading-relaxed font-normal">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </MonochromeSection>

          {/* 5. INVERTED BOTTOM CTA */}
          <MonochromeSection inverted divider="none" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                STRATEGIC DIAGNOSIS
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none uppercase">
                Ready to Apply These Strategies?
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Request a free growth audit to discuss your local search rankings, paid ads budget, and website conversion setup.
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

