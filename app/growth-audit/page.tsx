import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { GrowthAuditForm } from '@/components/ui/GrowthAuditForm';
import { FAQSection } from '@/components/ui/FAQSection';

export const metadata: Metadata = {
  title: 'Free Digital Growth Audit | Creativee World Jaipur',
  description: 'Request a free digital growth audit for your Jaipur business. We evaluate search visibility, paid ad bottlenecks, mobile speed, and web lead conversion.',
  keywords: [
    'free digital marketing audit Jaipur',
    'SEO audit Jaipur',
    'website audit Jaipur',
    'digital growth diagnostic Jaipur',
    'Google Ads audit Jaipur',
  ],
  openGraph: {
    title: 'Free Digital Growth Audit | Creativee World Jaipur',
    description: 'Get an actionable digital marketing review tailored for Jaipur business owners with zero pushy sales calls.',
    url: 'https://creativeworld.in/growth-audit',
    siteName: 'Creativee World',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'Free Digital Growth Audit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Digital Growth Audit | Creativee World Jaipur',
    description: 'Actionable digital acquisition diagnostic delivered within 24 business hours.',
    images: ['/brand/og-image.png'],
  },
  alternates: {
    canonical: 'https://creativeworld.in/growth-audit',
  },
};

const auditFaqs = [
  {
    question: 'Is the Growth Audit genuinely 100% free?',
    answer: 'Yes! The initial Growth Audit is completely free with no obligations or hidden charges. We evaluate your digital footprint and present strategic findings transparently.',
  },
  {
    question: 'What information do I need to submit for the audit?',
    answer: 'Simply provide your company name, website/social URL, target industry, and email or contact phone/WhatsApp number. Our strategy team handles the diagnostic analysis.',
  },
  {
    question: 'How long does it take to receive the Growth Audit results?',
    answer: 'Our team completes the diagnostic review and delivers a clear summary report within 24 to 48 business hours.',
  },
];

export default function GrowthAuditPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        <Navbar />

        <main className="pt-32 font-sans">
          {/* Ambient Spectrum Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

          {/* 1. HERO SECTION */}
          <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="space-y-8">
              <RevealOnScroll variant="fade-up">
                <CWBadge variant="cyan">
                  <Sparkles size={13} />
                  <span>Free Growth Audit &amp; Diagnostics</span>
                </CWBadge>
              </RevealOnScroll>

              <div className="space-y-4 max-w-4xl">
                <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                  Free digital <br />
                  <span className="text-cw-gradient">growth audit.</span>
                </h1>

                <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed pt-2">
                  Our strategic team will review your website, search rankings, current ad channels, and market competitors—providing actionable recommendations without sales pressure.
                </p>
              </div>
            </div>
          </section>

          {/* 2. DIAGNOSTIC SCOPE & AUDIT FORM */}
          <section className="relative z-10 py-16 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Side: What We Review (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="font-mono text-xs font-semibold text-[#00CFFF] uppercase tracking-widest block">
                    ● DIAGNOSTIC SCOPE
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    What Our Team Reviews
                  </h2>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    We analyze your entire customer acquisition funnel to identify where interested buyers are dropping off.
                  </p>
                </div>

                {/* Strategic Atmosphere Image */}
                <div className="relative h-[220px] w-full rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
                  <Image
                    src="/images/audit/cw-growth-audit-atmosphere-01.png"
                    alt="Creativee World Strategic Growth Diagnostic Workspace"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center hover:scale-105 transition-all duration-300"
                  />
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase">
                      <Check size={16} />
                      <span>LOCAL SEARCH &amp; GOOGLE MAPS</span>
                    </div>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      Evaluation of your Google Business Profile rankings, local keyword coverage, and map pack placement in Jaipur.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase">
                      <Check size={16} />
                      <span>ADVERTISING &amp; SEARCH INTENT</span>
                    </div>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      Review of your current or planned Google Search &amp; Instagram ad campaigns for budget leaks and audience targeting.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase">
                      <Check size={16} />
                      <span>WEBSITE LANDING &amp; CONVERSION</span>
                    </div>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      Audit of page load speed, mobile UX, enquiry forms, and CTA clarity across smartphone devices.
                    </p>
                  </div>
                </div>

                {/* Honest Audit Guarantee */}
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/10 flex items-center space-x-3 text-xs font-mono text-slate-400">
                  <ShieldCheck size={16} className="text-[#00CFFF] shrink-0" />
                  <span>Free analysis delivered within 24 business hours. No pushy sales calls.</span>
                </div>
              </div>

              {/* Right Side: Audit Form (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-semibold text-[#00CFFF] uppercase tracking-widest block">
                    ● ENTER BUSINESS DETAILS
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    Custom Diagnostic Request
                  </h2>
                </div>

                <GrowthAuditForm />
              </div>
            </div>
          </section>

          {/* 3. AUDIT FAQS WITH JSON-LD SCHEMA */}
          <FAQSection
            badge="GROWTH AUDIT FAQ"
            title="Questions About The Growth Audit?"
            description="Clear details on our free audit turnaround, diagnostic criteria, and delivery format."
            faqs={auditFaqs}
          />
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
