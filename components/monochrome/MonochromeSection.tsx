'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface MonochromeSectionProps extends React.HTMLAttributes<HTMLElement> {
  divider?: 'none' | 'thick' | 'ultra';
  texture?: 'none' | 'lines' | 'grid' | 'diagonal' | 'noise' | 'stats' | 'cta';
  inverted?: boolean;
  children: React.ReactNode;
}

export const MonochromeSection: React.FC<MonochromeSectionProps> = ({
  divider = 'thick',
  texture = 'none',
  inverted = false,
  children,
  className,
  ...props
}) => {
  const textureClasses = {
    none: '',
    lines: 'bg-texture-lines',
    grid: 'bg-texture-grid',
    diagonal: 'bg-texture-diagonal',
    noise: 'bg-texture-noise',
    stats: 'bg-texture-stats',
    cta: 'bg-texture-cta',
  };

  const dividerClasses = {
    none: '',
    thick: 'border-t-4 border-black',
    ultra: 'border-t-8 border-black',
  };

  return (
    <section
      className={clsx(
        'relative py-20 md:py-28 lg:py-36 w-full overflow-hidden',
        inverted ? 'bg-black text-white' : 'bg-white text-black',
        dividerClasses[divider],
        className
      )}
      {...props}
    >
      {texture !== 'none' && (
        <div
          className={clsx(
            'absolute inset-0 pointer-events-none opacity-20',
            textureClasses[texture]
          )}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
};
