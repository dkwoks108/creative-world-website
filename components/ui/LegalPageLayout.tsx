import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
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
      <div className="relative min-h-screen bg-ivory text-txt-primary">
        <Navbar />

        <main>
          {/* Editorial Legal Page Hero Header */}
          <PageHero
            eyebrow="LEGAL & AGENCY GOVERNANCE"
            title={title}
            description={description}
            breadcrumbs={[{ label: title }]}
          />

          {/* Document Status Bar */}
          <section className="py-4 bg-white border-b border-border-subtle">
            <Container variant="wide" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center space-x-2 text-coral font-medium">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>CEATIVEe WORLD OFFICIAL LEGAL DOCUMENTATION</span>
              </div>
              <div className="flex items-center space-x-2 text-txt-muted">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span>LAST REVISED: {lastUpdated}</span>
              </div>
            </Container>
          </section>

          {/* Legal Content Layout Grid */}
          <section className="py-16 sm:py-24 bg-ivory border-b border-border-subtle">
            <Container variant="wide">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Desktop Sticky Table of Contents Sidebar */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-28 p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial-sm space-y-4">
                  <div className="space-y-1 pb-3 border-b border-border-subtle">
                    <span className="font-mono text-xs font-bold text-coral uppercase tracking-widest block">
                      CONTENTS
                    </span>
                    <p className="text-[11px] text-txt-secondary font-mono">
                      Jump to section:
                    </p>
                  </div>

                  <nav className="space-y-1 text-xs font-mono text-txt-secondary max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                    {toc.map((item, idx) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block py-1.5 px-2 rounded-lg hover:bg-ivory hover:text-plum transition-colors truncate"
                      >
                        <span className="text-coral/70 mr-1.5 font-semibold">{(idx + 1).toString().padStart(2, '0')}.</span>
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </aside>

                {/* Main Legal Text Container */}
                <div className="lg:col-span-9 space-y-12 max-w-[780px]">
                  
                  {/* Legal Notice Box */}
                  <div className="p-6 rounded-2xl bg-white border border-coral/30 shadow-editorial-sm space-y-3">
                    <div className="flex items-center space-x-2 text-coral font-mono text-xs font-bold uppercase tracking-wider">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>LEGAL NOTICE & JURISDICTION SUMMARY</span>
                    </div>
                    <p className="text-xs sm:text-sm text-plum/80 leading-relaxed font-normal">
                      This documentation outlines the terms and data protection policies governing Ceativee World digital growth consulting services, audit requests, and web operations. Business agreements and formal client scopes are finalized via individual written proposals under <strong>[BUSINESS JURISDICTION TO BE CONFIRMED]</strong>.
                    </p>
                  </div>

                  {/* Render Detailed Legal Sections */}
                  <div className="prose prose-plum max-w-none space-y-12">
                    {children}
                  </div>

                </div>

              </div>
            </Container>
          </section>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
