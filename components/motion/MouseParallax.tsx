'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MouseParallaxProps {
  children?: React.ReactNode;
  className?: string;
  strength?: number; // max pixels shift e.g. 2 to 6
  invert?: boolean;
}

export function MouseParallax({
  children,
  className = '',
  strength = 4,
  invert = false,
}: MouseParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasHover || prefersReducedMotion || !containerRef.current) return;

    const element = containerRef.current;
    const xTo = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / innerHeight - 0.5) * 2;

      const factor = invert ? -1 : 1;
      xTo(normalizedX * strength * factor);
      yTo(normalizedY * strength * factor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(element);
    };
  }, [strength, invert]);

  return (
    <div ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
