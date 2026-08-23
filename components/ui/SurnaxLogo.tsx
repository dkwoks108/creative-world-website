'use client';

import React from 'react';
import Image from 'next/image';

interface SurnaxLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal';
  accentColor?: string;
  brandColor?: string;
  textColor?: string;
  height?: number | string;
}

export function SurnaxLogo({
  className = '',
  variant = 'horizontal',
  textColor = '#000000',
  height = 32,
}: SurnaxLogoProps) {
  const numericHeight = typeof height === 'number' ? height : parseInt(height, 10) || 32;

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center shrink-0 ${className}`}>
        <Image
          src="/brand/symbol-only-transparent.png"
          alt="Surnax"
          width={numericHeight * 1.7}
          height={numericHeight}
          style={{ height: numericHeight, width: 'auto' }}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
    );
  }

  // Full Horizontal or Vertical Logo using canonical assets
  const logoSrc = textColor === '#FFFFFF' || textColor === '#ffffff'
    ? '/brand/logo-horizontal-white-transparent.png'
    : '/brand/logo-horizontal-transparent.png';

  return (
    <div className={`inline-flex items-center shrink-0 ${className}`}>
      <Image
        src={logoSrc}
        alt="Surnax"
        width={numericHeight * 3.8}
        height={numericHeight}
        style={{ height: numericHeight, width: 'auto' }}
        className="object-contain transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </div>
  );
}

