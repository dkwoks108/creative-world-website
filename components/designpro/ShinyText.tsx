'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // duration in seconds
  className?: string;
  baseColor?: string;
  shineColor?: string;
  spread?: number; // angle in degrees
}

export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  baseColor = '#B8FF2C',
  shineColor = '#F5F7FA',
  spread = 100,
}: ShinyTextProps) {
  // Construct dynamic background gradient sweep
  const linearGradient = `linear-gradient(${spread}deg, ${baseColor} 0%, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`;

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        backgroundImage: linearGradient,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
      animate={
        disabled
          ? { backgroundPosition: '0% 0' }
          : { backgroundPosition: ['150% 0', '-50% 0'] }
      }
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: speed,
        ease: 'linear',
      }}
    >
      {text}
    </motion.span>
  );
}
