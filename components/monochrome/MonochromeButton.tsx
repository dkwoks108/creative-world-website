'use client';

import React from 'react';
import { clsx } from 'clsx';
import { ArrowRight } from 'lucide-react';

export interface MonochromeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  showArrow?: boolean;
  children: React.ReactNode;
}

export const MonochromeButton: React.FC<MonochromeButtonProps> = ({
  variant = 'primary',
  showArrow = false,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-none font-mono text-sm uppercase tracking-widest font-medium transition-colors duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-black focus-visible:outline-offset-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-black text-white border border-black px-8 py-4 hover:bg-white hover:text-black active:bg-neutral-100',
    secondary:
      'bg-transparent text-black border-2 border-black px-8 py-4 hover:bg-black hover:text-white active:bg-neutral-900',
    ghost:
      'bg-transparent text-black border-none px-0 py-2 hover:underline underline-offset-4',
  };

  return (
    <button className={clsx(baseStyles, variants[variant], className)} {...props}>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          size={16}
          strokeWidth={1.5}
          className="ml-2 transition-transform duration-100 group-hover:translate-x-1"
        />
      )}
    </button>
  );
};
