'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

interface ClipPathHeadlineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export function ClipPathHeadline({
  children,
  className = '',
  delay = 0,
  as: Component = 'h1',
}: ClipPathHeadlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{
          clipPath: 'inset(100% 0 0 0)',
          y: 40,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                clipPath: 'inset(0% 0 0 0)',
                y: 0,
                opacity: 1,
              }
            : {}
        }
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1] as const, // Custom cinematic cubic-bezier
          delay,
        }}
        className={className}
      >
        <Component className="contents">{children}</Component>
      </motion.div>
    </div>
  );
}

interface AnimatedMetricCounterProps {
  value: string; // e.g. "99.7%", "2.4ms", "140B+", "100%"
  className?: string;
}

export function AnimatedMetricCounter({ value, className = '' }: AnimatedMetricCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [displayValue, setDisplayValue] = useState('0');

  // Parse prefix, target number, and suffix
  const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  const prefix = match ? match[1] : '';
  const numericTarget = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : '';
  const isFloat = match ? match[2].includes('.') : false;
  const decimals = isFloat && match ? (match[2].split('.')[1] || '').length : 0;

  useEffect(() => {
    if (!isInView || numericTarget === 0) return;

    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (numericTarget - start) * easeProgress;

      setDisplayValue(current.toFixed(decimals));

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [isInView, numericTarget, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isInView ? displayValue : '0'}
      {suffix}
    </span>
  );
}

interface ScrollVelocityTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // multiplier
}

export function ScrollVelocityText({ children, className = '', speed = 0.15 }: ScrollVelocityTextProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const translateX = useTransform(smoothVelocity, [-1000, 1000], [-30 * speed, 30 * speed]);

  return (
    <motion.div style={{ x: translateX }} className={className}>
      {children}
    </motion.div>
  );
}

interface ImageClipRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function ImageClipReveal({ children, className = '' }: ImageClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{
          clipPath: 'inset(100% 0 0 0)',
          scale: 1.04,
        }}
        animate={
          isInView
            ? {
                clipPath: 'inset(0% 0 0 0)',
                scale: 1,
              }
            : {}
        }
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
