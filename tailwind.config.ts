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
        // Minimalist Monochrome Tokens
        mono: {
          bg: '#FFFFFF',
          fg: '#000000',
          muted: '#F5F5F5',
          darkgray: '#525252',
          border: '#000000',
          lightborder: '#E5E5E5',
          card: '#FFFFFF',
          accent: '#000000',
          accentForeground: '#FFFFFF',
        },

        // Brand Color Tokens
        brand: {
          lime: '#B8FF2C',
          cobalt: '#4D5CFF',
          cyan: '#31E7FF',
        },
        obsidian: {
          DEFAULT: '#08090C',
          charcoal: '#101218',
          surface: '#151821',
          inverted: '#F4F5F0',
        },
        ivory: '#08090C',
        cream: '#101218',
        plum: '#08090C',

        surface: {
          glass: 'var(--surface-glass)',
          primary: '#151821',
          secondary: '#101218',
        },

        border: {
          subtle: 'rgba(255, 255, 255, 0.10)',
          active: 'rgba(184, 255, 44, 0.40)',
          mono: '#000000',
          monoLight: '#E5E5E5',
        },

        // Typography Colors
        txt: {
          primary: '#F5F7FA',
          secondary: '#C5CBD3',
          muted: '#9299A8',
          inverted: '#08090C',
        },

        // Legacy compatibility mappings
        coral: {
          DEFAULT: '#B8FF2C',
          hover: '#a6f514',
        },
        gold: '#B8FF2C',

        // Functional Semantics
        semantic: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
      fontFamily: {
        display: ['var(--font-display-grotesk)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'var(--font-display-serif)', 'Georgia', 'serif'],
        serifBody: ['var(--font-source-serif)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '8xl': ['8rem', { lineHeight: '1' }],
        '9xl': ['10rem', { lineHeight: '1' }],
      },
      borderWidth: {
        hairline: '1px',
        thin: '1px',
        medium: '2px',
        thick: '4px',
        ultra: '8px',
      },
      borderRadius: {
        none: '0px',
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '24px',
        pill: '9999px',
      },
      boxShadow: {
        editorial: '0 8px 30px rgba(17, 17, 17, 0.05)',
        'editorial-lg': '0 16px 50px rgba(17, 17, 17, 0.08)',
        'editorial-sm': '0 2px 8px rgba(17, 17, 17, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
