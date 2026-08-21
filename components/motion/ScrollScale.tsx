'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollScaleProps {
  children: React.ReactNode;
  className?: string;
  minScale?: number;
  maxScale?: number;
}

export function ScrollScale({
  children,
  className = '',
  minScale = 0.96,
  maxScale = 1.02,
}: ScrollScaleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  const scale = useTransform(smoothProgress, [0, 0.5, 1], [minScale, 1.0, maxScale]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div style={{ scale }}>{children}</motion.div>
    </div>
  );
}
