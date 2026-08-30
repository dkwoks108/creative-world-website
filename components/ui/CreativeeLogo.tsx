'use client';

import React from 'react';
import Image from 'next/image';

export interface CreativeeLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal';
  accentColor?: string;
  brandColor?: string;
  textColor?: string;
  height?: number | string;
}

export function CreativeeLogo({
  className = '',
  variant = 'horizontal',
  textColor = '#ffffff',
  height = 36,
}: CreativeeLogoProps) {
  const numericHeight = typeof height === 'number' ? height : parseInt(height as string, 10) || 36;
  const isLightText = textColor.toLowerCase() === '#ffffff' || textColor.toLowerCase() === '#f8fafc';

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
        <Image
          src="/brand/symbol-only-transparent.png"
          alt="Creativee World Logo Mark"
          width={numericHeight}
          height={numericHeight}
          className="shrink-0 object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 select-none group ${className}`}>
      {/* Official CW Brand Logo Symbol File */}
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/brand/symbol-only-transparent.png"
          alt="Creativee World Logo Mark"
          width={numericHeight}
          height={numericHeight}
          className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Typography Brand Name */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-display font-extrabold text-base tracking-tight ${
            isLightText ? 'text-white' : 'text-slate-900'
          }`}
        >
          CREATIVEE<span className="text-[#00CFFF]">.</span>
        </span>
        <span className="font-mono text-[9px] tracking-[0.22em] text-slate-400 uppercase font-medium mt-0.5">
          WORLD
        </span>
      </div>
    </div>
  );
}
