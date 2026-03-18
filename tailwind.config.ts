import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        // Deep charcoal-ink palette
        ink: {
          950: '#0A0C10',
          900: '#12141A',
          800: '#1C1F27',
          700: '#2A2D37',
          600: '#3D4151',
        },
        // Vibrant coral-orange accent (completely different from emerald)
        accent: {
          300: '#FF9B7A',
          400: '#FF7A50',
          500: '#FF5C28',
          600: '#E84A15',
          700: '#C43A0E',
        },
        // Cool blue-violet secondary
        violet: {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        // Warm cream surfaces
        cream: {
          50: '#FEFCF8',
          100: '#FAF5ED',
          200: '#F2E8D5',
        },
        surface: '#F7F5F0',
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1C1F27',
        },
        border: {
          DEFAULT: '#E5E0D5',
          dark: '#2A2D37',
        },
        text: {
          primary: '#12141A',
          secondary: '#555862',
          muted: '#8B8E97',
          inverse: '#FEFCF8',
        },
        // Semantic (keep functional)
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        teal: {
          500: '#14B8A6',
          600: '#0D9488',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
        },
        warning: '#D97706',
        error: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
        },
      },
      fontSize: {
        'xs':   ['0.75rem',    { lineHeight: '1.5' }],
        'sm':   ['0.875rem',   { lineHeight: '1.5' }],
        'base': ['1rem',       { lineHeight: '1.7' }],
        'md':   ['1.125rem',   { lineHeight: '1.6' }],
        'lg':   ['1.375rem',   { lineHeight: '1.4' }],
        'xl':   ['1.75rem',    { lineHeight: '1.3' }],
        '2xl':  ['2.25rem',    { lineHeight: '1.15' }],
        '3xl':  ['3rem',       { lineHeight: '1.1' }],
        '4xl':  ['3.75rem',    { lineHeight: '1.05' }],
        '5xl':  ['5rem',       { lineHeight: '1' }],
        '6xl':  ['6rem',       { lineHeight: '0.95' }],
      },
      spacing: {
        '1':   '4px',
        '2':   '8px',
        '3':   '12px',
        '4':   '16px',
        '5':   '20px',
        '6':   '24px',
        '7':   '28px',
        '8':   '32px',
        '10':  '40px',
        '12':  '48px',
        '14':  '56px',
        '16':  '64px',
        '20':  '80px',
        '24':  '96px',
        '32':  '128px',
        '40':  '160px',
        '48':  '192px',
        '64':  '256px',
      },
      letterSpacing: {
        display: '-0.04em',
        tight: '-0.02em',
        wide: '0.08em',
        wider: '0.14em',
      },
      borderRadius: {
        pill: '9999px',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'card-lift': '0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.06)',
        nav: '0 1px 0 rgba(0, 0, 0, 0.05)',
        glow: '0 0 40px rgba(255, 92, 40, 0.15)',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'draw-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'marquee-left': 'marquee-left 30s linear infinite',
        'marquee-right': 'marquee-right 30s linear infinite',
        'marquee-industries': 'marquee-left 40s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-right': 'slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-left': 'slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'draw': 'draw-line 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'glow': 'pulse-glow 3s ease-in-out infinite',
        'ticker': 'ticker 25s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
