import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'narrow' | 'standard' | 'wide';
  children: React.ReactNode;
}

export function Container({
  variant = 'standard',
  className,
  children,
  ...props
}: ContainerProps) {
  const variantStyles = {
    narrow: 'max-w-[720px]',
    standard: 'max-w-[1280px]',
    wide: 'max-w-[1600px]',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
