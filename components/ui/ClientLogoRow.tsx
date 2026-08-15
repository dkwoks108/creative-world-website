import React from 'react';
import { ClientLogoPlaceholder } from '@/types';

interface ClientLogoRowProps {
  clients: ClientLogoPlaceholder[];
}

export function ClientLogoRow({ clients }: ClientLogoRowProps) {
  return (
    <div className="w-full space-y-4">
      <p className="text-center font-mono text-[11px] uppercase tracking-widest text-txt-muted">
        TRUSTED BY AMBITIOUS LEADERS ACROSS INDUSTRIES
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex flex-col items-center justify-center h-20 px-4 py-3 rounded-xl bg-cream/40 border border-border-subtle hover:border-border-active transition-all duration-300 group"
          >
            <span className="font-mono text-xs font-semibold text-plum/70 group-hover:text-plum tracking-wider text-center transition-colors">
              {client.placeholderName}
            </span>
            <span className="text-[10px] text-txt-muted mt-1 uppercase font-mono">
              {client.industryCategory}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
