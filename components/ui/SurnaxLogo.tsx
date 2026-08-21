'use client';

import React from 'react';

interface SurnaxLogoProps {
  className?: string;
  variant?: 'full' | 'mark';
  accentColor?: string; // Color for circuit nodes/pixels (default: #B8FF2C Acid Lime)
  brandColor?: string;  // Color for SX mark (default: #4D5CFF Hyper Cobalt or #F5F7FA White)
  textColor?: string;   // Color for 'surnax' wordmark (default: #F5F7FA)
  height?: number | string;
}

export function SurnaxLogo({
  className = '',
  variant = 'full',
  accentColor = '#B8FF2C',
  brandColor = '#F5F7FA',
  textColor = '#F5F7FA',
  height = 36,
}: SurnaxLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* SX Circuit Logo Mark SVG */}
      <svg
        viewBox="0 0 140 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: height, width: 'auto' }}
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="sxBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={brandColor} />
            <stop offset="100%" stopColor={brandColor === '#F5F7FA' ? '#E2E8F0' : brandColor} />
          </linearGradient>
          <linearGradient id="sxAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} />
            <stop offset="100%" stopColor={accentColor === '#B8FF2C' ? '#9ee016' : '#31E7FF'} />
          </linearGradient>
        </defs>

        {/* Curved S Element blending into X */}
        <path
          d="M 55 22 C 30 22 20 36 20 52 C 20 68 35 74 55 78 L 78 83 C 95 87 100 95 100 102 C 100 110 88 116 70 116 L 22 116"
          stroke="url(#sxBrandGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Main X Diagonal Crossing Line */}
        <path
          d="M 52 86 L 105 32"
          stroke="url(#sxBrandGrad)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Tech Circuit Stem extending top-right */}
        <path
          d="M 85 52 L 108 24"
          stroke="url(#sxAccentGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Node Circle */}
        <circle cx="108" cy="24" r="7" fill="url(#sxAccentGrad)" />

        {/* Floating Digital Pixel Blocks */}
        <rect x="120" y="10" width="10" height="10" rx="2" fill="url(#sxAccentGrad)" />
        <rect x="114" y="32" width="10" height="10" rx="2" fill="url(#sxAccentGrad)" />
      </svg>

      {/* Surnax Wordmark (Lower Case Modern Sans) */}
      {variant === 'full' && (
        <span
          className="font-sans font-bold tracking-tight text-xl sm:text-2xl leading-none lowercase select-none"
          style={{ color: textColor }}
        >
          surnax
          <span style={{ color: accentColor }}>.</span>
        </span>
      )}
    </div>
  );
}
