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
        // Official Logo Spectrum Tokens
        brand: {
          cyan: 'var(--brand-cyan)',
          blue: 'var(--brand-blue)',
          violet: 'var(--brand-violet)',
          magenta: 'var(--brand-magenta)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
        },

        // Base Canvas & Surfaces
        ivory: 'var(--bg-ivory)',
        cream: 'var(--bg-cream)',
        plum: 'var(--bg-plum)', // Deep Ink (#111111)
        obsidian: 'var(--bg-ivory)',

        surface: {
          white: 'var(--surface-white)',
          glass: 'var(--surface-glass)',
          primary: 'var(--surface-primary)',
          secondary: 'var(--surface-secondary)',
        },

        border: {
          subtle: 'var(--border-subtle)',
          active: 'var(--border-active)',
        },

        // Brand Accents
        coral: {
          DEFAULT: 'var(--accent-coral)',
          hover: 'var(--accent-coral-hover)',
        },
        terracotta: 'var(--accent-terracotta)',
        gold: 'var(--accent-gold)',
        
        signal: {
          cyan: 'var(--brand-cyan)',
          hover: 'var(--brand-blue)',
        },
        quantum: {
          violet: 'var(--brand-violet)',
        },

        // Typography Colors
        txt: {
          primary: 'var(--text-primary)', // Deep Ink (#111111)
          secondary: 'var(--text-secondary)', // Muted Ink (#686575)
          muted: 'var(--text-muted)', // Muted Gray (#8A8793)
          onDark: 'var(--text-on-dark)', // Pure white (#FFFFFF)
          onDarkMuted: 'var(--text-on-dark-muted)',
        },

        // Functional Semantics
        semantic: {
          success: 'var(--semantic-success)',
          warning: 'var(--semantic-warning)',
          error: 'var(--semantic-error)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
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
