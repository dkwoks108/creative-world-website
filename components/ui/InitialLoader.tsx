'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SurnaxLogo } from '@/components/ui/SurnaxLogo';

const STATUS_MESSAGES = [
  'INITIALIZING SYSTEM ARCHITECTURE',
  'LOADING CINEMATIC ASSETS',
  'SYSTEM READY // EXECUTING RENDER',
];

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [statusIndex, setStatusIndex] = useState<number>(0);

  useEffect(() => {
    // Check if loader was already displayed in this browser session
    const hasLoadedBefore = typeof window !== 'undefined' && sessionStorage.getItem('surnax_loader_shown');

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
            sessionStorage.setItem('surnax_loader_shown', 'true');
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
          className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden select-none pointer-events-auto"
        >
          {/* Top Telemetry Bar */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 font-bold border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white inline-block animate-pulse" aria-hidden="true" />
              <span>SURNAX // SYSTEM INITIALIZATION</span>
            </div>
            <div className="hidden sm:block">
              <span>LOC: JAIPUR, IN [26.9124° N, 75.7873° E]</span>
            </div>
          </div>

          {/* Center Brand & Progress Sequence */}
          <div className="max-w-md w-full mx-auto space-y-8 text-center my-auto">
            {/* Logo reveal with pulse scale */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center"
            >
              <SurnaxLogo accentColor="#FFFFFF" brandColor="#FFFFFF" textColor="#FFFFFF" height={38} />
            </motion.div>

            {/* 2px Precision Progress Line */}
            <div className="space-y-3">
              <div className="w-full h-1 bg-neutral-900 border border-neutral-800 overflow-hidden relative">
                <motion.div
                  className="h-full bg-white origin-left"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Count-up & Status text */}
              <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="truncate max-w-[280px] sm:max-w-none text-left"
                >
                  {STATUS_MESSAGES[statusIndex]}
                </motion.span>
                <span className="tabular-nums ml-2 font-mono text-white text-sm">
                  {progress < 10 ? `0${progress}` : progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Diagnostics Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 font-bold border-t border-neutral-800 pt-4">
            <div className="flex items-center gap-4">
              <span>[ 01 ] HERO PRE-LOADED</span>
              <span className="hidden md:inline">[ 02 ] OBSERVER ACTIVE</span>
            </div>
            <div>
              <span>SURNAX TECHNOLOGIES © {new Date().getFullYear()}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
