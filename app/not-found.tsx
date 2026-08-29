import React from 'react';
import Link from 'next/link';
import { Home, ArrowUpRight, Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';

export default function NotFound() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-[#1769FF]/30 selection:text-white">
        <Navbar />

        <main className="flex-1 flex items-center justify-center py-36 relative">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-xl mx-auto px-6 text-center space-y-8">
            <RevealOnScroll variant="fade-up">
              <CWBadge variant="cyan">
                <span>404 // Route Off-Script</span>
              </CWBadge>
            </RevealOnScroll>

            <div className="space-y-4">
              <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight leading-tight">
                This page went <br />
                <span className="text-cw-gradient">off-script.</span>
              </h1>

              <p className="text-base text-slate-300 font-light leading-relaxed max-w-md mx-auto">
                The URL or resource you are looking for has been moved, renamed, or is unavailable in our digital growth platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/">
                <CWButton variant="gradient" size="md">
                  <Home className="w-4 h-4" />
                  <span>Return Home</span>
                </CWButton>
              </Link>
              <Link href="/services">
                <CWButton variant="glass" size="md">
                  <Search className="w-4 h-4" />
                  <span>Explore Services</span>
                  <ArrowUpRight className="w-4 h-4" />
                </CWButton>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
