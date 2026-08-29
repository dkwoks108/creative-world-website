'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Check if loader was already displayed in this browser session or bypassed
    const hasLoadedBefore =
      typeof window !== 'undefined' &&
      (sessionStorage.getItem('creativee_loader_shown') || window.location.search.includes('bypassLoader=true'));

    if (hasLoadedBefore) {
      return;
    }

    // Trigger rapid initial progress animation (0 -> 100 in 250ms)
    setIsLoading(true);
    const startTime = Date.now();
    const duration = 250;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          try {
            sessionStorage.setItem('creativee_loader_shown', 'true');
          } catch {
            // Ignore storage restrictions
          }
        }, 50);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  const formattedCount = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed top-0 left-0 right-0 z-[100] bg-[#07090E]/95 border-b border-[#00CFFF]/30 px-6 py-2 flex items-center justify-between pointer-events-none select-none backdrop-blur-md"
        >
          <div className="flex items-center gap-3 text-xs font-mono text-[#00CFFF] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#00CFFF] animate-pulse" />
            <span>CREATIVEE WORLD INITIALIZING</span>
          </div>

          <div className="font-mono text-sm font-bold text-white tracking-widest tabular-nums">
            {formattedCount}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
