import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, User, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
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
      title: 'Article Not Found | Surnax Technologies',
    };
  }

  return {
    title: `${article.title} | Surnax Technologies`,
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
      name: 'Surnax Technologies',
      url: 'https://surnaxtech.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Surnax Technologies',
      logo: {
        '@type': 'ImageObject',
        url: 'https://surnaxtech.com/logo-horizontal-transparent.png',
      },
    },
    datePublished: article.publishedDate,
    mainEntityOfPage: `https://surnaxtech.com/insights/${article.slug}`,
  };

  return (
    <MotionProvider>
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="relative min-h-screen bg-ivory text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow={article.category}
            title={article.title}
            description={article.summary}
            breadcrumbs={[
              { label: 'Insights', href: '/insights' },
              { label: article.title },
            ]}
          />

          {/* Article Metadata Bar */}
          <section className="py-4 bg-white border-b border-border-subtle">
            <Container variant="wide" className="flex items-center justify-between text-xs font-mono text-txt-muted">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1 font-medium text-plum">
                  <User className="h-3.5 w-3.5 text-coral" />
                  <span>{article.author}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1 font-medium text-plum">
                  <Clock className="h-3.5 w-3.5 text-coral" />
                  <span>{article.readTime}</span>
                </span>
              </div>
              <span className="text-txt-muted">{article.publishedDate}</span>
            </Container>
          </section>

          {/* Featured Article Cover Image */}
          {article.image && (
            <section className="pt-10 pb-4 bg-ivory">
              <Container variant="standard">
                <ImageReveal className="relative h-[340px] sm:h-[440px] w-full rounded-2xl border border-border-subtle shadow-editorial">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum/40 via-transparent to-transparent pointer-events-none" />
                </ImageReveal>
              </Container>
            </section>
          )}

          {/* Article Body */}
          <section className="py-20 bg-ivory border-b border-border-subtle">
            <Container variant="standard" className="space-y-12">
              {/* Key Takeaways Box */}
              <RevealOnScroll variant="fade-up" className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial-sm space-y-3">
                <span className="font-mono text-xs font-bold text-coral uppercase tracking-widest block">
                  ARTICLE KEY TAKEAWAYS
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-txt-secondary font-normal">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="h-4 w-4 text-coral shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>

              {/* Main Content Sections */}
              <div className="space-y-10">
                {article.sections.map((section, idx) => (
                  <RevealOnScroll key={idx} variant="fade-up" delay={idx * 0.05} className="space-y-4">
                    <h2 className="font-display font-normal text-3xl sm:text-4xl text-plum">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-base sm:text-lg text-txt-secondary leading-relaxed font-normal">
                        {p}
                      </p>
                    ))}
                  </RevealOnScroll>
                ))}
              </div>
            </Container>
          </section>

          {/* Bottom CTA */}
          <section className="py-20 bg-white text-center border-b border-border-subtle">
            <Container variant="standard" className="space-y-6">
              <h2 className="font-display font-normal text-3xl sm:text-5xl text-plum">
                Ready to Apply These Strategies to Your Business?
              </h2>
              <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-xl mx-auto font-normal">
                Request a free growth audit to discuss your local search rankings, paid ads budget, and website conversion setup.
              </p>
              <div className="pt-2">
                <Link href="/growth-audit">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    Request Free Audit
                  </Button>
                </Link>
              </div>
            </Container>
          </section>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
