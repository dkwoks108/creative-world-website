import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
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
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <Navbar />

        <main>
          {/* 1. EDITORIAL HERO SECTION */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
                <span>FREE GROWTH AUDIT & DIAGNOSTICS</span>
              </div>

              <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                FREE DIGITAL<br />
                GROWTH AUDIT<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal max-w-4xl">
                Our strategic team will review your website, search rankings, current ad channels, and market competitors—providing actionable recommendations without sales pressure.
              </p>
            </div>
          </MonochromeSection>

          {/* 2. DIAGNOSTIC SCOPE & AUDIT FORM */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Side: What We Review (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-widest block">
                    DIAGNOSTIC SCOPE
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase">
                    What Our Team Reviews
                  </h2>
                  <p className="font-serifBody text-base text-neutral-800 leading-relaxed font-normal">
                    We analyze your entire customer acquisition funnel to identify where interested buyers are dropping off.
                  </p>
                </div>

                {/* Strategic Atmosphere Image */}
                <div className="relative h-[220px] w-full border-4 border-black bg-white overflow-hidden">
                  <Image
                    src="/images/audit/cw-growth-audit-atmosphere-01.png"
                    alt="Surnax Strategic Growth Diagnostic Workspace"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <div className="space-y-4">
                  <div className="p-5 border-2 border-black bg-white space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-black font-bold uppercase">
                      <Check size={16} strokeWidth={2} />
                      <span>LOCAL SEARCH & GOOGLE MAPS</span>
                    </div>
                    <p className="font-serifBody text-sm text-neutral-800 leading-relaxed">
                      Evaluation of your Google Business Profile rankings, local keyword coverage, and map pack placement in Jaipur.
                    </p>
                  </div>

                  <div className="p-5 border-2 border-black bg-white space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-black font-bold uppercase">
                      <Check size={16} strokeWidth={2} />
                      <span>ADVERTISING & SEARCH INTENT</span>
                    </div>
                    <p className="font-serifBody text-sm text-neutral-800 leading-relaxed">
                      Review of your current or planned Google Search & Instagram ad campaigns for budget leaks and audience targeting.
                    </p>
                  </div>

                  <div className="p-5 border-2 border-black bg-white space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-black font-bold uppercase">
                      <Check size={16} strokeWidth={2} />
                      <span>WEBSITE LANDING & CONVERSION</span>
                    </div>
                    <p className="font-serifBody text-sm text-neutral-800 leading-relaxed">
                      Audit of page load speed, mobile UX, enquiry forms, and CTA clarity across smartphone devices.
                    </p>
                  </div>
                </div>

                {/* Honest Audit Guarantee */}
                <div className="p-4 border-2 border-black bg-neutral-100 flex items-center space-x-3 text-xs font-mono font-bold text-black uppercase tracking-widest">
                  <ShieldCheck size={16} className="text-black shrink-0" />
                  <span>Free analysis delivered within 24 business hours. No pushy sales calls.</span>
                </div>
              </div>

              {/* Right Side: Audit Form (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-widest block">
                    ENTER BUSINESS DETAILS
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase">
                    Custom Diagnostic Request
                  </h2>
                </div>

                <GrowthAuditForm />
              </div>
            </div>
          </MonochromeSection>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}

