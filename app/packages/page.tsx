import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PackageCard } from '@/components/ui/PackageCard';
import { packagesData } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Growth Packages & Pricing | Ceativee World Jaipur',
  description: 'Transparent monthly growth packages for Jaipur businesses: Starter (₹7,999–₹12,999), Growth (₹15,000–₹25,000), and Premium (₹40,000+).',
  openGraph: {
    title: 'Growth Packages & Pricing Tiers | Ceativee World Jaipur',
    description: 'Structured, transparent monthly marketing packages tailored to your business stage in Jaipur.',
  },
};

export default function PackagesPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-obsidian text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow="COMMERCIAL GROWTH TIERS"
            title="Structured Monthly Growth Packages"
            description="Predictable deliverables, transparent scope, and clear INR pricing tailored to your business stage in Jaipur. Choose the growth package aligned with your acquisition goals."
            breadcrumbs={[{ label: 'Packages & Pricing' }]}
          />

          {/* Transparent Pricing Guarantee Notice */}
          <section className="py-6 bg-surface-primary border-b border-border-subtle/50">
            <Container variant="wide" className="flex items-center space-x-3 text-xs font-mono text-signal-cyan">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>
                TRANSPARENT PRICING POLICY: Plain-English monthly scopes with direct platform ad spend billing.
              </span>
            </Container>
          </section>

          {/* Pricing Cards Grid */}
          <section className="py-24 bg-obsidian border-b border-border-subtle/50">
            <Container variant="wide" className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {packagesData.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </Container>
          </section>

          {/* FAQs & Scope Inclusions */}
          <section className="py-20 bg-surface-primary border-b border-border-subtle/50">
            <Container variant="standard" className="space-y-12">
              <div className="space-y-3 text-center">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-obsidian border border-border-subtle mx-auto">
                  <HelpCircle className="h-3.5 w-3.5 text-signal-cyan" />
                  <span className="font-mono text-xs uppercase tracking-widest text-signal-cyan">
                    PACKAGE QUESTIONS
                  </span>
                </div>
                <h2 className="font-display font-bold text-3xl text-txt-primary">
                  Commercial & Scope FAQs
                </h2>
              </div>

              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="p-6 rounded-xl bg-obsidian/70 border border-border-subtle space-y-2">
                  <h3 className="font-display font-bold text-base text-txt-primary">
                    How is ad spend handled for Google Ads & Meta Ads?
                  </h3>
                  <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed">
                    Ad budget is paid directly to Google or Meta via your business ad account. Ceativee World manages the strategy, targeting, creative assets, copywriting, and bid optimization transparently.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-obsidian/70 border border-border-subtle space-y-2">
                  <h3 className="font-display font-bold text-base text-txt-primary">
                    Are there any hidden setup fees?
                  </h3>
                  <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed">
                    No. All setup fees, initial audits, and tracking configuration are clearly outlined in your initial package agreement before work begins.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-obsidian/70 border border-border-subtle space-y-2">
                  <h3 className="font-display font-bold text-base text-txt-primary">
                    Can we request custom deliverables outside standard packages?
                  </h3>
                  <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed">
                    Yes. We build custom package scopes for multi-location businesses, enterprise real estate projects, and specialized e-commerce brands.
                  </p>
                </div>
              </div>
            </Container>
          </section>

          {/* Bottom CTA */}
          <section className="py-20 bg-obsidian text-center">
            <Container variant="standard" className="space-y-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary">
                Unsure Which Package Tier Fits Your Budget?
              </h2>
              <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-xl mx-auto">
                Request a free growth audit. We will evaluate your business stage and recommend the exact package tier suited for your growth targets.
              </p>
              <div className="pt-2">
                <Link href="/growth-audit">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    Get Recommended Package
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
