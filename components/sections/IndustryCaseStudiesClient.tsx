'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, RefreshCw, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';
import { INDUSTRY_CASE_STUDIES, getAllIndustryCategories, IndustryCaseStudy } from '@/data/industryCaseStudies';
import { CaseStudyIndustryCard } from '@/components/ui/CaseStudyIndustryCard';
import { CaseStudyDetailModal } from '@/components/ui/CaseStudyDetailModal';
import { BeforeAfterVisualizer } from '@/components/ui/BeforeAfterVisualizer';
import { IndustryTrustGrid } from '@/components/ui/IndustryTrustGrid';
import { Container } from '@/components/ui/Container';

export function IndustryCaseStudiesClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCaseStudy, setActiveModalCaseStudy] = useState<IndustryCaseStudy | null>(null);

  const categories = useMemo(() => ['All', ...getAllIndustryCategories()], []);

  const filteredCaseStudies = useMemo(() => {
    return INDUSTRY_CASE_STUDIES.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery = 
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.industryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortProblem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creativeeSolution.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 border-b border-white/10 overflow-hidden bg-[#07090E] text-white">
        <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] bg-[#1769FF]/15 blur-[160px] rounded-full z-0" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00CFFF]/10 blur-[150px] rounded-full z-0" />

        <Container variant="wide" className="relative z-10 space-y-8">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00CFFF] animate-pulse" />
              <span>INDUSTRY CASE STUDIES &amp; DIGITAL SYSTEMS</span>
            </div>
            <span className="hidden sm:inline-block border border-white/15 bg-slate-900/80 px-3 py-1 rounded-full text-slate-200">
              18 SECTORS COVERED
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-8xl uppercase tracking-tight text-white leading-tight">
            DIFFERENT INDUSTRIES.<br />
            DIFFERENT CHALLENGES.<br />
            <span className="text-[#00CFFF]">ONE TECHNOLOGY PARTNER.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4 border-t border-white/10">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-300 font-normal">
                Discover how Creativee World builds custom web applications, automation funnels, CRM integrations, and performance growth engines tailored to the specific operational challenges of 18 key business sectors.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#00CFFF]" />
                  NO FABRICATED METRICS
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#00CFFF]" />
                  ILLUSTRATIVE SECTOR DOSSIERS
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link href="/contact">
                <button className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#00CFFF] text-[#050608] font-bold text-sm uppercase tracking-wider hover:bg-[#33d6ff] transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(0,207,255,0.3)]">
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <section className="py-8 border-b border-white/10 bg-[#0A0E17]/60 text-white">
        <Container variant="wide" className="space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-white/10 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                aria-label="Search industry case studies"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by industry name, problem, or technology solution..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-slate-950 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00CFFF] font-sans"
              />
            </div>

            {/* Clear Filters button */}
            {(selectedCategory !== 'All' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-slate-800 hover:bg-[#00CFFF] hover:text-[#050608] font-mono text-xs font-bold uppercase tracking-wider transition-all"
              >
                <RefreshCw size={12} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2" role="tablist" aria-label="Filter case studies by sector category">
            <span className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Filter size={12} /> SECTOR CATEGORIES:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-[#00CFFF] text-[#050608] border-[#00CFFF] shadow-[0_0_15px_rgba(0,207,255,0.4)]'
                    : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Result Count Status */}
          <div className="flex items-center justify-between font-mono text-xs text-slate-400 uppercase font-semibold tracking-widest pt-2">
            <span>
              SHOWING {filteredCaseStudies.length} OF {INDUSTRY_CASE_STUDIES.length} INDUSTRY CASE STUDIES
            </span>
            {selectedCategory !== 'All' && <span>CATEGORY: {selectedCategory}</span>}
          </div>
        </Container>
      </section>

      {/* 3. CASE STUDY CARDS GRID SECTION */}
      <section className="py-16 border-b border-white/10 bg-[#07090E]">
        <Container variant="wide">
          {filteredCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((caseStudy) => (
                <CaseStudyIndustryCard
                  key={caseStudy.id}
                  caseStudy={caseStudy}
                  onExplore={(study) => setActiveModalCaseStudy(study)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-md text-center space-y-4 max-w-2xl mx-auto my-8 text-white">
              <h3 className="font-display font-bold text-2xl text-white">No matching industries found</h3>
              <p className="text-sm text-slate-300">
                Try adjusting your search keywords or switching category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-3 rounded-full bg-[#00CFFF] text-[#050608] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#33d6ff] transition-all"
              >
                Show All 18 Industries
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* 4. BEFORE / AFTER TRANSFORMATION SECTION */}
      <section className="py-20 border-b border-white/10 bg-[#0A0E17]/60">
        <Container variant="wide">
          <BeforeAfterVisualizer />
        </Container>
      </section>

      {/* 5. TRUST & SECTOR BREADTH SECTION */}
      <section className="py-20 border-b border-white/10 bg-[#07090E]">
        <Container variant="wide">
          <IndustryTrustGrid />
        </Container>
      </section>

      {/* 6. FINAL CONVERSION CTA SECTION */}
      <section className="py-24 relative overflow-hidden text-center bg-[#07090E]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1769FF]/20 via-[#00CFFF]/20 to-[#D900FF]/20 blur-[120px]" />

        <Container variant="wide" className="relative z-10 max-w-4xl mx-auto space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#00CFFF] font-bold block">
            CUSTOM INDUSTRY ENGINEERING
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none text-white uppercase">
            Your Industry Has Problems.<br />
            We Build The Systems That Solve Them.
          </h2>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Creativee World combines technology, automation, design and digital strategy to build custom solutions tailored to real business needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <button className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#00CFFF] text-[#050608] font-bold text-sm uppercase tracking-wider hover:bg-[#33d6ff] transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(0,207,255,0.3)]">
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </Link>

            <Link href="/services">
              <button className="px-8 py-4 rounded-full border border-white/15 bg-slate-800/80 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-widest font-bold transition-all">
                Explore Our Services
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* DETAILED CASE STUDY DOSSIER MODAL */}
      <CaseStudyDetailModal
        caseStudy={activeModalCaseStudy}
        isOpen={Boolean(activeModalCaseStudy)}
        onClose={() => setActiveModalCaseStudy(null)}
      />
    </>
  );
}
