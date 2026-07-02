import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './features/**/*.{ts,tsx}', './shared/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0B08',
        surface: '#17140F',
        surface2: '#211C15',
        saffron: '#D89B3C',
        ember: '#A8502A',
        cream: '#F2E9D8',
        muted: '#9C9483',
        line: '#2A2419'
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif']
      },
      letterSpacing: {
        eyebrow: '0.08em'
      },
      backgroundImage: {
        'scrim-bottom': 'linear-gradient(to top, #0D0B08 0%, rgba(13,11,8,0.55) 40%, rgba(13,11,8,0) 75%)'
      }
    }
  },
  plugins: []
};

export default config;
