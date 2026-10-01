import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08080a',
        fg: '#ededed',
        muted: '#9a9a9a',
        faint: '#5f5f66',
        hair: '#1c1c20',
        hair2: '#2b2b31',
      },
    },
  },
  plugins: [],
};

export default config;
