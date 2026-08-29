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
  height = 32,
}: CreativeeLogoProps) {
  const numericHeight = typeof height === 'number' ? height : parseInt(height as string, 10) || 32;

  const isLightText = textColor.toLowerCase() === '#ffffff' || textColor.toLowerCase() === '#f8fafc';

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
        <svg
          width={numericHeight}
          height={numericHeight}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <rect width="40" height="40" rx="10" fill="#07090E" />
          <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="rgba(255,255,255,0.12)" />
          <path
            d="M12 28V12H20C23.3137 12 26 14.6863 26 18C26 21.3137 23.3137 24 20 24H12"
            stroke="url(#cw_logo_grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="28" r="3" fill="#00CFFF" />
          <defs>
            <linearGradient id="cw_logo_grad" x1="12" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00CFFF" />
              <stop offset="0.5" stopColor="#1769FF" />
              <stop offset="1" stopColor="#D900FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 shrink-0 select-none group ${className}`}>
      {/* Brand Icon Mark */}
      <svg
        width={numericHeight}
        height={numericHeight}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <rect width="40" height="40" rx="10" fill="#07090E" />
        <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="rgba(255,255,255,0.12)" />
        <path
          d="M11 27V13H19C22.3137 13 25 15.6863 25 19C25 22.3137 22.3137 25 19 25H11"
          stroke="url(#cw_nav_logo_grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="27" cy="27" r="3" fill="#00CFFF" />
        <defs>
          <linearGradient id="cw_nav_logo_grad" x1="11" y1="13" x2="27" y2="27" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00CFFF" />
            <stop offset="0.5" stopColor="#1769FF" />
            <stop offset="1" stopColor="#D900FF" />
          </linearGradient>
        </defs>
      </svg>

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
          WORLD STUDIO
        </span>
      </div>
    </div>
  );
}
