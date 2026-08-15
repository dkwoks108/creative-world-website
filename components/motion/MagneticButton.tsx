'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // max offset in px (3-6px max)
}

export function MagneticButton({
  children,
  className = '',
  strength = 5,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on desktop devices with hover capability
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasHover || prefersReducedMotion || !containerRef.current) return;

    const element = containerRef.current;

    // Use GSAP quickTo for 60fps tracking without ticker overhead
    const xTo = gsap.quickTo(element, 'x', { duration: 0.3, ease: 'power2.out' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.3, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) / (rect.width / 2);
      const distanceY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp max displacement to strength px (3-6px max)
      const clampedX = Math.max(-1, Math.min(1, distanceX)) * strength;
      const clampedY = Math.max(-1, Math.min(1, distanceY)) * strength;

      xTo(clampedX);
      yTo(clampedY);
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className={`inline-block cursor-pointer ${className}`}>
      {children}
    </div>
  );
}
