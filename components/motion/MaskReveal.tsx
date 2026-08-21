'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function MaskReveal({
  children,
  className = '',
  delay = 0,
  duration = 1.0,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Outer Container Mask */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
        animate={isInView ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 } : {}}
        transition={{
          duration,
          delay,
          ease: [0.19, 1, 0.22, 1] as const,
        }}
        className="w-full h-full"
      >
        {/* Inner Media Content with Subtle Unscale Movement */}
        <motion.div
          initial={{ scale: 1.08, y: 20 }}
          animate={isInView ? { scale: 1.0, y: 0 } : {}}
          transition={{
            duration: duration * 1.25,
            delay: delay + 0.1,
            ease: [0.215, 0.61, 0.355, 1] as const,
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
