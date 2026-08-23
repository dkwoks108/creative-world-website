import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'default' | 'destructive' | 'ghost' | 'link' | 'neon';
  size?: 'sm' | 'md' | 'lg' | 'default' | 'icon';
  icon?: React.ReactNode;
  asChild?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, className, children, asChild = false, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

    const variantStyles: Record<string, string> = {
      primary:
        'bg-plum text-white shadow-elevated hover:shadow-hover hover:bg-ink-soft active:shadow-pressed font-semibold border border-transparent',
      secondary:
        'bg-surface-secondary text-txt-primary border border-border-subtle shadow-subtle hover:bg-white hover:border-border-active hover:shadow-elevated',
      outline:
        'bg-transparent text-txt-primary border border-border-subtle hover:border-border-active hover:bg-white hover:shadow-subtle',
      accent:
        'bg-coral text-white shadow-elevated hover:bg-coral-hover hover:shadow-hover active:shadow-pressed font-semibold',
      default:
        'bg-plum text-white shadow-elevated hover:shadow-hover font-semibold',
      destructive:
        'bg-semantic-error/10 text-semantic-error border border-semantic-error/20 hover:bg-semantic-error/20',
      ghost:
        'hover:bg-surface-secondary text-txt-secondary hover:text-txt-primary',
      link:
        'text-coral underline-offset-4 hover:underline',
      neon:
        'border border-signal-cyan text-signal-cyan hover:bg-signal-cyan/10 shadow-glow',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base font-semibold',
      default: 'h-10 px-4 py-2 text-sm',
      icon: 'h-9 w-9 p-0',
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variantStyles[variant] || variantStyles.primary, sizeStyles[size] || sizeStyles.md, className)}
        {...props}
      >
        {children}
        {icon && <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
