'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#07090E] text-white flex items-center justify-center min-h-screen font-sans">
        <div className="text-center space-y-6 max-w-md p-8 bg-slate-900/80 border border-white/10 rounded-3xl shadow-2xl">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#00CFFF] text-xs font-mono font-semibold">
            CRITICAL SYSTEM ERROR
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            System Connection Lost
          </h1>
          <p className="text-sm text-slate-300 font-light">
            A critical error occurred while rendering the page.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#1769FF] to-[#D900FF] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
