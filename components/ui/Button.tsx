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
      'group inline-flex items-center justify-center font-display font-medium rounded-lg cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

    const variantStyles = {
      primary:
        'bg-[#B8FF2C] text-[#08090C] font-bold hover:bg-[#a6f514] shadow-[0_0_20px_rgba(184,255,44,0.3)] hover:shadow-[0_0_30px_rgba(184,255,44,0.5)]',
      secondary:
        'bg-[#4D5CFF] text-white font-semibold hover:bg-[#3b4ae6] shadow-md',
      outline:
        'bg-transparent text-white border border-white/20 hover:border-[#B8FF2C] hover:text-[#B8FF2C] hover:bg-[#B8FF2C]/10',
      accent:
        'bg-[#31E7FF] text-[#08090C] font-bold hover:bg-[#20d6ee] shadow-sm',
    };

    const sizeStyles = {
      sm: 'h-10 px-5 text-xs tracking-wider uppercase font-mono',
      md: 'h-12 px-7 text-sm font-semibold tracking-wide',
      lg: 'h-14 px-9 text-base font-semibold tracking-wide',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        <span>{children}</span>
        {icon && <span className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
