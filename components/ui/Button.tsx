import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, className, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] hover:-translate-y-[1px]';

    const variantStyles = {
      primary:
        'bg-plum text-ivory shadow-editorial hover:bg-ink-soft hover:shadow-editorial-lg font-semibold',
      secondary:
        'bg-white text-plum border border-border-subtle hover:bg-cream hover:border-border-active shadow-editorial-sm',
      outline:
        'bg-transparent text-plum border border-border-subtle hover:border-plum hover:bg-plum/5',
      accent:
        'bg-brand-blue text-white shadow-editorial hover:bg-brand-blue/90 hover:shadow-editorial-lg font-semibold',
    };

    const sizeStyles = {
      sm: 'h-10 px-4 text-xs font-mono tracking-wider uppercase',
      md: 'h-12 px-6 text-sm',
      lg: 'h-14 px-8 text-base font-semibold',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        <span>{children}</span>
        {icon && <span className="ml-2.5 transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
