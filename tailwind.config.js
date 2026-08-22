/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Pixelify Sans"', 'monospace'],
        hand: ['Caveat', 'cursive'],
        marker: ['"Pixelify Sans"', 'monospace'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#2a2520',
        paper: {
          DEFAULT: '#e8dfcc',
          50: '#faf5ea',
          100: '#f4ede0',
          200: '#e8dfcc',
          300: '#d4c9b0',
          400: '#b8a98c',
        },
        scrap: {
          cream: '#faf5ea',
          pink: '#f7c6d3',
          pinkDeep: '#e89ab0',
          yellow: '#f4d989',
          yellowDeep: '#e8c463',
          blue: '#b8d4e8',
          blueDeep: '#8ab8d4',
          sage: '#c5d9bf',
          sageDeep: '#9ab89a',
          lavender: '#d4c5e8',
          lavenderDeep: '#b09ad0',
          coral: '#f4b8a8',
          coralDeep: '#e89888',
          mint: '#bfe8d4',
          mintDeep: '#92c9aa',
          red: '#e87060',
        },
      },
      boxShadow: {
        sticker: '2px 2px 0 0 rgba(42,37,32,0.12)',
        'sticker-sm': '1px 1px 0 0 rgba(42,37,32,0.10)',
        'sticker-lg': '4px 4px 0 0 rgba(42,37,32,0.15)',
        soft: '0 4px 16px -4px rgba(42,37,32,0.15)',
        paper: '2px 3px 6px -1px rgba(42,37,32,0.18), 3px 4px 0 -1px rgba(42,37,32,0.04)',
        'paper-lg': '4px 6px 14px -2px rgba(42,37,32,0.22), 5px 7px 0 -1px rgba(42,37,32,0.05)',
      },
      borderRadius: {
        blob: '38% 62% 55% 45% / 50% 45% 55% 50%',
        wobble: '28px 24px 30px 26px / 26px 30px 24px 28px',
        rough: '12px 10px 14px 8px / 10px 14px 8px 12px',
      },
      keyframes: {
        wiggle: {
          '0%,100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.96) translateY(6px)', opacity: '0' },
          '60%': { transform: 'scale(1.01)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'draw-in': {
          '0%': { strokeDashoffset: '400' },
          '100%': { strokeDashoffset: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-12px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.6s ease-in-out',
        float: 'float 4s ease-in-out infinite',
        pop: 'pop 0.4s ease-out',
        'spin-slow': 'spin-slow 20s linear infinite',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
