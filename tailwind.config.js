/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: true,
  theme: {
    fontFamily: {
      // caption uses the systemfont so it looks more native
      display: ['caption'],
      body: ['caption'],
    },
    extend: {
      colors: {
        background: {
          default: '#000000',
          secondary: '#111315',
          third: "#15181b"
        },
        primary: {
          100: '#0746eb',
          200: '#063fd4',
          300: '#0638bc',
          400: '#0531a5',
          500: '#042a8d',
          600: '#042376',
          700: '#031c5e',
          800: '#021546',
          900: '#010e2f',
        },
      },
    },
  },
  variants: {
    outline: ['focus', 'hover'],
    border: ['focus', 'hover'],
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
