'use client';

import React from 'react';

export interface CWBadgeProps {
  variant?: 'cyan' | 'blue' | 'magenta' | 'glass';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function CWBadge({
  variant = 'cyan',
  children,
  className = '',
  dot = true,
}: CWBadgeProps) {
  const variantStyles = {
    cyan: 'bg-[#00CFFF]/10 text-[#00CFFF] border border-[#00CFFF]/30',
    blue: 'bg-[#1769FF]/10 text-[#1769FF] border border-[#1769FF]/30',
    magenta: 'bg-[#D900FF]/10 text-[#D900FF] border border-[#D900FF]/30',
    glass: 'bg-white/10 text-white border border-white/20 backdrop-blur-md',
  };

  const dotColors = {
    cyan: 'bg-[#00CFFF]',
    blue: 'bg-[#1769FF]',
    magenta: 'bg-[#D900FF]',
    glass: 'bg-emerald-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-2 h-2 rounded-full animate-pulse ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
