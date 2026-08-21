import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { servicesData } from '@/data/services';

export const metadata: Metadata = {
  title: 'Web Engineering & Digital Services | Surnax Technologies',
  description: 'Explore Surnax Technologies core growth services: Web Engineering, Video Production, Performance Marketing, Local SEO, and Social Media Reels.',
  openGraph: {
    title: 'Digital Engineering & Growth Services | Surnax Technologies',
    description: 'Connected web engineering and digital growth services designed to drive qualified leads and business scale.',
  },
};

export default function ServicesPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-ivory text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow="SYSTEMIC GROWTH PILLARS"
            title="Connected Web & Digital Growth Services"
            titleHighlight="Built for Growth-Minded Brands."
            description="Traditional agencies sell isolated marketing tasks. Surnax Technologies delivers a connected growth system where web engineering, video production, local SEO, and paid acquisition compound to drive enterprise growth."
            breadcrumbs={[{ label: 'Services' }]}
          />

          <section className="py-24 bg-ivory border-b border-border-subtle">
            <Container variant="wide" className="space-y-16">
              <div className="space-y-12">
                {servicesData.map((service) => (
                  <div
                    key={service.id}
                    className="p-8 sm:p-12 rounded-2xl bg-white border border-border-subtle hover:border-coral/40 transition-all space-y-8 group shadow-editorial"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                      <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-sm font-bold text-coral">
                            {service.number}
                          </span>
                          <span className="font-mono text-xs text-txt-muted uppercase tracking-widest">
                            {service.kicker}
                          </span>
                        </div>

                        <h2 className="font-display font-normal text-2xl sm:text-4xl text-plum group-hover:text-coral transition-colors">
                          {service.title}
                        </h2>

                        <p className="text-base text-txt-secondary leading-relaxed font-normal">
                          {service.description}
                        </p>

                        <div className="p-4 rounded-xl bg-ivory border border-border-subtle text-xs font-mono text-plum font-medium">
                          <span>EXPECTED OUTCOME: {service.outcomeStatement}</span>
                        </div>
                      </div>

                      {/* Deliverables List */}
                      <div className="lg:w-96 space-y-4 bg-ivory/60 p-6 rounded-xl border border-border-subtle">
                        <span className="text-xs font-mono uppercase text-plum font-bold block">
                          KEY DELIVERABLES:
                        </span>
                        <ul className="space-y-2.5 text-xs text-txt-secondary">
                          {service.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-coral shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4 border-t border-border-subtle">
                          <Link href={`/services/${service.slug}`}>
                            <Button variant="outline" size="sm" className="w-full" icon={<ArrowRight className="h-3.5 w-3.5" />}>
                              {service.ctaLabel}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* CTA Banner */}
          <section className="py-20 bg-white border-b border-border-subtle text-center">
            <Container variant="standard" className="space-y-6">
              <h2 className="font-display font-normal text-3xl sm:text-4xl text-plum">
                Uncertain Which Growth Service Your Business Needs?
              </h2>
              <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-xl mx-auto font-normal">
                Request a free 2-Step Growth Audit. Our strategic team will diagnose your channel bottlenecks and recommend the optimal growth setup for your business.
              </p>
              <div className="pt-2">
                <Link href="/growth-audit">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    Request Free Growth Audit
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
