'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ImageReveal({
  children,
  className = '',
  delay = 0,
  duration = 1.1,
  once = true,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const container = containerRef.current;
      const innerImage = imageWrapperRef.current;
      if (!container || !innerImage) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          once,
        },
      });

      tl.fromTo(
        container,
        {
          clipPath: 'inset(12% 0% 12% 0%)',
          opacity: 0,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
        }
      ).fromTo(
        innerImage,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: duration * 1.1,
          ease: 'power2.out',
        },
        '<'
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imageWrapperRef} className="w-full h-full transition-transform duration-700 hover:scale-[1.03]">
        {children}
      </div>
    </div>
  );
}
