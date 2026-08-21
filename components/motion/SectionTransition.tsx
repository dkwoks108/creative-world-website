'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTransitionProps {
  label?: string;
  className?: string;
}

export function SectionTransition({ label, className = '' }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className={`relative py-4 overflow-hidden ${className}`}>
      {/* Heavy 4px Rule Reveal */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] as const }}
        className="w-full h-1 bg-black origin-left"
      />

      {label && (
        <div className="flex justify-between items-center pt-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
          <span>{label}</span>
          <span>DIGITAL ENGINE // ARCHITECTURE</span>
        </div>
      )}
    </div>
  );
}
