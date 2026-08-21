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
      title: 'Service Not Found | Surnax Technologies',
    };
  }

  return {
    title: `${service.title} | Surnax Technologies`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Surnax Technologies Studio`,
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
      name: 'Surnax Technologies',
      url: 'https://surnaxtech.com',
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
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <Navbar />

        <main>
          {/* 1. EDITORIAL HERO SECTION */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
                <span>SERVICE SPECIFICATION — {service.kicker}</span>
              </div>

              <h1 className="font-serif font-bold text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                {service.title}<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-8">
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal">
                    {service.fullDescription}
                  </p>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <Link href="/growth-audit">
                    <MonochromeButton variant="primary" showArrow>
                      Request Audit for {service.title}
                    </MonochromeButton>
                  </Link>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 2. EDITORIAL MEDIA PREVIEW */}
          {service.image && (
            <div className="border-b-4 border-black bg-neutral-100 p-6 sm:p-12">
              <div className="max-w-6xl mx-auto relative h-72 sm:h-[450px] w-full border-4 border-black bg-white">
                <Image
                  src={service.image}
                  alt={`${service.title} editorial visual - Surnax Technologies`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                  priority
                />
              </div>
            </div>
          )}

          {/* 3. ADVANTAGES & DELIVERABLES */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Advantages */}
              <div className="space-y-6">
                <span className="font-mono text-xs font-bold text-neutral-600 uppercase tracking-widest block">
                  01 / BUSINESS ADVANTAGES
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase">
                  Why Your Business Needs This Growth Pillar
                </h2>
                <ul className="space-y-4">
                  {service.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-3 p-4 border-2 border-black bg-white">
                      <Check size={18} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
                      <span className="font-serifBody text-base text-black font-normal">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="space-y-6">
                <span className="font-mono text-xs font-bold text-neutral-600 uppercase tracking-widest block">
                  02 / WHAT WE DELIVER
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase">
                  Core Campaign Deliverables
                </h2>
                <div className="p-8 border-4 border-black bg-white space-y-4">
                  <ul className="space-y-4 font-serifBody">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-base text-black">
                        <span className="font-mono text-xs text-black border border-black px-2 py-0.5 font-bold shrink-0 mt-0.5">0{idx + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </MonochromeSection>

          {/* 4. EXECUTION PROTOCOL */}
          <MonochromeSection divider="thick" texture="lines">
            <div className="space-y-12">
              <div className="max-w-2xl space-y-3">
                <span className="font-mono text-xs font-bold text-black uppercase tracking-widest block">
                  03 / EXECUTION PROTOCOL
                </span>
                <h2 className="font-serif font-bold text-4xl text-black uppercase">
                  How We Execute This Service
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {service.processOverview.map((step, idx) => (
                  <div key={idx} className="p-6 border-2 border-black bg-white space-y-3">
                    <span className="font-mono text-xs font-bold text-black border-2 border-black px-2 py-0.5 bg-neutral-100 inline-block">STEP 0{idx + 1}</span>
                    <p className="font-serifBody text-sm text-black font-semibold leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </MonochromeSection>

          {/* 5. SERVICE FAQS */}
          {service.faqs && service.faqs.length > 0 && (
            <MonochromeSection divider="thick" texture="grid">
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs uppercase tracking-widest text-black font-bold bg-white mx-auto">
                    <HelpCircle size={14} />
                    <span>04 / FREQUENTLY ASKED QUESTIONS</span>
                  </div>
                  <h2 className="font-serif font-bold text-4xl text-black uppercase">
                    Service FAQs
                  </h2>
                </div>

                <div className="space-y-6">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="p-6 border-2 border-black bg-white space-y-2">
                      <h3 className="font-serif font-bold text-xl text-black uppercase">
                        {faq.question}
                      </h3>
                      <p className="font-serifBody text-base text-neutral-800 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </MonochromeSection>
          )}

          {/* 6. INVERTED BOTTOM CTA */}
          <MonochromeSection inverted divider="none" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                STRATEGIC IMPLEMENTATION
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none uppercase">
                Ready to Implement {service.title}?
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                Request a free growth audit to discuss your business goals, target audience, and ad requirements with our strategic team.
              </p>
              <div className="pt-4">
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    Get Started with Audit
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

