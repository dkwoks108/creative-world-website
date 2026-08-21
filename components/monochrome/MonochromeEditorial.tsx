'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface MonochromeDropCapProps {
  text: string;
  className?: string;
}

export const MonochromeDropCap: React.FC<MonochromeDropCapProps> = ({ text, className }) => {
  if (!text) return null;
  const firstLetter = text.charAt(0);
  const remainingText = text.slice(1);

  return (
    <p className={clsx('font-serifBody text-lg md:text-xl leading-relaxed text-black', className)}>
      <span className="float-left mr-4 mt-1 flex items-center justify-center w-14 h-14 border-2 border-black font-serif text-3xl font-bold bg-white text-black leading-none uppercase">
        {firstLetter}
      </span>
      {remainingText}
    </p>
  );
};

export interface MonochromePullQuoteProps {
  quote: string;
  author?: string;
  title?: string;
  className?: string;
}

export const MonochromePullQuote: React.FC<MonochromePullQuoteProps> = ({
  quote,
  author,
  title,
  className,
}) => {
  return (
    <figure
      className={clsx(
        'group relative my-12 border-y-2 border-black py-10 md:py-14 transition-all duration-100 group-hover:border-t-[3px]',
        className
      )}
    >
      <span
        className="absolute top-2 left-0 font-serif text-7xl md:text-9xl font-bold text-black opacity-10 leading-none select-none pointer-events-none group-hover:opacity-20 transition-opacity duration-100"
        aria-hidden="true"
      >
        “
      </span>
      <blockquote className="relative z-10 font-serif text-2xl md:text-4xl italic text-black leading-snug tracking-tight">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {(author || title) && (
        <figcaption className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-medium">
          <span className="w-8 h-px bg-black" aria-hidden="true" />
          <span>
            {author} {title && <span className="text-neutral-400 font-normal">/ {title}</span>}
          </span>
        </figcaption>
      )}
    </figure>
  );
};
