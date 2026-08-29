'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
      },
    });
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none bg-transparent">
      <div
        ref={progressBarRef}
        className="h-full w-full bg-gradient-to-r from-[#1769FF] via-[#00CFFF] to-[#D900FF] origin-left scale-x-0 transition-transform"
      />
    </div>
  );
}
