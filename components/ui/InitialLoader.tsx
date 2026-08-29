'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('creativee_loader_shown') && !window.location.search.includes('bypassLoader=true');
    }
    return true;
  });
  const [progress, setProgress] = useState<number>(0);

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

    // Smooth count-up timer sequence (0 -> 100 over ~1.2s)
    const startTime = Date.now();
    const duration = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(currentProgress);

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
        }, 200);
      }
    }, 16);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  const formattedCount = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="initial-loader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#07090E] text-white flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient Spectrum Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#1769FF]/20 via-[#673BFF]/20 to-[#D900FF]/15 blur-3xl pointer-events-none rounded-full" />

          {/* Minimal Header */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-slate-400">
            <span className="font-bold text-white tracking-widest">CREATIVEE WORLD</span>
            <span className="text-[#00CFFF]">● DIGITAL GROWTH ENGINE</span>
          </div>

          {/* Hero 01 -> 100 Numerical Progression */}
          <div className="relative z-10 my-auto text-center space-y-4">
            <div className="font-mono text-7xl sm:text-9xl lg:text-[14rem] font-extrabold tracking-tighter text-cw-gradient leading-none tabular-nums select-none">
              {formattedCount}
            </div>

            {/* Subtle Minimal Progress Line */}
            <div className="max-w-xs mx-auto h-0.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1769FF] via-[#00CFFF] to-[#D900FF] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Minimal Footer */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-slate-500 uppercase tracking-widest">
            <span>JAIPUR • INDIA</span>
            <span>{progress}% LOADED</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
