import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F2EC',
        sand: '#ECE4D9',
        violet: '#2C1F33',
        deep: '#1E1424',
        gold: '#B9A38B',
        champagne: '#E6DACB',
        muted: '#6B5C6E',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(18px)' }, to: { opacity: '1', transform: 'none' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        ring: { '0%': { transform: 'scale(.8)', opacity: '.9' }, '100%': { transform: 'scale(1.6)', opacity: '0' } },
      },
      animation: {
        rise: 'rise .9s ease both',
        'rise-fast': 'rise .35s ease both',
        marquee: 'marquee 40s linear infinite',
        ring: 'ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
