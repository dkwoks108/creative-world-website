import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { GrowthAuditForm } from '@/components/ui/GrowthAuditForm';

export const metadata: Metadata = {
  title: 'Free Digital Growth Audit | Ceativee World Jaipur',
  description: 'Request a free 2-step digital growth audit for your Jaipur business. We evaluate search visibility, paid ad bottlenecks, and web lead conversion.',
  openGraph: {
    title: 'Free Digital Growth Audit | Ceativee World Jaipur',
    description: 'Get an actionable digital marketing review tailored for Jaipur business owners.',
  },
};

export default function GrowthAuditPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-ivory text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow="2-STEP GROWTH DIAGNOSIS"
            title="Request Your Free Growth Audit"
            description="Our strategic growth team will review your website, search rankings, current ad channels, and market competitors in Jaipur—providing actionable recommendations without sales pressure."
            breadcrumbs={[{ label: 'Free Growth Audit' }]}
          />

          {/* Audit Process & Form Container */}
          <section className="py-20 bg-ivory border-b border-border-subtle">
            <Container variant="wide" className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Side: What We Review (5 cols) */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    <span className="font-mono text-xs font-bold text-coral uppercase tracking-widest block">
                      DIAGNOSTIC SCOPE
                    </span>
                    <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
                      What Our Team Reviews
                    </h2>
                    <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed">
                      We analyze your entire customer acquisition funnel to identify where interested buyers are dropping off.
                    </p>
                  </div>

                  {/* Strategic Atmosphere Image */}
                  <div className="relative h-[200px] w-full rounded-xl overflow-hidden border border-border-subtle shadow-editorial">
                    <Image
                      src="/images/audit/cw-growth-audit-atmosphere-01.webp"
                      alt="Ceativee World Strategic Growth Diagnostic Workspace"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-txt-muted z-10">
                      <span className="px-2 py-0.5 rounded bg-obsidian/90 backdrop-blur-sm border border-border-subtle text-txt-primary">
                        JAIPUR DIAGNOSTIC STUDIO
                      </span>
                      <span className="text-signal-cyan">AUDIT READY</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-obsidian/70 border border-border-subtle space-y-2">
                      <div className="flex items-center space-x-2 font-mono text-xs text-signal-cyan font-bold">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>01 LOCAL SEARCH & GOOGLE MAPS</span>
                      </div>
                      <p className="text-xs text-txt-secondary leading-relaxed">
                        Evaluation of your Google Business Profile rankings, local keyword coverage, and map pack placement in Jaipur.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-obsidian/70 border border-border-subtle space-y-2">
                      <div className="flex items-center space-x-2 font-mono text-xs text-signal-cyan font-bold">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>02 ADVERTISING & SEARCH INTENT</span>
                      </div>
                      <p className="text-xs text-txt-secondary leading-relaxed">
                        Review of your current or planned Google Search & Instagram ad campaigns for budget leaks and audience targeting.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-obsidian/70 border border-border-subtle space-y-2">
                      <div className="flex items-center space-x-2 font-mono text-xs text-signal-cyan font-bold">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>03 WEBSITE LANDING & CONVERSION</span>
                      </div>
                      <p className="text-xs text-txt-secondary leading-relaxed">
                        Audit of page load speed, mobile UX, enquiry forms, and CTA clarity across smartphone devices.
                      </p>
                    </div>
                  </div>

                  {/* Honest Audit Guarantee */}
                  <div className="p-4 rounded-xl bg-obsidian border border-border-subtle flex items-center space-x-3 text-xs font-mono text-txt-muted">
                    <ShieldCheck className="h-4 w-4 text-signal-cyan shrink-0" />
                    <span>Free analysis delivered within 24 business hours. No pushy sales calls.</span>
                  </div>
                </div>

                {/* Right Side: Audit Form (7 cols) */}
                <div className="lg:col-span-7">
                  <div className="p-6 sm:p-10 rounded-2xl bg-obsidian border border-border-subtle space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-xl text-txt-primary">
                        Enter Your Business Details
                      </h3>
                      <p className="text-xs text-txt-secondary">
                        Fill out the 2-step form below so we can prepare your custom growth analysis.
                      </p>
                    </div>

                    <GrowthAuditForm />
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
