import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Creativee World Logo Spectrum Tokens
        cw: {
          cyan: '#00CFFF',
          blue: '#1769FF',
          indigo: '#4F46E5',
          violet: '#673BFF',
          magenta: '#D900FF',
          
          // Dark Surfaces
          dark: '#07090E',
          'dark-card': '#0E131F',
          'dark-border': 'rgba(255, 255, 255, 0.10)',

          // Light Surfaces
          light: '#FAFBFF',
          'light-card': '#FFFFFF',
          'light-border': 'rgba(15, 23, 42, 0.08)',
        },

        // Backward Compatible Tokens mapped to CW Spectrum
        brand: {
          cyan: '#00CFFF',
          blue: '#1769FF',
          violet: '#673BFF',
          magenta: '#D900FF',
        },
        ink: {
          DEFAULT: '#0F172A',
          soft: '#1E293B',
        },

        // Canvas & Surfaces
        ivory: '#FAFBFF',
        cream: '#F1F5F9',
        plum: '#07090E',
        obsidian: '#07090E',

        surface: {
          white: '#FFFFFF',
          glass: 'rgba(14, 19, 31, 0.75)',
          primary: '#FFFFFF',
          secondary: '#FAFBFF',
        },

        border: {
          subtle: 'rgba(255, 255, 255, 0.10)',
          active: '#1769FF',
        },

        // Brand Accents
        coral: {
          DEFAULT: '#1769FF',
          hover: '#00CFFF',
        },
        terracotta: '#673BFF',
        gold: '#00CFFF',

        // Typography Colors
        txt: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          onDark: '#F8FAFC',
          onDarkMuted: '#94A3B8',
        },

        // Functional Semantics
        semantic: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        pill: '9999px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        subtle: '0 4px 20px rgba(0, 0, 0, 0.05)',
        elevated: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        hover: '0 20px 40px -10px rgba(23, 105, 255, 0.2)',
        pressed: '0 2px 8px rgba(0, 0, 0, 0.1)',
        'cw-glow': '0 0 35px rgba(23, 105, 255, 0.3)',
        'cw-magenta-glow': '0 0 35px rgba(217, 0, 255, 0.25)',
        'cw-cyan-glow': '0 0 35px rgba(0, 207, 255, 0.3)',
        'cw-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};

export default config;
