import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { industriesData } from '@/data/industries';

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return industriesData.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = industriesData.find((i) => i.slug === params.slug);

  if (!industry) {
    return {
      title: 'Industry Strategy Not Found | Surnax Technologies',
    };
  }

  return {
    title: `${industry.title} Growth Strategy | Surnax Technologies`,
    description: industry.shortDescription,
    openGraph: {
      title: `${industry.title} Growth Strategy | Surnax Technologies`,
      description: industry.shortDescription,
    },
  };
}

export default function IndustryDetailPage({ params }: IndustryPageProps) {
  const industry = industriesData.find((i) => i.slug === params.slug);

  if (!industry) {
    notFound();
  }

  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <Navbar />

        <main>
          {/* 1. EDITORIAL HERO HEADER */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
                  <span>SECTOR DOSSIER — {industry.kicker}</span>
                </div>
                <Link href="/industries" className="hover:underline underline-offset-4 text-black">
                  ← Back to All Sectors
                </Link>
              </div>

              <h1 className="font-serif font-bold text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-none text-black my-4">
                {industry.title}<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal max-w-4xl">
                {industry.overview}
              </p>
            </div>
          </MonochromeSection>

          {/* 2. EDITORIAL HERO IMAGE */}
          {industry.image && (
            <MonochromeSection divider="thick" texture="none" className="!py-12 bg-neutral-50">
              <div className="border-4 border-black p-4 bg-white">
                <div className="relative h-64 sm:h-96 md:h-[480px] w-full overflow-hidden border-2 border-black bg-neutral-100">
                  <Image
                    src={industry.image}
                    alt={`${industry.title} growth strategy editorial image - Jaipur`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 gap-2 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                  <span>STRATEGY ASSET — {industry.title}</span>
                  <span>COMMERCIAL DIRECTION / JAIPUR, RAJASTHAN</span>
                </div>
              </div>
            </MonochromeSection>
          )}

          {/* 3. BOTTLENECKS & SOLUTION PLAYBOOK GRID */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Sector Bottlenecks */}
                <div className="space-y-6">
                  <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest block">
                    01 / SECTOR BOTTLENECKS
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight leading-none text-black">
                    Growth Challenges in Jaipur
                  </h2>
                  <div className="w-12 h-1 bg-black mb-6" />
                  <div className="space-y-4">
                    {industry.growthChallenges.map((challenge, idx) => (
                      <div key={idx} className="p-6 border-2 border-black bg-white space-y-2 hover:bg-neutral-50 transition-colors duration-100">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-neutral-500">
                          <span className="w-5 h-5 border border-black flex items-center justify-center text-black font-bold text-[10px]">✕</span>
                          <span>CHALLENGE 0{idx + 1}</span>
                        </div>
                        <p className="font-serifBody text-base text-black leading-relaxed">
                          {challenge}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategy Points */}
                <div className="space-y-6">
                  <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest block">
                    02 / RECOMMENDED PLAYBOOK
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight leading-none text-black">
                    Our Sector Solution
                  </h2>
                  <div className="w-12 h-1 bg-black mb-6" />
                  <div className="space-y-4">
                    {industry.strategyPoints.map((point, idx) => (
                      <div key={idx} className="p-6 border-2 border-black bg-white group hover:bg-black hover:text-white transition-colors duration-100 space-y-2">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-neutral-500 group-hover:text-neutral-400">
                          <Check size={16} strokeWidth={2} className="text-black group-hover:text-white transition-colors duration-100" />
                          <span>STRATEGY 0{idx + 1}</span>
                        </div>
                        <p className="font-serifBody text-base leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Playbook Link */}
              {industry.playbookSlug && (
                <div className="p-8 bg-black text-white border-4 border-black flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="font-mono text-xs text-neutral-400 uppercase font-bold tracking-widest">
                      STRATEGIC FRAMEWORK DISPATCH
                    </span>
                    <h3 className="font-serif text-2xl font-bold tracking-tight">
                      Explore the execution playbook for {industry.title}
                    </h3>
                  </div>
                  <Link href={`/work/${industry.playbookSlug}`}>
                    <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                      View Framework
                    </MonochromeButton>
                  </Link>
                </div>
              )}
            </div>
          </MonochromeSection>

          {/* 4. SECTOR FAQS SECTION */}
          {industry.faqs && industry.faqs.length > 0 && (
            <MonochromeSection divider="thick" texture="noise">
              <div className="space-y-12 max-w-4xl mx-auto">
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black font-mono text-xs uppercase tracking-widest font-bold bg-white">
                    <HelpCircle size={14} strokeWidth={1.5} />
                    <span>SECTOR INQUIRIES & INSIGHTS</span>
                  </div>
                  <h2 className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-black pt-2">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-6">
                  {industry.faqs.map((faq, idx) => (
                    <div key={idx} className="p-8 border-2 border-black bg-white space-y-3 hover:bg-neutral-50 transition-colors duration-100">
                      <h3 className="font-serif font-bold text-xl text-black">
                        {faq.question}
                      </h3>
                      <p className="font-serifBody text-base text-neutral-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </MonochromeSection>
          )}

          {/* 5. INVERTED BOTTOM CTA SECTION */}
          <MonochromeSection inverted divider="ultra" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                STRATEGIC ENGAGEMENT
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none">
                Accelerate Growth for Your {industry.title}
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                Request a free growth audit to review your current channel presence, local search ranking, and lead generation pipeline.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    Schedule Free Sector Audit
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

