import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FeaturedCaseStudy } from '@/components/ui/FeaturedCaseStudy';
import { CaseStudyCard } from '@/components/ui/CaseStudyCard';
import { caseStudiesData } from '@/data/case-studies';

export const metadata: Metadata = {
  title: 'Growth Playbooks & Sector Frameworks | Ceativee World Jaipur',
  description: 'Explore Ceativee World\'s strategic digital growth playbooks engineered for Jaipur education, real estate, and retail sectors.',
  openGraph: {
    title: 'Growth Playbooks & Frameworks | Ceativee World Jaipur',
    description: 'Strategic growth execution blueprints demonstrating our approach to Jaipur digital acquisition and conversion.',
  },
};

export default function WorkPage() {
  const featured = caseStudiesData.find((c) => c.featured) || caseStudiesData[0];
  const remaining = caseStudiesData.filter((c) => c.id !== featured.id);

  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-obsidian text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow="STRATEGIC GROWTH BLUEPRINTS"
            title="Jaipur Sector Growth Playbooks"
            description="Until client-verified data is authorized, all work examples are clearly presented as strategic Growth Playbooks—demonstrating our real-world execution methodology for key Jaipur economic sectors."
            breadcrumbs={[{ label: 'Growth Playbooks' }]}
          />

          {/* Honest Proof Notice */}
          <section className="py-6 bg-surface-primary border-b border-border-subtle/50">
            <Container variant="wide" className="flex items-center space-x-3 text-xs font-mono text-signal-cyan">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>
                NO FAKE METRICS POLICY: All frameworks below represent strategic campaign execution models engineered for Jaipur business domains.
              </span>
            </Container>
          </section>

          {/* Featured Playbook */}
          <section className="py-20 bg-obsidian border-b border-border-subtle/50">
            <Container variant="wide" className="space-y-8">
              <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest block font-semibold">
                FEATURED GROWTH PLAYBOOK
              </span>
              <FeaturedCaseStudy caseStudy={featured} />
            </Container>
          </section>

          {/* Remaining Playbooks */}
          <section className="py-20 bg-surface-primary border-b border-border-subtle/50">
            <Container variant="wide" className="space-y-12">
              <span className="font-mono text-xs text-signal-cyan uppercase tracking-widest block font-semibold">
                ADDITIONAL SECTOR FRAMEWORKS
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {remaining.map((study) => (
                  <CaseStudyCard key={study.id} caseStudy={study} />
                ))}
              </div>
            </Container>
          </section>

          {/* Bottom CTA */}
          <section className="py-20 bg-obsidian text-center">
            <Container variant="standard" className="space-y-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary">
                Want a Customized Growth Playbook for Your Business?
              </h2>
              <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-xl mx-auto">
                Request a free growth audit. We will analyze your search rankings, current ad channels, and website infrastructure to build a custom growth roadmap.
              </p>
              <div className="pt-2">
                <Link href="/growth-audit">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    Request Custom Growth Audit
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
