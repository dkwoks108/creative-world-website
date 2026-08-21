import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
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
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <Navbar />

        <main>
          {/* 1. EDITORIAL HERO SECTION */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
                <span>DIGITAL SERVICES & CAPABILITIES</span>
              </div>

              <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                CONNECTED DIGITAL<br />
                GROWTH SERVICES<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal">
                    Traditional agencies sell isolated marketing tasks. Surnax Technologies delivers a connected growth system where web engineering, video production, local SEO, and paid acquisition compound to drive enterprise growth.
                  </p>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link href="/growth-audit">
                    <MonochromeButton variant="primary" showArrow>
                      Request Service Audit
                    </MonochromeButton>
                  </Link>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 2. SERVICES LISTING SECTION */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="space-y-12">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  className="p-8 sm:p-12 border-4 border-black bg-white space-y-8 group transition-colors duration-100 hover:bg-neutral-50"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm font-bold text-black border-2 border-black px-2.5 py-0.5 bg-white">
                          {service.number}
                        </span>
                        <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest font-bold">
                          {service.kicker}
                        </span>
                      </div>

                      <h2 className="font-serif font-bold text-3xl sm:text-5xl text-black uppercase tracking-tight">
                        {service.title}
                      </h2>

                      <p className="font-serifBody text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
                        {service.description}
                      </p>

                      <div className="p-4 border-2 border-black bg-neutral-100 font-mono text-xs text-black font-bold uppercase tracking-widest">
                        <span>EXPECTED OUTCOME: {service.outcomeStatement}</span>
                      </div>
                    </div>

                    {/* Deliverables List */}
                    <div className="lg:w-96 space-y-4 border-2 border-black bg-white p-6">
                      <span className="text-xs font-mono uppercase text-black font-bold block tracking-widest">
                        KEY DELIVERABLES:
                      </span>
                      <ul className="space-y-2.5 text-xs font-serifBody text-neutral-800">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Check size={14} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t-2 border-black">
                        <Link href={`/services/${service.slug}`}>
                          <MonochromeButton variant="secondary" className="w-full justify-center" showArrow>
                            {service.ctaLabel}
                          </MonochromeButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MonochromeSection>

          {/* 3. INVERTED BOTTOM CTA SECTION */}
          <MonochromeSection inverted divider="none" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                STRATEGIC CONSULTATION
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none uppercase">
                Uncertain Which Service Your Business Needs?
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Request a free 2-Step Growth Audit. Our strategic team will diagnose your channel bottlenecks and recommend the optimal growth setup for your business.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    Request Free Growth Audit
                  </MonochromeButton>
                </Link>
              </div>
            </div>
          </MonochromeSection>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}

