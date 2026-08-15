'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0.85,
          y: 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        }
      );
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}
