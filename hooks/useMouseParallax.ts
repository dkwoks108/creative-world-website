'use client';

import { useState, useEffect } from 'react';
import { useSpring } from 'framer-motion';

export function useMouseParallax(intensity: number = 10) {
  const springConfig = { stiffness: 150, damping: 20 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Only desktop pointer fine devices
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = ((e.clientX - centerX) / centerX) * intensity;
      const offsetY = ((e.clientY - centerY) / centerY) * intensity;

      x.set(offsetX);
      y.set(offsetY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, intensity]);

  return { x, y };
}
