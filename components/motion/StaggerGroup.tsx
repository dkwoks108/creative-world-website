'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface StaggerGroupProps {
  children: React.ReactNode;
  selector?: string;
  stagger?: number;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function StaggerGroup({
  children,
  selector = '.stagger-item',
  stagger = 0.08,
  className = '',
  delay = 0,
  once = true,
}: StaggerGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const items = containerRef.current?.querySelectorAll(selector);
      if (!items || items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
