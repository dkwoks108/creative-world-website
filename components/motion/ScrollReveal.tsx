'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'bottom' | 'top' | 'left' | 'right';
  duration?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'bottom',
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-12% 0px' });

  const getInitialClipPath = () => {
    switch (direction) {
      case 'bottom':
        return 'inset(100% 0 0 0)';
      case 'top':
        return 'inset(0 0 100% 0)';
      case 'left':
        return 'inset(0 100% 0 0)';
      case 'right':
        return 'inset(0 0 0 100%)';
      default:
        return 'inset(100% 0 0 0)';
    }
  };

  const getInitialY = () => {
    if (direction === 'bottom') return 40;
    if (direction === 'top') return -40;
    return 0;
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: getInitialY(),
        clipPath: getInitialClipPath(),
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0% 0% 0% 0%)',
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
