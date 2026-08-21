import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { industriesData } from '@/data/industries';

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return industriesData.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = industriesData.find((i) => i.slug === params.slug);

  if (!industry) {
    return {
      title: 'Industry Strategy Not Found | Ceativee World',
    };
  }

  return {
    title: `${industry.title} Digital Marketing Jaipur | Ceativee World`,
    description: industry.shortDescription,
    openGraph: {
      title: `${industry.title} Growth Strategy in Jaipur | Ceativee World`,
      description: industry.shortDescription,
    },
  };
}

export default function IndustryDetailPage({ params }: IndustryPageProps) {
  const industry = industriesData.find((i) => i.slug === params.slug);

  if (!industry) {
    notFound();
  }

  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-obsidian text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow={industry.kicker}
            title={industry.title}
            description={industry.overview}
            breadcrumbs={[
              { label: 'Industries', href: '/industries' },
              { label: industry.title },
            ]}
          />

          {/* Industry Editorial Hero Image */}
          {industry.image && (
            <section className="py-8 bg-obsidian border-b border-border-subtle/50">
              <Container variant="wide">
                <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-border-subtle shadow-2xl">
                  <Image
                    src={industry.image}
                    alt={`${industry.title} growth strategy editorial image - Jaipur`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6 right-6 max-w-xl space-y-1">
                    <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest font-bold">
                      JAIPUR SECTOR EDITORIAL ASSET
                    </span>
                    <p className="text-sm text-txt-secondary">
                      Commercial art-direction tailored for {industry.title.toLowerCase()} in Rajasthan.
                    </p>
                  </div>
                </div>
              </Container>
            </section>
          )}

          {/* Challenges & Strategy Grid */}
          <section className="py-20 bg-surface-primary border-b border-border-subtle/50">
            <Container variant="wide" className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Sector Challenges */}
                <div className="space-y-6">
                  <span className="font-mono text-xs font-bold text-signal-cyan uppercase tracking-widest block">
                    SECTOR BOTTLENECKS
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-txt-primary">
                    Common Growth Challenges in Jaipur
                  </h2>
                  <div className="space-y-3">
                    {industry.growthChallenges.map((challenge, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-obsidian/60 border border-border-subtle text-xs sm:text-sm text-txt-secondary flex items-start space-x-3">
                        <span className="font-mono text-xs font-bold text-semantic-error shrink-0 mt-0.5">✕</span>
                        <span>{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategy Points */}
                <div className="space-y-6">
                  <span className="font-mono text-xs font-bold text-signal-cyan uppercase tracking-widest block">
                    RECOMMENDED PLAYBOOK
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-txt-primary">
                    Our Sector Growth Solution
                  </h2>
                  <div className="space-y-3">
                    {industry.strategyPoints.map((point, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-obsidian/80 border border-border-subtle text-xs sm:text-sm text-txt-secondary flex items-start space-x-3">
                        <CheckCircle2 className="h-4 w-4 text-signal-cyan shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related Playbook Link */}
              {industry.playbookSlug && (
                <div className="p-6 rounded-2xl bg-obsidian border border-signal-cyan/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="font-mono text-xs text-signal-cyan uppercase font-bold">
                      STRATEGIC GROWTH PLAYBOOK AVAILABLE
                    </span>
                    <p className="text-sm text-txt-primary font-semibold">
                      Explore our conceptual execution framework for this Jaipur industry sector.
                    </p>
                  </div>
                  <Link href={`/work/${industry.playbookSlug}`}>
                    <Button variant="primary" size="sm" icon={<ArrowRight className="h-3.5 w-3.5" />}>
                      View Playbook Framework
                    </Button>
                  </Link>
                </div>
              )}
            </Container>
          </section>

          {/* Sector FAQs */}
          {industry.faqs && industry.faqs.length > 0 && (
            <section className="py-20 bg-obsidian border-b border-border-subtle/50">
              <Container variant="standard" className="space-y-12">
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-primary border border-border-subtle mx-auto">
                    <HelpCircle className="h-3.5 w-3.5 text-signal-cyan" />
                    <span className="font-mono text-xs uppercase tracking-widest text-signal-cyan">
                      INDUSTRY INSIGHTS
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-3xl text-txt-primary">
                    Sector FAQs
                  </h2>
                </div>

                <div className="space-y-6 max-w-3xl mx-auto">
                  {industry.faqs.map((faq, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-surface-primary border border-border-subtle space-y-2">
                      <h3 className="font-display font-bold text-base text-txt-primary">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </Container>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="py-20 bg-surface-primary text-center">
            <Container variant="standard" className="space-y-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary">
                Accelerate Growth for Your {industry.title}
              </h2>
              <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-xl mx-auto">
                Request a free growth audit to review your current channel presence, local search ranking, and lead generation pipeline.
              </p>
              <div className="pt-2">
                <Link href="/growth-audit">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    Schedule Free Sector Audit
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
