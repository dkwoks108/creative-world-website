import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, HelpCircle, ArrowLeft, Cpu, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Container } from '@/components/ui/Container';
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
      title: 'Industry Case Study Not Found | Creativee World',
    };
  }

  return {
    title: `${industry.industryName} Case Study & Digital System | Creativee World`,
    description: industry.shortProblem,
    openGraph: {
      title: `${industry.industryName} Case Study: ${industry.title} | Creativee World`,
      description: industry.shortProblem,
    },
    alternates: {
      canonical: `https://creativeworld.in/industries/${industry.slug}`,
    },
  };
}

export default function IndustryDetailPage({ params }: IndustryPageProps) {
  const caseStudy = getIndustryBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': `${caseStudy.industryName}: ${caseStudy.title}`,
    'description': caseStudy.shortProblem,
    'articleSection': caseStudy.category,
    'publisher': {
      '@type': 'Organization',
      'name': 'Creativee World',
      'logo': 'https://creativeworld.in/icon.png'
    }
  };

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative min-h-screen bg-[#07090E] text-white font-sans selection:bg-[#00CFFF] selection:text-black">
        <Navbar />

        <main id="main-content" className="pt-24 pb-20">
          {/* 1. HERO HEADER & NAVIGATION */}
          <section className="relative py-16 md:py-24 border-b border-white/10 overflow-hidden">
            <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] bg-[#1769FF]/15 blur-[160px] rounded-full z-0" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00CFFF]/10 blur-[150px] rounded-full z-0" />

            <Container variant="wide" className="relative z-10 space-y-6">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
                <Link 
                  href="/industries"
                  className="inline-flex items-center gap-2 text-[#00CFFF] hover:underline underline-offset-4"
                >
                  <ArrowLeft size={14} />
                  <span>BACK TO ALL 18 CASE STUDIES</span>
                </Link>

                <span className="px-3 py-1 rounded-full border border-white/10 bg-slate-900/80 text-slate-300">
                  SECTOR DOSSIER — {caseStudy.kicker}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1 bg-[#1769FF] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-md">
                  {caseStudy.category}
                </span>
                <span className="px-3 py-1 bg-[#00CFFF]/10 text-[#00CFFF] font-mono text-xs font-bold uppercase tracking-wider border border-[#00CFFF]/30 rounded-md">
                  {caseStudy.industryName}
                </span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-tight text-white my-2">
                {caseStudy.title}<span className="text-[#00CFFF]">.</span>
              </h1>

              <div className="w-full h-px bg-white/10 my-4" />

              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-300 font-normal max-w-4xl">
                {caseStudy.overview}
              </p>
            </Container>
          </section>

          {/* 2. DYNAMIC SYSTEM CONCEPT VISUAL */}
          <section className="py-16 border-b border-white/10 bg-[#0A0E17]/60">
            <Container variant="wide" className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
                <span>05 / DIGITAL EXPERIENCE MOCKUP</span>
                <span>SYSTEM SPECIFICATION</span>
              </div>
              <IndustryVisualPreview
                concept={caseStudy.visualConcept}
                industryName={caseStudy.industryName}
                className="max-w-4xl mx-auto border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              />
            </Container>
          </section>

          {/* 3. BUSINESS BOTTLENECKS & CREATIVEE WORLD SOLUTIONS GRID */}
          <section className="py-20 border-b border-white/10 bg-[#07090E]">
            <Container variant="wide">
              <div className="space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  
                  {/* Sector Bottlenecks */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="w-5 h-5 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/30 text-[#00CFFF] flex items-center justify-center font-bold text-[10px]">02</span>
                      <span>BUSINESS BOTTLENECKS</span>
                    </div>
                    
                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-none text-white uppercase">
                      Typical Industry Challenges
                    </h2>

                    <p className="text-base text-slate-300">
                      {caseStudy.businessChallenge.summary}
                    </p>

                    <div className="space-y-4">
                      {caseStudy.businessChallenge.points.map((challenge, idx) => (
                        <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-2">
                          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-rose-400">
                            <span className="w-5 h-5 rounded-md border border-rose-500/30 bg-rose-500/10 flex items-center justify-center text-rose-400 font-bold text-[10px]">✕</span>
                            <span>CHALLENGE 0{idx + 1}</span>
                          </div>
                          <p className="text-base text-slate-200 leading-relaxed">
                            {challenge}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategy Points */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="w-5 h-5 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/30 text-[#00CFFF] flex items-center justify-center font-bold text-[10px]">03</span>
                      <span>CREATIVEE SOLUTION STRATEGY</span>
                    </div>

                    <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-none text-white uppercase">
                      Our Sector Engineering Approach
                    </h2>

                    <p className="text-base text-slate-300">
                      {caseStudy.creativeeSolution.summary}
                    </p>

                    <div className="space-y-4">
                      {caseStudy.creativeeSolution.points.map((point, idx) => (
                        <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-2 hover:border-[#00CFFF]/40 transition-colors">
                          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-[#00CFFF]">
                            <Check size={16} strokeWidth={2} className="text-[#00CFFF]" />
                            <span>PILLAR 0{idx + 1}</span>
                          </div>
                          <p className="text-base text-slate-200 leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </Container>
          </section>

          {/* 4. BEFORE / AFTER TRANSFORMATION */}
          <section className="py-20 border-b border-white/10 bg-[#0A0E17]/60">
            <Container variant="wide">
              <BeforeAfterVisualizer
                beforePoints={caseStudy.transformation.before}
                afterPoints={caseStudy.transformation.after}
                title={`Transforming ${caseStudy.industryName}`}
              />
            </Container>
          </section>

          {/* 5. POTENTIAL IMPACT & TECH STACK */}
          <section className="py-20 border-b border-white/10 bg-[#07090E]">
            <Container variant="wide" className="space-y-12 max-w-4xl mx-auto">
              
              <div className="text-center space-y-3">
                <span className="font-mono text-xs uppercase font-semibold tracking-widest text-[#00CFFF] block">
                  07 / PROJECTED OPERATIONAL IMPACT
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white uppercase">
                  Potential Business Benefits
                </h2>
                <p className="text-sm text-slate-400 italic">
                  {caseStudy.potentialImpact.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {caseStudy.potentialImpact.highlights.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md text-center space-y-2">
                    <div className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.label}</div>
                    <div className="font-display font-bold text-3xl text-[#00CFFF]">{item.value}</div>
                    <div className="text-xs text-slate-300">{item.subtext}</div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 space-y-4">
                <span className="font-mono text-xs uppercase font-semibold tracking-widest text-slate-400 block text-center">
                  08 / SYSTEM TECH STACK
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {caseStudy.technologyStack.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-xl border border-white/10 bg-slate-800 font-mono text-xs font-bold text-slate-200 flex items-center gap-2">
                      <Cpu size={14} className="text-[#00CFFF]" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

            </Container>
          </section>

          {/* 6. FAQS SECTION */}
          {caseStudy.faqs && caseStudy.faqs.length > 0 && (
            <section className="py-20 border-b border-white/10 bg-[#0A0E17]/60">
              <Container variant="wide" className="space-y-12 max-w-4xl mx-auto">
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 font-mono text-xs uppercase tracking-widest font-bold bg-slate-900/80 text-slate-300">
                    <HelpCircle size={14} className="text-[#00CFFF]" />
                    <span>SECTOR INQUIRIES &amp; INSIGHTS</span>
                  </div>
                  <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-white pt-2 uppercase">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-6">
                  {caseStudy.faqs.map((faq, idx) => (
                    <div key={idx} className="p-8 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-3">
                      <h3 className="font-display font-bold text-xl text-white">
                        {faq.question}
                      </h3>
                      <p className="text-base text-slate-300 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </Container>
            </section>
          )}

          {/* 7. BOTTOM CTA SECTION */}
          <section className="py-24 relative overflow-hidden text-center bg-[#07090E]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1769FF]/20 via-[#00CFFF]/20 to-[#D900FF]/20 blur-[120px]" />

            <Container variant="wide" className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#00CFFF] font-bold block">
                09 / STRATEGIC ENGAGEMENT
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-none text-white uppercase">
                Build Something Better With Creativee World
              </h2>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
                Ready to engineer a high-converting digital system for your {caseStudy.industryName} business?
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <button className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#00CFFF] text-[#050608] font-bold text-sm uppercase tracking-wider hover:bg-[#33d6ff] transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(0,207,255,0.3)]">
                    <span>Start Your Project</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </button>
                </Link>
                <Link href="/industries">
                  <button className="px-8 py-4 rounded-full border border-white/15 bg-slate-800/80 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-widest font-bold transition-all">
                    Explore Other 17 Industries
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
