'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only activate on desktop pointer devices with fine precision and no reduced motion preference
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasHover || prefersReducedMotion || !dotRef.current || !ringRef.current) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;

    // Use GSAP quickTo for zero React render overhead and high performance 60fps tracking
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3.out' });

    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.12, ease: 'power2.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.12, ease: 'power2.out' });

    // Show custom cursor elements once pointer is active
    gsap.set([dot, ring], { opacity: 1 });

    const handlePointerMove = (e: PointerEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handlePointerDown = () => {
      gsap.to([dot, ring], { scale: 0.8, duration: 0.12, ease: 'power2.out' });
    };

    const handlePointerUp = () => {
      gsap.to([dot, ring], { scale: 1, duration: 0.15, ease: 'power2.out' });
    };

    // Expand outer ring over interactive controls and scrub targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const scrubEl = target.closest('[data-cursor="scrub"]');
      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea');

      if (scrubEl) {
        if (text) {
          text.innerText = 'SCRUB ↔';
          text.style.opacity = '1';
        }
        gsap.to(ring, {
          width: 80,
          height: 26,
          borderRadius: '0px',
          backgroundColor: '#000000',
          borderColor: '#000000',
          color: '#ffffff',
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
        gsap.to(dot, { opacity: 0, duration: 0.15 });
      } else if (interactiveEl) {
        const isInput = interactiveEl.tagName === 'INPUT' || interactiveEl.tagName === 'TEXTAREA';
        if (isInput) {
          gsap.to(dot, { scale: 0.5, duration: 0.2 });
          gsap.to(ring, { opacity: 0, scale: 0.5, duration: 0.2 });
        } else {
          if (text) text.style.opacity = '0';
          gsap.to(ring, {
            width: 36,
            height: 36,
            borderRadius: '0px',
            backgroundColor: 'transparent',
            borderColor: '#000000',
            scale: 1.25,
            duration: 0.2,
            ease: 'power2.out',
          });
          gsap.to(dot, { scale: 1.3, opacity: 1, duration: 0.2 });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const scrubEl = target.closest('[data-cursor="scrub"]');
      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea');

      if (scrubEl || interactiveEl) {
        if (text) text.style.opacity = '0';
        gsap.to(ring, {
          width: 24,
          height: 24,
          borderRadius: '0px',
          backgroundColor: 'transparent',
          borderColor: 'rgba(0, 0, 0, 0.40)',
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden lg:block">
      {/* Central Cursor Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 h-1.5 w-1.5 -ml-0.75 -mt-0.75 bg-black opacity-0 transition-opacity duration-300"
        style={{ borderRadius: 0 }}
      />
      {/* Architectural Outer Cursor Badge / Box */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 h-6 w-6 -ml-3 -mt-3 border border-black/40 flex items-center justify-center font-mono text-[9px] font-bold text-white uppercase tracking-widest opacity-0 transition-opacity duration-300 shadow-md"
        style={{ borderRadius: 0 }}
      >
        <span ref={textRef} className="opacity-0 transition-opacity duration-150 whitespace-nowrap px-1" />
      </div>
    </div>
  );
}

