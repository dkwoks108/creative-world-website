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
  const baseStyles = 'rounded-none p-6 md:p-8 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]';

  const variantStyles = {
    standard: clsx(
      'bg-white text-black border-2 border-black group',
      hoverInvert && 'hover:bg-black hover:text-white hover:border-black'
    ),
    inverted: 'bg-black text-white border-2 border-black group',
    borderless: 'bg-transparent text-black border-none p-0 group',
  };

  return (
    <div className={clsx(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
};

