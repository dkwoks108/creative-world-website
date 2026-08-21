'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

interface ScrambleInProps {
  text: string;
  delay?: number; // ms delay
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
}

export function ScrambleIn({
  text,
  delay = 0,
  className = '',
  as: Component = 'span',
}: ScrambleInProps) {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayText, setDisplayText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let frame = 0;
    const totalChars = text.length;

    const interval = setInterval(() => {
      frame += 0.5;
      const revealCount = Math.floor(frame);

      let result = '';
      for (let i = 0; i < totalChars; i++) {
        if (text[i] === ' ') {
          result += ' ';
          continue;
        }

        if (i < revealCount) {
          result += text[i];
        } else if (i < revealCount + 3) {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          result += '';
        }
      }

      setDisplayText(result);

      if (revealCount >= totalChars) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [hasStarted, text]);

  return (
    <Component ref={ref} className={className}>
      {hasStarted ? displayText || text : '\u00A0'}
    </Component>
  );
}

interface ScrambleHoverProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export function ScrambleHover({ text, className = '', children }: ScrambleHoverProps) {
  const [displayedText, setDisplayedText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (intervalRef.current) clearInterval(intervalRef.current);

    let frame = 0;
    const totalChars = text.length;

    intervalRef.current = setInterval(() => {
      frame += 0.25; // 4 frames per char
      const revealCount = Math.floor(frame);

      let result = '';
      for (let i = 0; i < totalChars; i++) {
        if (text[i] === ' ') {
          result += ' ';
          continue;
        }

        if (i < revealCount) {
          result += text[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayedText(result);

      if (revealCount >= totalChars) {
        setDisplayedText(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 25);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedText(text);
  };

  useEffect(() => {
    setDisplayedText(text);
  }, [text]);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children ? (
        typeof children === 'string' ? (
          displayedText
        ) : (
          children
        )
      ) : (
        displayedText
      )}
    </span>
  );
}
