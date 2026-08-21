'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number; // 0.1 for subtle background, 0.35 for video, 0.7 for foreground
  className?: string;
}

export function ParallaxElement({
  children,
  speed = 0.2,
  className = '',
}: ParallaxElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [-100 * speed, 100 * speed]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
