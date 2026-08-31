import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';
import { FAQSection } from '@/components/ui/FAQSection';
import { packagesData } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Growth Packages & Pricing | Creativee World Jaipur',
  description: 'Structured, transparent monthly marketing packages and custom proposals for Jaipur businesses tailored to your growth stage.',
  keywords: [
    'digital marketing packages Jaipur',
    'SEO pricing Jaipur',
    'Meta ads monthly retainer Jaipur',
    'Google Ads agency pricing Jaipur',
    'digital marketing agency cost Jaipur',
  ],
  openGraph: {
    title: 'Growth Packages & Pricing | Creativee World Jaipur',
    description: 'Structured, transparent monthly marketing packages with custom proposals tailored to your business stage in Jaipur.',
    url: 'https://creativeworld.in/packages',
    siteName: 'Creativee World',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'Creativee World Packages & Pricing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growth Packages & Pricing | Creativee World Jaipur',
    description: 'Transparent monthly retainers and custom scopes for performance advertising, SEO, and web development.',
    images: ['/brand/og-image.png'],
  },
  alternates: {
    canonical: 'https://creativeworld.in/packages',
  },
};

const packagesFaqs = [
  {
    question: 'How is ad spend handled for Google Ads & Meta Ads?',
    answer: 'Ad budget is paid directly to Google or Meta via your company’s business ad account. Creativee World manages campaign strategy, audience targeting, ad creatives, video editing, copywriting, and bid optimization transparently.',
  },
  {
    question: 'Are there any hidden setup fees?',
    answer: 'No. All setup fees, tracking pixel configurations, and initial audits are clearly itemized in your custom proposal before work begins.',
  },
  {
    question: 'Can we request custom deliverables outside standard packages?',
    answer: 'Yes! We construct custom package scopes for multi-location businesses, enterprise real estate projects, and specialized e-commerce brands.',
  },
  {
    question: 'What contract length is required for monthly growth retainers?',
    answer: 'Our growth packages operate on flexible monthly retainers with standard 30-day notice, allowing your business complete operational agility without rigid long-term lock-ins.',
  },
];

export default function PackagesPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        <Navbar />

        <main className="pt-32">
          {/* Ambient Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

          {/* 1. HERO SECTION */}
          <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="space-y-8">
              <RevealOnScroll variant="fade-up">
                <CWBadge variant="cyan">
                  <Sparkles size={13} />
                  <span>Growth Packages &amp; Custom Quotation</span>
                </CWBadge>
              </RevealOnScroll>

              <div className="space-y-4 max-w-4xl">
                <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                  Commercial <br />
                  <span className="text-cw-gradient">growth tiers.</span>
                </h1>

                <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed pt-2">
                  Predictable deliverables, transparent scope, and custom quotes built around your business goals in Jaipur and beyond. Select your target scope to begin.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>Request Custom Quote</span>
                    <ArrowUpRight size={18} />
                  </CWButton>
                </Link>
              </div>
            </div>
          </section>

          {/* 2. TRANSPARENT PRICING GUARANTEE */}
          <section className="relative z-10 py-4 bg-slate-900/60 border-y border-white/10 font-mono text-xs text-slate-300 px-6 text-center flex items-center justify-center gap-2">
            <ShieldCheck size={16} className="text-[#00CFFF]" />
            <span>TRANSPARENT PRICING POLICY: CUSTOM SCOPE PROPOSALS WITH DIRECT AD ACCOUNT OWNERSHIP.</span>
          </section>

          {/* 3. PRICING CARDS GRID */}
          <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold">
                ● RETAINER &amp; PROJECT PACKAGES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {packagesData.map((pkg, idx) => (
                <RevealOnScroll key={pkg.id} variant="fade-up" delay={idx * 0.1}>
                  <div
                    className={`h-full rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                      pkg.featured
                        ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-[#00CFFF]/50 shadow-cw-glow relative'
                        : 'bg-slate-900/60 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {pkg.featured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#1769FF] to-[#D900FF] text-white text-[11px] font-mono font-bold tracking-wider uppercase">
                        MOST POPULAR GROWTH TIER
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-2xl text-white">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-light">
                          {pkg.subtitle}
                        </p>
                      </div>

                      <div className="py-4 border-y border-white/10 space-y-1">
                        <div className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                          {pkg.price}
                        </div>
                        <p className="text-xs text-[#00CFFF] font-mono font-medium">
                          Ideal for: {pkg.idealFor}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                          Included Deliverables:
                        </span>
                        <ul className="space-y-2.5 text-xs text-slate-300 font-light">
                          {pkg.inclusions.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2.5">
                              <Check size={14} className="text-[#00CFFF] shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-8">
                      <Link href="/growth-audit" className="block">
                        <CWButton
                          variant={pkg.featured ? 'gradient' : 'glass'}
                          size="md"
                          className="w-full justify-center"
                        >
                          <span>{pkg.ctaText}</span>
                          <ArrowUpRight size={16} />
                        </CWButton>
                      </Link>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* 4. COMMERCIAL FAQS WITH JSON-LD SCHEMA */}
          <FAQSection
            badge="COMMERCIAL & SCOPE FAQ"
            title="Frequently Asked Billing & Scope Questions"
            description="Clear guidelines on ad account management, setup fees, and custom retainer scope."
            faqs={packagesFaqs}
          />

          {/* 5. BOTTOM CTA */}
          <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="rounded-3xl p-10 md:p-16 bg-gradient-to-tr from-[#1769FF]/20 via-[#673BFF]/20 to-[#D900FF]/20 border border-white/20 text-center space-y-6">
              <span className="font-mono text-xs text-[#00CFFF] uppercase tracking-widest font-semibold block">
                RECOMMENDED TIER DIAGNOSIS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-2xl mx-auto">
                Unsure which tier fits your current growth stage?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg font-light max-w-xl mx-auto">
                Request a free growth audit. We will evaluate your business stage and recommend the exact package tier suited for your targets.
              </p>
              <div className="pt-4 flex justify-center">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>Get Recommended Package</span>
                    <ArrowUpRight size={18} />
                  </CWButton>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
