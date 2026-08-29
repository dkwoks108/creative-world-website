'use client';

import React from 'react';

export interface CWCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'glass' | 'editorial' | 'featured' | 'dark' | 'light' | 'gradient-border';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export function CWCard({
  variant = 'standard',
  hoverEffect = true,
  children,
  className = '',
  ...props
}: CWCardProps) {
  const variantStyles = {
    standard: 'cw-card-standard p-6 sm:p-8 text-slate-100',
    glass: 'cw-card-glass p-6 sm:p-8 text-slate-100',
    editorial: 'cw-card-editorial p-6 sm:p-8 text-slate-100',
    featured: 'relative rounded-3xl p-6 sm:p-8 bg-[#0E1424] border border-[#00CFFF]/30 shadow-[0_0_30px_rgba(0,207,255,0.15)] text-slate-100',
    dark: 'cw-card-glass p-6 sm:p-8 text-slate-100',
    light: 'bg-white rounded-3xl p-6 sm:p-8 text-slate-900 border border-slate-200',
    'gradient-border': 'relative rounded-3xl p-6 sm:p-8 bg-slate-900/90 backdrop-blur-xl border border-transparent [background-clip:padding-box,_border-box] [background-origin:border-box] [background-image:linear-gradient(#0E131F,_#0E131F),_linear-gradient(135deg,_#00CFFF,_#1769FF,_#D900FF)]',
  };

  const hoverClass = hoverEffect ? 'transition-all duration-300 hover:-translate-y-1' : '';

  return (
    <div
      className={`${variantStyles[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

