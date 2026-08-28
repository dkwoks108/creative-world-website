'use client';

import React from 'react';

export interface CWCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dark' | 'light' | 'gradient-border';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export function CWCard({
  variant = 'dark',
  hoverEffect = true,
  children,
  className = '',
  ...props
}: CWCardProps) {
  const variantStyles = {
    dark: 'cw-glass-card rounded-3xl p-6 sm:p-8 text-slate-100',
    light: 'cw-light-glass-card rounded-3xl p-6 sm:p-8 text-slate-900',
    'gradient-border': 'relative rounded-3xl p-6 sm:p-8 bg-slate-900/90 backdrop-blur-xl border border-transparent [background-clip:padding-box,_border-box] [background-origin:border-box] [background-image:linear-gradient(#0E131F,_#0E131F),_linear-gradient(135deg,_#00CFFF,_#1769FF,_#D900FF)]',
  };

  const hoverClass = hoverEffect ? 'transition-all duration-300 hover:-translate-y-1.5' : '';

  return (
    <div
      className={`${variantStyles[variant]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
