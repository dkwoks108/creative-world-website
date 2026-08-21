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
import { servicesData } from '@/data/services';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found | Surnax Technologies',
    };
  }

  return {
    title: `${service.title} | Surnax Technologies`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Surnax Technologies Studio`,
      description: service.description,
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    provider: {
      '@type': 'Organization',
      name: 'Surnax Technologies',
      url: 'https://surnaxtech.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Jaipur',
    },
    description: service.description,
  };

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="relative min-h-screen bg-obsidian text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow={service.kicker}
            title={service.title}
            description={service.fullDescription}
            breadcrumbs={[
              { label: 'Services', href: '/services' },
              { label: service.title },
            ]}
          />

          {/* Service Commercial Editorial Image */}
          {service.image && (
            <section className="py-8 bg-obsidian border-b border-border-subtle/50">
              <Container variant="wide">
                <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-border-subtle shadow-2xl">
                  <Image
                    src={service.image}
                    alt={`${service.title} editorial image - Jaipur Growth Agency`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6 right-6 max-w-xl space-y-1">
                    <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest font-bold">
                      STRATEGIC EDITORIAL WORKFLOW
                    </span>
                    <p className="text-sm text-txt-secondary">
                      Commercial execution & digital growth workflow in Jaipur, Rajasthan.
                    </p>
                  </div>
                </div>
              </Container>
            </section>
          )}

          {/* Key Benefits & Deliverables Section */}
          <section className="py-20 bg-surface-primary border-b border-border-subtle/50">
            <Container variant="wide" className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Benefits */}
                <div className="space-y-6">
                  <span className="font-mono text-xs font-bold text-signal-cyan uppercase tracking-widest block">
                    BUSINESS ADVANTAGES
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-txt-primary">
                    Why Your Business Needs This Growth Pillar
                  </h2>
                  <ul className="space-y-4">
                    {service.keyBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-3 p-4 rounded-xl bg-obsidian/60 border border-border-subtle">
                        <CheckCircle2 className="h-5 w-5 text-signal-cyan shrink-0 mt-0.5" />
                        <span className="text-sm text-txt-secondary font-normal">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="space-y-6">
                  <span className="font-mono text-xs font-bold text-signal-cyan uppercase tracking-widest block">
                    WHAT WE DELIVER
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-txt-primary">
                    Core Campaign Deliverables
                  </h2>
                  <div className="p-6 rounded-2xl bg-obsidian/80 border border-border-subtle space-y-4">
                    <ul className="space-y-3">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-sm text-txt-secondary">
                          <span className="font-mono text-xs text-signal-cyan font-bold mt-0.5">0{idx + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Process Overview */}
          <section className="py-20 bg-obsidian border-b border-border-subtle/50">
            <Container variant="wide" className="space-y-12">
              <div className="max-w-2xl space-y-3">
                <span className="font-mono text-xs font-bold text-signal-cyan uppercase tracking-widest block">
                  EXECUTION PROTOCOL
                </span>
                <h2 className="font-display font-bold text-3xl text-txt-primary">
                  How We Execute This Service
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {service.processOverview.map((step, idx) => (
                  <div key={idx} className="p-6 rounded-xl bg-surface-primary border border-border-subtle space-y-2">
                    <span className="font-mono text-xs font-bold text-signal-cyan">STEP 0{idx + 1}</span>
                    <p className="text-xs text-txt-primary font-semibold leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* FAQs Section */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="py-20 bg-surface-primary border-b border-border-subtle/50">
              <Container variant="standard" className="space-y-12">
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-obsidian border border-border-subtle mx-auto">
                    <HelpCircle className="h-3.5 w-3.5 text-signal-cyan" />
                    <span className="font-mono text-xs uppercase tracking-widest text-signal-cyan">
                      FREQUENTLY ASKED QUESTIONS
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-3xl text-txt-primary">
                    Service FAQs
                  </h2>
                </div>

                <div className="space-y-6 max-w-3xl mx-auto">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-obsidian/70 border border-border-subtle space-y-2">
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
          <section className="py-20 bg-obsidian text-center">
            <Container variant="standard" className="space-y-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary">
                Ready to Implement {service.title}?
              </h2>
              <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-xl mx-auto">
                Request a free growth audit to discuss your business goals, target audience, and ad requirements with our strategic team.
              </p>
              <div className="pt-2">
                <Link href="/growth-audit">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    Get Started with Audit
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
