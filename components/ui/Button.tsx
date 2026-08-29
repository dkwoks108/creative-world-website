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
      'inline-flex items-center justify-center font-display font-semibold rounded-full cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00CFFF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

    const variantStyles: Record<string, string> = {
      primary:
        'bg-cw-gradient text-white shadow-cw-glow hover:opacity-95 active:scale-[0.98] border border-white/10',
      secondary:
        'bg-slate-900 text-white border border-white/15 hover:border-white/30 hover:bg-slate-800 shadow-md',
      outline:
        'bg-transparent text-slate-200 border border-white/20 hover:border-white/40 hover:bg-white/5',
      accent:
        'bg-[#00CFFF] text-black hover:bg-white shadow-cw-glow font-bold',
      default:
        'bg-cw-gradient text-white shadow-cw-glow hover:opacity-95',
      destructive:
        'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20',
      ghost:
        'hover:bg-white/10 text-slate-300 hover:text-white',
      link:
        'text-[#00CFFF] underline-offset-4 hover:underline',
      neon:
        'border border-[#00CFFF] text-[#00CFFF] hover:bg-[#00CFFF]/10 shadow-cw-glow',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-6 text-sm',
      lg: 'h-13 px-8 text-base font-bold',
      default: 'h-11 px-5 py-2 text-sm',
      icon: 'h-9 w-9 p-0 rounded-full',
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
