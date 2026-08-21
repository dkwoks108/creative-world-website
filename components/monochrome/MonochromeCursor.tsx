'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function MonochromeCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'scrub' | 'pointer'>('default');

  const springConfig = { stiffness: 450, damping: 30, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only activate cursor on devices with fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const scrubEl = target.closest('[data-cursor="scrub"]');
      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor="pointer"]');

      if (scrubEl) {
        setCursorType('scrub');
      } else if (interactiveEl) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        pointerEvents: 'none',
      }}
      className="fixed top-0 left-0 z-50 transform -translate-x-1/2 -translate-y-1/2"
    >
      {/* Primary Architectural Box Cursor */}
      <motion.div
        animate={
          cursorType === 'scrub'
            ? { width: 90, height: 28, opacity: 1 }
            : cursorType === 'pointer'
            ? { width: 36, height: 36, opacity: 1 }
            : { width: 14, height: 14, opacity: 0.85 }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="border-2 border-black bg-white/90 text-black flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-widest shadow-lg overflow-hidden"
        style={{ borderRadius: 0 }}
      >
        {cursorType === 'scrub' && (
          <span className="animate-pulse whitespace-nowrap px-2">SCRUB ↔</span>
        )}
        {cursorType === 'pointer' && <span className="text-[12px]">→</span>}
      </motion.div>
    </motion.div>
  );
}
