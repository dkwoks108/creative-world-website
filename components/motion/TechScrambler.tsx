'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TechScramblerProps {
  text: string;
  className?: string;
  scrambleOnScroll?: boolean;
  scrambleOnHover?: boolean;
}

const CHARS = '0123456789ABCDEF#$_+<>/[]';

export function TechScrambler({
  text,
  className = '',
  scrambleOnScroll = true,
  scrambleOnHover = true,
}: TechScramblerProps) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  const triggerScramble = () => {
    if (isAnimatingRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    isAnimatingRef.current = true;
    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === ':' || char === '[' || char === ']' || char === '/') return char;
            if (index < iteration / 3) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    }, 30);
  };

  useEffect(() => {
    if (!scrambleOnScroll || !elementRef.current) return;

    const st = ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        triggerScramble();
      },
    });

    return () => {
      st.kill();
    };
  }, [text, scrambleOnScroll]);

  return (
    <span
      ref={elementRef}
      onMouseEnter={() => {
        if (scrambleOnHover) triggerScramble();
      }}
      className={`inline-block font-mono cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
}
