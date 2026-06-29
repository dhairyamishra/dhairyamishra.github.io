/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#F8F4EE',
          50: '#FFFFFF',
          100: '#FDF9F3',
          200: '#F4ECE0',
          300: '#E8DAC8',
          400: '#D9C4AA',
        },
        neon: {
          rose: '#A63A3D',
          gold: '#B8891E',
          violet: '#7F2F33',
          lime: '#5F7A57',
          pink: '#7F2F33',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          light: '#F8F1E7',
          lighter: '#EFE3D3',
        },
        muted: {
          DEFAULT: '#6F6254',
          light: '#8B7D6E',
        },
        text: {
          DEFAULT: '#241A14',
          muted: '#6F6254',
          bright: '#130E0B',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk Variable"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'neon-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(166,58,61,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(184,137,30,0.05) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(127,47,51,0.04) 0%, transparent 50%)',
        'neon-grid': 'linear-gradient(rgba(166,58,61,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(166,58,61,0.04) 1px, transparent 1px)',
        'neon-gradient-rose': 'linear-gradient(135deg, #A63A3D, #7F2F33)',
        'neon-gradient-gold': 'linear-gradient(135deg, #B8891E, #D1A545)',
        'neon-gradient-full': 'linear-gradient(135deg, #A63A3D, #7F2F33, #B8891E)',
      },
      backgroundSize: {
        'grid-size': '60px 60px',
      },
      boxShadow: {
        'neon-sm': '0 10px 24px rgba(36,26,20,0.06)',
        'neon-md': '0 14px 32px rgba(36,26,20,0.08)',
        'neon-lg': '0 24px 56px rgba(36,26,20,0.12)',
        'neon-gold-sm': '0 8px 20px rgba(184,137,30,0.10)',
        'neon-gold-md': '0 14px 30px rgba(184,137,30,0.14)',
        'neon-violet-sm': '0 8px 20px rgba(127,47,51,0.08)',
        'neon-violet-md': '0 14px 30px rgba(127,47,51,0.12)',
        'neon-glow': '0 18px 40px rgba(36,26,20,0.08)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-border': 'glow-border 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
        'typing': 'typing 3.5s steps(40, end)',
        'thread-flow': 'thread-flow 3s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-border': {
          '0%, 100%': { borderColor: 'rgba(212,80,96,0.3)' },
          '50%': { borderColor: 'rgba(212,80,96,0.6)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'typing': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'thread-flow': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
      },
    },
  },
  plugins: [],
}

