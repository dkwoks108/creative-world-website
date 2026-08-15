'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on desktop pointer devices with fine precision and no reduced motion preference
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasHover || prefersReducedMotion || !dotRef.current || !ringRef.current) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Use GSAP quickTo for zero React render overhead and high performance 60fps tracking
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3.out' });

    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power2.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power2.out' });

    // Show custom cursor elements once pointer is active
    gsap.set([dot, ring], { opacity: 1 });

    const handlePointerMove = (e: PointerEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handlePointerDown = () => {
      gsap.to([dot, ring], { scale: 0.75, duration: 0.12, ease: 'power2.out' });
    };

    const handlePointerUp = () => {
      gsap.to([dot, ring], { scale: 1, duration: 0.15, ease: 'power2.out' });
    };

    // Expand outer ring over interactive controls
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea');
      if (interactiveEl) {
        const isInput = interactiveEl.tagName === 'INPUT' || interactiveEl.tagName === 'TEXTAREA';
        if (isInput) {
          // Over text fields, shrink dot and hide ring so text cursor is clean and clear
          gsap.to(dot, { scale: 0.5, duration: 0.2 });
          gsap.to(ring, { opacity: 0, scale: 0.5, duration: 0.2 });
        } else {
          // Over links/buttons, subtly expand ring
          gsap.to(ring, { opacity: 1, scale: 1.35, borderColor: 'rgba(17, 17, 17, 0.35)', duration: 0.2 });
          gsap.to(dot, { scale: 1.2, duration: 0.2 });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea');
      if (interactiveEl) {
        gsap.to(ring, { opacity: 1, scale: 1, borderColor: 'rgba(17, 17, 17, 0.20)', duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.2 });
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
        className="pointer-events-none fixed top-0 left-0 h-2 w-2 -ml-1 -mt-1 rounded-full bg-ink opacity-0 transition-opacity duration-300"
      />
      {/* Subtle Outer Cursor Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 h-8 w-8 -ml-4 -mt-4 rounded-full border border-ink/20 opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}
