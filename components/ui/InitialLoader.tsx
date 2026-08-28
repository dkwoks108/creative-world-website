'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreativeeLogo } from '@/components/ui/CreativeeLogo';

const STATUS_MESSAGES = [
  'Initializing growth system architecture...',
  'Loading visual & technical assets...',
  'Growth engine ready — executing render',
];

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('creativee_loader_shown') && !window.location.search.includes('bypassLoader=true');
    }
    return true;
  });
  const [progress, setProgress] = useState<number>(0);
  const [statusIndex, setStatusIndex] = useState<number>(0);

  useEffect(() => {
    // Check if loader was already displayed in this browser session or bypassed for testing
    const hasLoadedBefore = typeof window !== 'undefined' &&
      (sessionStorage.getItem('creativee_loader_shown') || window.location.search.includes('bypassLoader=true'));

    if (hasLoadedBefore) {
      setIsLoading(false);
      return;
    }

    // Lock scroll during initialization
    document.body.style.overflow = 'hidden';

    // Fast count-up timer sequence (~1.3s total duration)
    const startTime = Date.now();
    const duration = 1300;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(currentProgress);

      if (currentProgress >= 70) {
        setStatusIndex(2);
      } else if (currentProgress >= 35) {
        setStatusIndex(1);
      } else {
        setStatusIndex(0);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
          try {
            sessionStorage.setItem('creativee_loader_shown', 'true');
          } catch {
            // Ignore storage restrictions
          }
        }, 150);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="initial-loader"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#07090E] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden select-none pointer-events-auto"
        >
          {/* Background Ambient Spectrum Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#1769FF]/20 via-[#673BFF]/15 to-[#D900FF]/15 blur-3xl pointer-events-none rounded-full" />

          {/* Top System Status Bar */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-slate-400 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00CFFF] inline-block animate-pulse" aria-hidden="true" />
              <span className="font-semibold text-white">Creativee World • Growth System Engine</span>
            </div>
            <div className="hidden sm:block">
              <span>Studio: Jaipur, India</span>
            </div>
          </div>

          {/* Center Brand & Progress Sequence */}
          <div className="relative z-10 max-w-md w-full mx-auto space-y-8 text-center my-auto">
            {/* Logo reveal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center"
            >
              <CreativeeLogo accentColor="#FFFFFF" brandColor="#FFFFFF" textColor="#FFFFFF" height={42} />
            </motion.div>

            {/* Spectrum Gradient Progress Line */}
            <div className="space-y-3">
              <div className="w-full h-1.5 bg-slate-900 border border-white/15 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-cw-gradient origin-left rounded-full shadow-cw-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Count-up & Status text */}
              <div className="flex items-center justify-between font-sans text-xs text-slate-300">
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="truncate max-w-[280px] sm:max-w-none text-left font-light"
                >
                  {STATUS_MESSAGES[statusIndex]}
                </motion.span>
                <span className="tabular-nums ml-2 font-mono text-[#00CFFF] text-sm font-bold">
                  {progress < 10 ? `0${progress}` : progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Diagnostics Footer */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-slate-500 border-t border-white/10 pt-4">
            <div className="flex items-center gap-4">
              <span>Verified Next.js App Router</span>
              <span className="hidden md:inline">• Sub-2s Benchmark</span>
            </div>
            <div>
              <span>© {new Date().getFullYear()} Creativee World</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
