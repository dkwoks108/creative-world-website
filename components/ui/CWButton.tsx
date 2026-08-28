'use client';

import React from 'react';

export interface CWButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gradient' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function CWButton({
  variant = 'gradient',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: CWButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-display font-semibold rounded-full transition-all duration-300 relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-[#00CFFF] focus-visible:ring-offset-2';

  const variantStyles = {
    gradient: 'bg-cw-gradient text-white shadow-cw-glow hover:shadow-cw-cyan-glow hover:scale-[1.02] active:scale-[0.98]',
    glass: 'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-[1.02]',
    outline: 'bg-transparent text-slate-100 border border-slate-700 hover:border-[#1769FF] hover:text-[#00CFFF] hover:scale-[1.02]',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
  };

  const sizeStyles = {
    sm: 'px-5 py-2 text-xs sm:text-sm',
    md: 'px-6 py-3 text-sm sm:text-base',
    lg: 'px-8 py-4 text-base sm:text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
