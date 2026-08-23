import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, HelpCircle, ArrowLeft, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { INDUSTRY_CASE_STUDIES, getIndustryBySlug } from '@/data/industryCaseStudies';
import { IndustryVisualPreview } from '@/components/ui/IndustryVisualPreview';
import { BeforeAfterVisualizer } from '@/components/ui/BeforeAfterVisualizer';

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const paramsList: { slug: string }[] = [];
  
  INDUSTRY_CASE_STUDIES.forEach((ind) => {
    paramsList.push({ slug: ind.slug });
    if (ind.aliases) {
      ind.aliases.forEach((alias) => {
        paramsList.push({ slug: alias });
      });
    }
  });

  return paramsList;
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug);

  if (!industry) {
    return {
      title: 'Industry Case Study Not Found | Surnax Technologies',
    };
  }

  return {
    title: `${industry.industryName} Case Study & Digital System | Surnax Technologies`,
    description: industry.shortProblem,
    openGraph: {
      title: `${industry.industryName} Case Study: ${industry.title} | Surnax`,
      description: industry.shortProblem,
    },
    alternates: {
      canonical: `https://surnax.com/industries/${industry.slug}`,
    },
  };
}

export default function IndustryDetailPage({ params }: IndustryPageProps) {
  const caseStudy = getIndustryBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  // JSON-LD Structured Data Schema for single Case Study / Tech Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': `${caseStudy.industryName}: ${caseStudy.title}`,
    'description': caseStudy.shortProblem,
    'articleSection': caseStudy.category,
    'publisher': {
      '@type': 'Organization',
      'name': 'Surnax Technologies',
      'logo': 'https://surnax.com/icon.png'
    }
  };

  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Navbar />

        <main id="main-content">
          {/* 1. EDITORIAL HEADER & NAVIGATION */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                <Link 
                  href="/industries"
                  className="inline-flex items-center gap-2 text-black hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                >
                  <ArrowLeft size={14} />
                  <span>BACK TO ALL 18 CASE STUDIES</span>
                </Link>

                <span className="px-2.5 py-0.5 border border-black bg-neutral-100 text-black">
                  SECTOR DOSSIER — {caseStudy.kicker}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1 bg-black text-white font-mono text-xs font-bold uppercase tracking-wider">
                  {caseStudy.category}
                </span>
                <span className="px-3 py-1 bg-[#B8FF2C] text-black font-mono text-xs font-bold uppercase tracking-wider border border-black">
                  {caseStudy.industryName}
                </span>
              </div>

              <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-tight text-black my-2">
                {caseStudy.title}<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal max-w-4xl">
                {caseStudy.overview}
              </p>
            </div>
          </MonochromeSection>

          {/* 2. DYNAMIC SYSTEM CONCEPT VISUAL */}
          <MonochromeSection divider="thick" texture="grid" className="bg-neutral-50">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-neutral-600">
                <span>05 / DIGITAL EXPERIENCE MOCKUP</span>
                <span>SYSTEM SPECIFICATION</span>
              </div>
              <IndustryVisualPreview
                concept={caseStudy.visualConcept}
                industryName={caseStudy.industryName}
                className="max-w-4xl mx-auto border-4 border-black"
              />
            </div>
          </MonochromeSection>

          {/* 3. BUSINESS BOTTLENECKS & SURNAX SOLUTIONS GRID */}
          <MonochromeSection divider="thick" texture="none">
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* Sector Bottlenecks */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <span className="w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center font-bold">02</span>
                    <span>BUSINESS BOTTLENECKS</span>
                  </div>
                  
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight leading-none text-black">
                    Typical Industry Challenges
                  </h2>

                  <p className="font-serifBody text-base text-neutral-700">
                    {caseStudy.businessChallenge.summary}
                  </p>

                  <div className="space-y-4">
                    {caseStudy.businessChallenge.points.map((challenge, idx) => (
                      <div key={idx} className="p-6 border-2 border-black bg-neutral-50 space-y-2 hover:bg-white transition-colors duration-100">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-red-600">
                          <span className="w-5 h-5 border border-black bg-white flex items-center justify-center text-black font-bold text-[10px]">✕</span>
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
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <span className="w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center font-bold">03</span>
                    <span>SURNAX SOLUTION STRATEGY</span>
                  </div>

                  <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight leading-none text-black">
                    Our Sector Engineering Approach
                  </h2>

                  <p className="font-serifBody text-base text-neutral-700">
                    {caseStudy.surnaxSolution.summary}
                  </p>

                  <div className="space-y-4">
                    {caseStudy.surnaxSolution.points.map((point, idx) => (
                      <div key={idx} className="p-6 border-2 border-black bg-white group hover:bg-black hover:text-white transition-colors duration-100 space-y-2">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-neutral-500 group-hover:text-neutral-400">
                          <Check size={16} strokeWidth={2} className="text-black group-hover:text-[#B8FF2C] transition-colors duration-100" />
                          <span>PILLAR 0{idx + 1}</span>
                        </div>
                        <p className="font-serifBody text-base leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </MonochromeSection>

          {/* 4. BEFORE / AFTER TRANSFORMATION */}
          <MonochromeSection divider="thick" texture="grid" className="bg-neutral-50">
            <BeforeAfterVisualizer
              beforePoints={caseStudy.transformation.before}
              afterPoints={caseStudy.transformation.after}
              title={`Transforming ${caseStudy.industryName}`}
            />
          </MonochromeSection>

          {/* 5. POTENTIAL IMPACT & TECH STACK */}
          <MonochromeSection divider="thick" texture="lines" className="bg-white">
            <div className="space-y-12 max-w-4xl mx-auto">
              
              <div className="text-center space-y-3">
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-neutral-500 block">
                  07 / PROJECTED OPERATIONAL IMPACT
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-5xl tracking-tight text-black">
                  Potential Business Benefits
                </h2>
                <p className="font-serifBody text-sm text-neutral-600 italic">
                  {caseStudy.potentialImpact.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {caseStudy.potentialImpact.highlights.map((item, idx) => (
                  <div key={idx} className="p-6 border-2 border-black bg-neutral-50 text-center space-y-2">
                    <div className="font-mono text-[10px] uppercase font-bold text-neutral-500 tracking-widest">{item.label}</div>
                    <div className="font-serif font-bold text-2xl text-black">{item.value}</div>
                    <div className="font-serifBody text-xs text-neutral-600">{item.subtext}</div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t-2 border-black space-y-4">
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-neutral-500 block text-center">
                  08 / SYSTEM TECH STACK
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {caseStudy.technologyStack.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 border-2 border-black bg-neutral-100 font-mono text-xs font-bold text-black flex items-center gap-2">
                      <Cpu size={14} className="text-black" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </MonochromeSection>

          {/* 6. FAQS SECTION */}
          {caseStudy.faqs && caseStudy.faqs.length > 0 && (
            <MonochromeSection divider="thick" texture="noise" className="bg-neutral-50">
              <div className="space-y-12 max-w-4xl mx-auto">
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black font-mono text-xs uppercase tracking-widest font-bold bg-white">
                    <HelpCircle size={14} strokeWidth={1.5} />
                    <span>SECTOR INQUIRIES &amp; INSIGHTS</span>
                  </div>
                  <h2 className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-black pt-2">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-6">
                  {caseStudy.faqs.map((faq, idx) => (
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

          {/* 7. INVERTED BOTTOM CTA SECTION */}
          <MonochromeSection inverted divider="ultra" texture="cta" className="text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
                09 / STRATEGIC ENGAGEMENT
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none text-white">
                Build Something Better With Surnax
              </h2>
              <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
                Ready to engineer a high-converting digital system for your {caseStudy.industryName} business?
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <MonochromeButton variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-black" showArrow>
                    Start Your Project
                  </MonochromeButton>
                </Link>
                <Link href="/industries">
                  <MonochromeButton variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-black">
                    Explore Other 17 Industries
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
