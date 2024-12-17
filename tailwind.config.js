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
      backgroundImage: {
        'login-screen': "url('/images/login-screen.png')",
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': '0 45px 65px rgba(0, 0, 0, 1)'

      },
      colors: {
        background: {
          default: '#00000044',
          secondary: '#11131544',
          third: "#15181b66",
        },
        special: {
          red: "rgba(254, 76, 108, 1)",
          green: "rgb(39,255,8)",
          redColor: "rgb(30,30,30)",
          spotify: "#1DB954",
        },
        primary: {
          100: '#0746eb88',
          200: '#063fd4',
          300: '#0638bc',
          400: '#0531a5',
          500: '#042a8d44',
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
