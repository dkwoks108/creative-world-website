import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Target, Zap, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { aboutData } from '@/data/about';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Surnax Technologies | Web Engineering & Growth Studio',
  description: 'Surnax Technologies is a result-driven digital growth and web engineering studio focused on connected search visibility, performance marketing, video production, and web conversion.',
  openGraph: {
    title: 'About Surnax Technologies | Web & Digital Growth Partner',
    description: 'Discover Surnax Technologies mission, growth philosophy, and connected digital marketing systems.',
  },
};

export default function AboutPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-ivory text-txt-primary">
        <Navbar />

        <main>
          {/* Page Hero */}
          <PageHero
            eyebrow="BUSINESS GROWTH PARTNER"
            title="We Solve Business Growth Problems"
            titleHighlight="Through Integrated Systems."
            description={aboutData.tagline}
            breadcrumbs={[{ label: 'About Us' }]}
          />

          {/* Mission & Vision Section */}
          <section className="py-20 bg-ivory border-b border-border-subtle">
            <Container variant="wide" className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Mission Card */}
                <div className="p-8 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-mono text-coral font-medium">
                      <Target className="h-4 w-4" />
                      <span>OUR AGENCY MISSION</span>
                    </div>
                    <h2 className="font-display font-normal text-3xl text-plum">
                      Performance Over Vanity Metrics
                    </h2>
                    <p className="text-sm text-txt-secondary leading-relaxed font-normal">
                      {aboutData.mission}
                    </p>
                  </div>
                </div>

                {/* Vision Card */}
                <div className="p-8 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-mono text-coral font-medium">
                      <Zap className="h-4 w-4" />
                      <span>OUR VISION</span>
                    </div>
                    <h2 className="font-display font-normal text-3xl text-plum">
                      Rajasthan&apos;s Growth Benchmark
                    </h2>
                    <p className="text-sm text-txt-secondary leading-relaxed font-normal">
                      {aboutData.vision}
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Growth Philosophy Section */}
          <section className="py-24 bg-ivory border-b border-border-subtle">
            <Container variant="wide" className="space-y-16">
              {/* Growth Philosophy Section with Editorial Image */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-txt-secondary">
                      OUR PHILOSOPHY
                    </span>
                  </div>
                  <h2 className="font-display font-normal text-4xl sm:text-6xl text-plum tracking-tight leading-[1.08]">
                    Why Disconnected Marketing <br />
                    <span className="text-coral italic font-normal">Wastes Ad Budget.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-txt-secondary leading-relaxed font-normal">
                    {aboutData.philosophy}
                  </p>
                </div>
                <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-border-subtle shadow-editorial">
                  <Image
                    src="/images/about/cw-about-business-strategy-editorial-01.webp"
                    alt="Surnax Technologies Strategy Team analyzing digital growth performance"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-border-subtle shadow-editorial-sm">
                    <p className="text-xs font-mono text-coral uppercase tracking-wider font-semibold">STRATEGIC CONSULTING ENGINE</p>
                    <p className="text-xs text-txt-secondary mt-1">Warm editorial aesthetics for Jaipur digital growth strategy</p>
                  </div>
                </div>
              </div>

              {/* Core Principles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {aboutData.corePrinciples.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="font-mono text-xs text-coral font-bold">0{idx + 1}</span>
                      <h3 className="font-display font-normal text-2xl text-plum">
                        {principle.title}
                      </h3>
                      <p className="text-xs text-txt-secondary leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* Transparent Proof Commitment */}
          <section className="py-20 bg-white border-b border-border-subtle">
            <Container variant="standard" className="space-y-8 text-center">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cream/40 border border-border-subtle mx-auto">
                <ShieldCheck className="h-4 w-4 text-coral" />
                <span className="font-mono text-xs uppercase tracking-widest text-plum font-semibold">
                  OUR PROOF STANDARDS
                </span>
              </div>
              <h2 className="font-display font-normal text-4xl sm:text-5xl text-plum">
                100% Honest Proof & Transparent Evidence
              </h2>
              <p className="text-sm sm:text-base text-txt-secondary leading-relaxed max-w-2xl mx-auto">
                We believe trust is earned through verifiable business outcomes. We do not invent client testimonials, inflate ROAS numbers, or publish unverified metrics. Strategic frameworks are clearly demarcated as Growth Playbooks until client-verified data is supplied.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                    {siteConfig.primaryCTA}
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
