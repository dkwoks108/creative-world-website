'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function RevealText({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  once = true,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const elements = containerRef.current?.querySelectorAll('.reveal-target');
      if (!elements || elements.length === 0) return;

      gsap.fromTo(
        elements,
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          delay,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            once,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div className="reveal-target inline-block w-full">{children}</div>
    </div>
  );
}
