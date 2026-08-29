import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, HelpCircle, ArrowUpRight, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Container } from '@/components/ui/Container';
import { RevealText } from '@/components/motion/RevealText';
import { servicesData } from '@/data/services';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found | Creativee World',
    };
  }

  return {
    title: `${service.title} in Jaipur | Creativee World Growth Agency`,
    description: service.description,
    openGraph: {
      title: `${service.title} in Jaipur | Creativee World Growth Agency`,
      description: service.description,
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    provider: {
      '@type': 'Organization',
      name: 'Creativee World',
      url: 'https://creativeworld.in',
    },
    areaServed: {
      '@type': 'City',
      name: 'Jaipur',
    },
    description: service.description,
  };

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="relative min-h-screen bg-[#07090E] text-white font-sans selection:bg-[#00CFFF] selection:text-black">
        <Navbar />

        <main className="pt-24 pb-20">
          {/* 1. HERO SECTION */}
          <section className="relative py-16 md:py-24 border-b border-white/10 overflow-hidden">
            {/* Ambient Spectrum Glow */}
            <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] bg-[#1769FF]/15 blur-[160px] rounded-full z-0" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00CFFF]/10 blur-[150px] rounded-full z-0" />

            <Container variant="wide" className="relative z-10 space-y-8">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-white/10 shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#00CFFF] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
                  SERVICE SPECIFICATION — {service.kicker}
                </span>
              </div>

              <RevealText>
                <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-8xl uppercase tracking-tight text-white leading-tight">
                  {service.title}<span className="text-[#00CFFF]">.</span>
                </h1>
              </RevealText>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4 border-t border-white/10">
                <div className="lg:col-span-8">
                  <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-300 font-normal">
                    {service.fullDescription}
                  </p>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link href="/growth-audit">
                    <button className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#00CFFF] text-[#050608] font-bold text-sm uppercase tracking-wider hover:bg-[#33d6ff] transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(0,207,255,0.3)]">
                      <span>Request Audit for {service.title}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>

          {/* 2. MEDIA PREVIEW */}
          {service.image && (
            <section className="py-12 border-b border-white/10 bg-[#0A0E17]/60">
              <Container variant="wide">
                <div className="relative h-72 sm:h-[480px] w-full rounded-3xl border border-white/15 overflow-hidden shadow-2xl bg-slate-900">
                  <Image
                    src={service.image}
                    alt={`${service.title} visual - Creativee World`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090E]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </Container>
            </section>
          )}

          {/* 3. ADVANTAGES & DELIVERABLES */}
          <section className="py-20 border-b border-white/10 relative">
            <Container variant="wide">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Advantages */}
                <div className="space-y-6">
                  <span className="font-mono text-xs font-bold text-[#00CFFF] uppercase tracking-widest block">
                    01 / BUSINESS ADVANTAGES
                  </span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-tight">
                    Why Your Business Needs This Growth Pillar
                  </h2>
                  <ul className="space-y-4 pt-2">
                    {service.keyBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 transition-colors">
                        <div className="p-1 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/30 text-[#00CFFF] shrink-0 mt-0.5">
                          <Check size={16} strokeWidth={2.5} />
                        </div>
                        <span className="text-base text-slate-200 font-normal leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div className="space-y-6">
                  <span className="font-mono text-xs font-bold text-[#00CFFF] uppercase tracking-widest block">
                    02 / WHAT WE DELIVER
                  </span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-tight">
                    Core Campaign Deliverables
                  </h2>
                  <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/15 backdrop-blur-md space-y-6 shadow-2xl">
                    <ul className="space-y-4">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-4 text-base text-slate-200">
                          <span className="font-mono text-xs text-[#00CFFF] bg-[#00CFFF]/10 border border-[#00CFFF]/30 rounded-lg px-2.5 py-1 font-bold shrink-0 mt-0.5">
                            0{idx + 1}
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* 4. EXECUTION PROTOCOL */}
          <section className="py-20 border-b border-white/10 bg-[#0A0E17]/40 relative">
            <Container variant="wide" className="space-y-12">
              <div className="max-w-2xl space-y-3">
                <span className="font-mono text-xs font-bold text-[#00CFFF] uppercase tracking-widest block">
                  03 / EXECUTION PROTOCOL
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  How We Execute This Service
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {service.processOverview.map((step, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md hover:border-[#00CFFF]/40 transition-all duration-300 space-y-3 group">
                    <span className="font-mono text-xs font-bold text-[#00CFFF] border border-[#00CFFF]/30 px-2.5 py-1 rounded-md bg-[#00CFFF]/10 inline-block">
                      STEP 0{idx + 1}
                    </span>
                    <p className="text-sm text-slate-200 font-medium leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* 5. SERVICE FAQS */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="py-20 border-b border-white/10 relative">
              <Container variant="wide">
                <div className="max-w-3xl mx-auto space-y-12">
                  <div className="space-y-3 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold bg-slate-900/80 backdrop-blur-md mx-auto">
                      <HelpCircle size={14} className="text-[#00CFFF]" />
                      <span>04 / FREQUENTLY ASKED QUESTIONS</span>
                    </div>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-tight">
                      Service FAQs
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-3">
                        <h3 className="font-display font-bold text-xl text-white">
                          {faq.question}
                        </h3>
                        <p className="text-base text-slate-300 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </section>
          )}

          {/* 6. BOTTOM SPECTRUM CTA */}
          <section className="py-24 relative overflow-hidden text-center">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1769FF]/20 via-[#00CFFF]/20 to-[#D900FF]/20 blur-[120px]" />

            <Container variant="wide" className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#00CFFF] font-semibold block">
                STRATEGIC IMPLEMENTATION
              </span>
              <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight uppercase leading-none">
                Ready to Implement {service.title}?
              </h2>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto font-normal">
                Request a free growth audit to discuss your business goals, target audience, and ad requirements with our strategic team.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <button className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#00CFFF] text-[#050608] font-bold text-sm uppercase tracking-wider hover:bg-[#33d6ff] transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(0,207,255,0.4)]">
                    <span>Get Started with Audit</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </button>
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
