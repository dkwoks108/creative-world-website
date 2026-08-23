'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { INDUSTRY_CASE_STUDIES, getAllIndustryCategories, IndustryCaseStudy } from '@/data/industryCaseStudies';
import { CaseStudyIndustryCard } from '@/components/ui/CaseStudyIndustryCard';
import { CaseStudyDetailModal } from '@/components/ui/CaseStudyDetailModal';
import { BeforeAfterVisualizer } from '@/components/ui/BeforeAfterVisualizer';
import { IndustryTrustGrid } from '@/components/ui/IndustryTrustGrid';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';

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
        item.surnaxSolution.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* 1. HERO SECTION */}
      <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 border-2 border-black bg-black inline-block" aria-hidden="true" />
              <span>INDUSTRY CASE STUDIES &amp; DIGITAL SYSTEMS</span>
            </div>
            <span className="hidden sm:inline-block border border-black bg-white px-2 py-0.5 text-black">
              18 SECTORS COVERED
            </span>
          </div>

          <h1 className="font-serif font-bold text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
            DIFFERENT INDUSTRIES.<br />
            DIFFERENT CHALLENGES.<br />
            <span className="text-neutral-400">ONE TECHNOLOGY PARTNER.</span>
          </h1>

          <div className="w-full h-1 bg-black my-4" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal">
                Discover how Surnax builds custom web applications, automation funnels, CRM integrations, and performance growth engines tailored to the specific operational challenges of 18 key business sectors.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-neutral-600 uppercase tracking-widest pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-black" />
                  NO FABRICATED METRICS
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-black" />
                  ILLUSTRATIVE SECTOR DOSSIERS
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link href="/contact">
                <MonochromeButton variant="primary" showArrow>
                  Start Your Project
                </MonochromeButton>
              </Link>
            </div>
          </div>
        </div>
      </MonochromeSection>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <MonochromeSection divider="thick" texture="grid" className="bg-neutral-50 !py-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-2 border-black bg-white p-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                aria-label="Search industry case studies"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by industry name, problem, or technology solution..."
                className="w-full pl-10 pr-4 py-2 border-2 border-black bg-white font-serifBody text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Clear Filters button */}
            {(selectedCategory !== 'All' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-neutral-100 hover:bg-black hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <RefreshCw size={12} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2" role="tablist" aria-label="Filter case studies by sector category">
            <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Filter size={12} /> SECTOR CATEGORIES:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 border-2 border-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-100 ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Result Count Status */}
          <div className="flex items-center justify-between font-mono text-xs text-neutral-500 uppercase font-bold tracking-widest pt-2">
            <span>
              SHOWING {filteredCaseStudies.length} OF {INDUSTRY_CASE_STUDIES.length} INDUSTRY CASE STUDIES
            </span>
            {selectedCategory !== 'All' && <span>CATEGORY: {selectedCategory}</span>}
          </div>
        </div>
      </MonochromeSection>

      {/* 3. CASE STUDY CARDS GRID SECTION */}
      <MonochromeSection divider="thick" texture="none" className="bg-white">
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
          <div className="p-12 border-4 border-black bg-neutral-50 text-center space-y-4 max-w-2xl mx-auto my-8">
            <h3 className="font-serif font-bold text-2xl text-black">No matching industries found</h3>
            <p className="font-serifBody text-sm text-neutral-600">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 border-2 border-black bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Show All 18 Industries
            </button>
          </div>
        )}
      </MonochromeSection>

      {/* 4. BEFORE / AFTER TRANSFORMATION SECTION */}
      <MonochromeSection divider="thick" texture="grid" className="bg-neutral-100">
        <BeforeAfterVisualizer />
      </MonochromeSection>

      {/* 5. TRUST & SECTOR BREADTH SECTION */}
      <MonochromeSection divider="thick" texture="lines" className="bg-white">
        <IndustryTrustGrid />
      </MonochromeSection>

      {/* 6. FINAL CONVERSION CTA SECTION */}
      <MonochromeSection inverted divider="ultra" texture="cta" className="text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
            CUSTOM INDUSTRY ENGINEERING
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none text-white">
            Your Industry Has Problems.<br />
            We Build The Systems That Solve Them.
          </h2>

          <p className="font-serifBody text-base sm:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Surnax combines technology, automation, design and digital strategy to build custom solutions tailored to real business needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <MonochromeButton variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-black w-full sm:w-auto" showArrow>
                Start a Conversation
              </MonochromeButton>
            </Link>

            <Link href="/services">
              <MonochromeButton variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-black w-full sm:w-auto">
                Explore Our Services
              </MonochromeButton>
            </Link>
          </div>
        </div>
      </MonochromeSection>

      {/* DETAILED CASE STUDY DOSSIER MODAL */}
      <CaseStudyDetailModal
        caseStudy={activeModalCaseStudy}
        isOpen={Boolean(activeModalCaseStudy)}
        onClose={() => setActiveModalCaseStudy(null)}
      />
    </>
  );
}
