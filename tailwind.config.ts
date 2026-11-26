import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070C18',
          900: '#0B1220',
          800: '#0F172A',
          700: '#16223A',
          600: '#1E293B',
          500: '#334155',
        },
        accent: {
          deep: '#0369A1',
          brand: '#2563EB',
          bright: '#38BDF8',
          soft: '#7DD3FC',
          pale: '#E0F2FE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        panel: '0 24px 70px -30px rgba(2, 6, 23, 0.55)',
        glow: '0 0 0 1px rgba(56, 189, 248, 0.18), 0 30px 90px -40px rgba(37, 99, 235, 0.7)',
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(to right, rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.10) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '42px 42px',
      },
      maxWidth: {
        content: '1200px',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
};

export default config;
