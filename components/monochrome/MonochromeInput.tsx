'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface MonochromeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const MonochromeInput = React.forwardRef<HTMLInputElement, MonochromeInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-mono text-xs uppercase tracking-widest text-black font-semibold">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full bg-white text-black font-serifBody text-base px-0 py-3 border-b-2 border-black rounded-none transition-all duration-100 placeholder:text-neutral-500 placeholder:italic focus:border-b-[4px] focus:outline-none focus-visible:border-b-[4px]',
            error && 'border-b-red-600',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 font-mono text-xs text-red-600 tracking-wide">{error}</p>
        )}
      </div>
    );
  }
);

MonochromeInput.displayName = 'MonochromeInput';

export interface MonochromeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const MonochromeTextarea = React.forwardRef<HTMLTextAreaElement, MonochromeTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-mono text-xs uppercase tracking-widest text-black font-semibold">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'w-full bg-white text-black font-serifBody text-base px-0 py-3 border-b-2 border-black rounded-none transition-all duration-100 placeholder:text-neutral-500 placeholder:italic focus:border-b-[4px] focus:outline-none focus-visible:border-b-[4px] min-h-[120px] resize-y',
            error && 'border-b-red-600',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 font-mono text-xs text-red-600 tracking-wide">{error}</p>
        )}
      </div>
    );
  }
);

MonochromeTextarea.displayName = 'MonochromeTextarea';
