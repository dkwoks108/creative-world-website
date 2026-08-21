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
import { IndustryCard } from '@/components/ui/IndustryCard';
import { industriesData } from '@/data/industries';

export const metadata: Metadata = {
  title: 'Industry Growth Strategies in Jaipur | Ceativee World',
  description: 'Tailored digital growth systems for Jaipur business sectors: Coaching, Real Estate, Restaurants, Salons & Clinics, Jewelry, and Clothing boutiques.',
  openGraph: {
    title: 'Industry Digital Marketing Strategies Jaipur | Ceativee World',
    description: 'Explore sector-specific search, social, paid ads, and website strategies designed for Jaipur business markets.',
  },
};

export default function IndustriesPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-obsidian text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow="SECTOR-SPECIFIC GROWTH"
            title="Tailored Growth Strategies"
            titleHighlight="For Jaipur Businesses."
            description="Generic marketing templates fail because every local industry operates with distinct buying cycles, trust barriers, and search behaviors. Explore our specialized digital strategies for key Jaipur sectors."
            breadcrumbs={[{ label: 'Industries' }]}
          />

          {/* Industry Cards Grid */}
          <section className="py-24 bg-obsidian border-b border-border-subtle/50">
            <Container variant="wide" className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industriesData.map((industry) => (
                  <IndustryCard key={industry.id} industry={industry} />
                ))}
              </div>
            </Container>
          </section>

          {/* Bottom CTA */}
          <section className="py-20 bg-surface-primary border-b border-border-subtle/50 text-center">
            <Container variant="standard" className="space-y-6">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-txt-primary">
                Don&apos;t See Your Specific Industry Listed?
              </h2>
              <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-xl mx-auto">
                Our core growth principles—search intent capture, local trust building, high-converting ad funnels, and responsive web design—apply across all local B2B and consumer sectors in Jaipur.
              </p>
              <div className="pt-2">
                <Link href="/growth-audit">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    Discuss Your Business Sector
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
