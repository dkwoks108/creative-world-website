import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
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
      <div className="relative min-h-screen bg-obsidian text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow="GROWTH KNOWLEDGE HUB"
            title="Digital Marketing Insights"
            titleHighlight="For Jaipur Business Owners."
            description="Actionable strategies, local search breakdowns, and performance marketing tactics written to help Jaipur companies make informed marketing decisions."
            breadcrumbs={[{ label: 'Insights' }]}
          />

          {/* Articles Grid */}
          <section className="py-24 bg-obsidian border-b border-border-subtle/50">
            <Container variant="wide" className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </Container>
          </section>

          {/* Bottom CTA */}
          <section className="py-20 bg-surface-primary text-center border-b border-border-subtle/50">
            <Container variant="standard" className="space-y-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary">
                Want Custom Insights for Your Business?
              </h2>
              <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-xl mx-auto">
                Request a free growth audit. Our team will evaluate your search rankings, current ad strategy, and digital assets.
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
