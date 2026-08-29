import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';
import { servicesData } from '@/data/services';
import { prisma } from '@/lib/site-settings';

export const metadata: Metadata = {
  title: 'Digital Marketing & Growth Services in Jaipur | Creativee World',
  description: 'Explore Creativee World\'s core growth services: Performance Marketing, Local SEO, Social Media & Reels, Business Websites, and Integrated Growth Packages in Jaipur.',
  openGraph: {
    title: 'Digital Marketing Services in Jaipur | Creativee World',
    description: 'Connected digital growth services engineered to drive qualified leads, local search dominance, and business growth for Jaipur companies.',
  },
};

export default async function ServicesPage() {
  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  } catch (e) {
    console.error('Failed to load services from database:', e);
  }

  const listToRender = dbServices.length > 0
    ? dbServices.map((s, idx) => ({
        id: s.id,
        number: `0${idx + 1}`,
        kicker: s.category || 'Capability Offering',
        title: s.title,
        description: s.description,
        outcomeStatement: s.pricing || 'High ROI Scalability',
        deliverables: ['Custom Growth Blueprint', 'Dedicated Campaign Lead', 'Real-Time ROI Dashboard'],
        slug: s.slug,
        ctaLabel: `Explore ${s.title}`,
      }))
    : servicesData;

  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        <Navbar />

        <main className="pt-32 pb-20">
          {/* Ambient Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

          {/* 1. HERO SECTION */}
          <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="space-y-8">
              <RevealOnScroll variant="fade-up">
                <CWBadge variant="cyan">
                  <Sparkles size={13} />
                  <span>Digital Services & Capabilities</span>
                </CWBadge>
              </RevealOnScroll>

              <div className="space-y-4 max-w-4xl">
                <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                  Connected digital <br />
                  <span className="text-cw-gradient">growth services.</span>
                </h1>

                <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed pt-2">
                  Traditional agencies sell isolated marketing tasks. Creativee World delivers a connected growth system where web engineering, video production, local SEO, and paid acquisition compound to drive enterprise revenue.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>Request Service Audit</span>
                    <ArrowUpRight size={18} />
                  </CWButton>
                </Link>
              </div>
            </div>
          </section>

          {/* 2. SERVICES LISTING SECTION */}
          <section className="relative z-10 py-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
            {listToRender.map((service, idx) => (
              <RevealOnScroll key={service.id} variant="fade-up" delay={idx * 0.1}>
                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 space-y-8 group">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs font-bold text-[#00CFFF] bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                          {service.number}
                        </span>
                        <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
                          {service.kicker}
                        </span>
                      </div>

                      <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
                        {service.title}
                      </h2>

                      <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                        {service.description}
                      </p>

                      <div className="p-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
                        <span>BENCHMARK METRIC: {service.outcomeStatement}</span>
                      </div>
                    </div>

                    {/* Deliverables List */}
                    <div className="lg:w-96 space-y-4 rounded-2xl border border-white/15 bg-slate-950/80 p-6">
                      <span className="text-xs font-mono uppercase text-[#00CFFF] font-semibold block tracking-wider border-b border-white/10 pb-2">
                        KEY SYSTEM DELIVERABLES:
                      </span>
                      <ul className="space-y-2.5 text-xs text-slate-300 font-light">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Check size={14} className="text-[#00CFFF] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t border-white/10">
                        <Link href={`/services/${service.slug}`}>
                          <CWButton variant="glass" size="md" className="w-full justify-center">
                            <span>{service.ctaLabel || `Explore ${service.title || 'Capability'}`}</span>
                            <ArrowUpRight size={14} />
                          </CWButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </section>

          {/* 3. BOTTOM CTA SECTION */}
          <section className="relative z-10 py-24 bg-slate-950/80 border-t border-white/10 text-center">
            <div className="max-w-3xl mx-auto px-6 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#00CFFF] font-semibold block">
                STRATEGIC CONSULTATION
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Uncertain Which Service Fits Your Stage?
              </h2>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-light max-w-xl mx-auto">
                Request a custom Growth Audit. Our strategy team will diagnose your acquisition bottlenecks and recommend the optimal setup.
              </p>
              <div className="pt-4 flex justify-center">
                <Link href="/growth-audit">
                  <CWButton variant="gradient" size="lg">
                    <span>Request Growth Audit</span>
                    <ArrowUpRight size={16} />
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
