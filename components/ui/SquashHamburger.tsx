'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  className?: string;
}

export function SquashHamburger({ isOpen, className = '' }: SquashHamburgerProps) {
  const transition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  };

  return (
    <div className={`relative w-[18px] h-[12px] flex flex-col justify-between items-center ${className}`}>
      {/* Top Bar */}
      <motion.span
        animate={
          isOpen
            ? { rotate: 45, y: 5.25 }
            : { rotate: 0, y: 0 }
        }
        transition={transition}
        className="w-full h-[1.5px] bg-current block transform-origin-center"
      />

      {/* Middle Bar */}
      <motion.span
        animate={
          isOpen
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1 }
        }
        transition={transition}
        className="w-full h-[1.5px] bg-current block"
      />

      {/* Bottom Bar */}
      <motion.span
        animate={
          isOpen
            ? { rotate: -45, y: -5.25 }
            : { rotate: 0, y: 0 }
        }
        transition={transition}
        className="w-full h-[1.5px] bg-current block transform-origin-center"
      />
    </div>
  );
}
