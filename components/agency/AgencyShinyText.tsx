'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AgencyShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // duration in seconds
  className?: string;
  baseColor?: string;
  shineColor?: string;
  spread?: number; // angle in degrees
}

export function AgencyShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  baseColor = '#00CFFF',
  shineColor = '#F5F7FA',
  spread = 100,
}: AgencyShinyTextProps) {
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
