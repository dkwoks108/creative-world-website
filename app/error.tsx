'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CWBadge } from '@/components/ui/CWBadge';
import { CWButton } from '@/components/ui/CWButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Runtime Error:', error);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-[#1769FF]/30 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-36 relative">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-xl mx-auto px-6 text-center space-y-8">
          <CWBadge variant="cyan">
            <span>500 // System Interruption</span>
          </CWBadge>

          <div className="space-y-4">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Something didn&apos;t <br />
              <span className="text-cw-gradient">connect properly.</span>
            </h1>

            <p className="text-base text-slate-300 font-light leading-relaxed max-w-md mx-auto">
              An unexpected system error occurred. We have logged the trace. You can attempt to reconnect or return to the homepage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <CWButton variant="gradient" size="md" onClick={() => reset()}>
              <RefreshCw className="w-4 h-4" />
              <span>Retry Connection</span>
            </CWButton>
            <Link href="/">
              <CWButton variant="glass" size="md">
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </CWButton>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
