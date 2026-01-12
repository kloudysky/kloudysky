import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'cursor-blink': 'cursor-blink 1.2s ease-in-out infinite',
        'grid-move': 'grid-move 20s linear infinite',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'grid-move': {
          '0%': { transform: 'translateZ(0)' },
          '100%': { transform: 'translateZ(100px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
