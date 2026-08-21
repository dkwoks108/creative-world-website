import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export interface TocItem {
  id: string;
  title: string;
}

export interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  description: string;
  toc: TocItem[];
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  description,
  toc,
  children,
}: LegalPageLayoutProps) {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <Navbar />

        <main>
          {/* Editorial Legal Page Hero Header */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
                <span>GOVERNANCE — {title}</span>
              </div>

              <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                {title}<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal max-w-4xl">
                {description}
              </p>
            </div>
          </MonochromeSection>

          {/* Document Status Bar */}
          <div className="py-4 border-b-2 border-black bg-neutral-100 font-mono text-xs font-bold uppercase tracking-widest px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-black font-bold">
              <ShieldCheck size={16} className="shrink-0" />
              <span>SURNAX TECHNOLOGIES OFFICIAL LEGAL DOCUMENTATION</span>
            </div>
            <div className="flex items-center space-x-2 text-neutral-600">
              <FileText size={14} className="shrink-0" />
              <span>LAST REVISED: {lastUpdated}</span>
            </div>
          </div>

          {/* Legal Content Layout Grid */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Desktop Sticky Table of Contents Sidebar */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-28 p-6 border-4 border-black bg-white space-y-4">
                <div className="space-y-1 pb-3 border-b-2 border-black">
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-widest block">
                    CONTENTS
                  </span>
                  <p className="text-[11px] text-neutral-600 font-mono uppercase">
                    Jump to section:
                  </p>
                </div>

                <nav className="space-y-1 text-xs font-mono text-neutral-800 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                  {toc.map((item, idx) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-1.5 px-2 border border-transparent hover:border-black hover:bg-neutral-100 transition-colors truncate font-bold uppercase"
                    >
                      <span className="text-black mr-1.5">{(idx + 1).toString().padStart(2, '0')}.</span>
                      {item.title}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Main Legal Text Container */}
              <div className="lg:col-span-9 space-y-12 max-w-[840px]">
                
                {/* Legal Notice Box */}
                <div className="p-6 border-4 border-black bg-white space-y-3">
                  <div className="flex items-center space-x-2 text-black font-mono text-xs font-bold uppercase tracking-wider">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>LEGAL NOTICE & JURISDICTION SUMMARY</span>
                  </div>
                  <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                    This documentation outlines the terms and data protection policies governing Surnax Technologies digital growth consulting services, audit requests, and web operations. Business agreements and formal client scopes are finalized via individual written proposals under <strong>[BUSINESS JURISDICTION TO BE CONFIRMED]</strong>.
                  </p>
                </div>

                {/* Render Detailed Legal Sections */}
                <div className="space-y-12">
                  {children}
                </div>

              </div>

            </div>
          </MonochromeSection>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}

