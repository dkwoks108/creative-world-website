import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
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
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        <Navbar />

        <main className="pt-32 pb-24 relative">
          {/* Ambient Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

          {/* Legal Hero Header */}
          <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-12 border-b border-white/10 space-y-6">
            <RevealOnScroll variant="fade-up">
              <CWBadge variant="cyan">
                <ShieldCheck size={13} />
                <span>Governance — {title}</span>
              </CWBadge>
            </RevealOnScroll>

            <div className="space-y-4 max-w-4xl">
              <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                {title}<span className="text-[#00CFFF]">.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
                {description}
              </p>
            </div>
          </section>

          {/* Document Status Bar */}
          <div className="relative z-10 py-4 bg-slate-950/80 border-b border-white/10 font-mono text-xs font-semibold uppercase tracking-wider px-6 sm:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-400">
            <div className="flex items-center space-x-2 text-[#00CFFF]">
              <ShieldCheck size={16} className="shrink-0" />
              <span>CREATIVEE WORLD OFFICIAL LEGAL DOCUMENTATION</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText size={14} className="shrink-0" />
              <span>LAST REVISED: {lastUpdated}</span>
            </div>
          </div>

          {/* Content Layout Grid */}
          <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Sticky Table of Contents Sidebar */}
              <aside className="hidden lg:block lg:col-span-3 sticky top-28 p-6 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl space-y-4">
                <div className="space-y-1 pb-3 border-b border-white/10">
                  <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider block">
                    CONTENTS
                  </span>
                  <p className="text-[11px] text-slate-400 font-mono uppercase">
                    Jump to section:
                  </p>
                </div>

                <nav className="space-y-1 text-xs font-mono text-slate-300 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                  {toc.map((item, idx) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-2 px-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 hover:text-white transition-colors truncate font-semibold uppercase"
                    >
                      <span className="text-[#00CFFF] mr-1.5">{(idx + 1).toString().padStart(2, '0')}.</span>
                      {item.title}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Main Legal Content */}
              <div className="lg:col-span-9 space-y-12 max-w-[840px]">
                
                {/* Notice Box */}
                <div className="p-6 rounded-3xl border border-white/15 bg-slate-900/80 space-y-3 shadow-xl">
                  <div className="flex items-center space-x-2 text-[#00CFFF] font-mono text-xs font-semibold uppercase tracking-wider">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>LEGAL NOTICE & JURISDICTION SUMMARY</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    This documentation outlines the terms and data protection policies governing Creativee World digital growth consulting services, audit requests, and web operations. Business agreements and formal client scopes are finalized via individual written proposals under <strong>Jaipur, Rajasthan Jurisdiction</strong>.
                  </p>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-12 text-slate-200">
                  {children}
                </div>

              </div>

            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
