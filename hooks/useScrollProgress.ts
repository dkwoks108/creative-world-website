'use client';

import { useRef } from 'react';
import { useScroll, useSpring, MotionValue } from 'framer-motion';

interface UseScrollProgressOptions {
  offset?: [string, string];
  stiffness?: number;
  damping?: number;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { offset = ['start end', 'end start'], stiffness = 100, damping = 30 } = options;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset as any,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness,
    damping,
    restDelta: 0.001,
  });

  return { containerRef, rawProgress: scrollYProgress, smoothProgress };
}
