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
    // Check if loader was already displayed in this browser session or bypassed
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
        }, 150);
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
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#07090E] text-white flex items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* Pure 0-100 Numerical Progression - Nothing Else */}
          <div className="font-mono text-8xl sm:text-[14rem] md:text-[18rem] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00CFFF] to-[#1769FF] leading-none tabular-nums select-none">
            {formattedCount}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
