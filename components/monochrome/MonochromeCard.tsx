'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface MonochromeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'inverted' | 'borderless';
  hoverInvert?: boolean;
  children: React.ReactNode;
}

export const MonochromeCard: React.FC<MonochromeCardProps> = ({
  variant = 'standard',
  hoverInvert = true,
  children,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-none p-6 md:p-8 transition-colors duration-100';

  const variantStyles = {
    standard: clsx(
      'bg-white text-black border border-black',
      hoverInvert && 'hover:bg-black hover:text-white group'
    ),
    inverted: 'bg-black text-white border-none',
    borderless: 'bg-transparent text-black border-none p-0',
  };

  return (
    <div className={clsx(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
};
