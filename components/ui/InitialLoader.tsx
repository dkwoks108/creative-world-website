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

    // Trigger rapid numeric progress animation (01 -> 100 in 300ms)
    setIsLoading(true);
    const startTime = Date.now();
    const duration = 300;

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
          exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] bg-[#07090E] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          {/* Centered Hero Number (01 -> 100) */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-display text-7xl sm:text-9xl font-extrabold text-white tracking-tighter tabular-nums"
            >
              {formattedCount}
            </motion.div>

            {/* Minimal Brand Mark */}
            <div className="text-slate-400 text-xs font-mono tracking-widest uppercase">
              CREATIVEE WORLD
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
