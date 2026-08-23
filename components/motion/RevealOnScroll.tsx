'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export type RevealVariant = 'fade-up' | 'clip-up' | 'slide-left' | 'slide-right' | 'scale-in';

interface RevealOnScrollProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  variant = 'fade-up',
  className = '',
  delay = 0,
  duration = 0.85,
  once = true,
}: RevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const element = containerRef.current;
      if (!element) return;

      let fromVars: gsap.TweenVars = { opacity: 0 };
      let toVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once,
        },
      };

      switch (variant) {
        case 'fade-up':
          fromVars = { opacity: 0, y: 40 };
          toVars = { ...toVars, y: 0 };
          break;
        case 'clip-up':
          fromVars = { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' };
          toVars = { ...toVars, y: 0, clipPath: 'inset(0% 0% 0% 0%)' };
          break;
        case 'slide-left':
          fromVars = { opacity: 0, x: -40, clipPath: 'inset(0% 100% 0% 0%)' };
          toVars = { ...toVars, x: 0, clipPath: 'inset(0% 0% 0% 0%)' };
          break;
        case 'slide-right':
          fromVars = { opacity: 0, x: 40, clipPath: 'inset(0% 0% 0% 100%)' };
          toVars = { ...toVars, x: 0, clipPath: 'inset(0% 0% 0% 0%)' };
          break;
        case 'scale-in':
          fromVars = { opacity: 0, scale: 0.95 };
          toVars = { ...toVars, scale: 1 };
          break;
      }

      gsap.fromTo(element, fromVars, toVars);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
