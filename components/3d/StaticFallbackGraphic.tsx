import React from 'react';

export function StaticFallbackGraphic() {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[400px]">
      {/* Ambient Glow Backplate with brand spectrum */}
      <div className="absolute w-72 h-72 rounded-full bg-brand-cyan/15 blur-[80px]" />
      <div className="absolute w-60 h-60 rounded-full bg-brand-magenta/15 blur-[90px]" />

      {/* SVG Connected Core Fallback */}
      <svg
        viewBox="0 0 400 400"
        className="w-72 h-72 sm:w-96 sm:h-96 relative z-10 opacity-90"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00CFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1769FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#673BFF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="streamGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00CFFF" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#1769FF" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#673BFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D900FF" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Outer Orbit Rings */}
        <circle cx="200" cy="200" r="160" stroke="#CBD5E1" strokeWidth="1.5" fill="none" strokeDasharray="6 6" />
        <circle cx="200" cy="200" r="110" stroke="#E2E8F0" strokeWidth="1" fill="none" />

        {/* Signal Stream Paths */}
        <path d="M 60 340 Q 150 240 200 200" stroke="url(#streamGrad)" strokeWidth="2.5" fill="none" />
        <path d="M 340 340 Q 250 240 200 200" stroke="url(#streamGrad)" strokeWidth="2.5" fill="none" />
        <path d="M 200 60 Q 200 140 200 200" stroke="url(#streamGrad)" strokeWidth="2" fill="none" strokeDasharray="4 4" />

        {/* Upward Growth Beam */}
        <polygon points="185,200 215,200 208,40 192,40" fill="url(#coreGlow)" opacity="0.6" />

        {/* Central Core Structure */}
        <circle cx="200" cy="200" r="45" fill="url(#coreGlow)" />
        <polygon
          points="200,165 230,185 230,215 200,235 170,215 170,185"
          fill="#111111"
          stroke="#00CFFF"
          strokeWidth="2"
        />
        <circle cx="200" cy="200" r="12" fill="#D900FF" />

        {/* Node Points */}
        <circle cx="60" cy="340" r="5" fill="#00CFFF" />
        <circle cx="340" cy="340" r="5" fill="#D900FF" />
        <circle cx="150" cy="240" r="4" fill="#1769FF" />
        <circle cx="250" cy="240" r="4" fill="#673BFF" />
      </svg>
    </div>
  );
}
