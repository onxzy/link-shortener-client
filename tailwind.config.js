/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'mono': ['Source Sans Pro', 'sans-serif']
    },
    extend: {
      colors: {
        'dark': {
          100: '#7979a8',
          200: '#64649b',
          300: '#575786',
          400: '#494972',
          500: '#3c3c5d',
          600: '#2f2f48',
          700: '#212134',
          DEFAULT: '#14141f',
          900: '#07070a',
        },
        'red': {
          100: '#f681a3',
          200: '#f56c93',
          300: '#f35784',
          400: '#f24274',
          DEFAULT: '#f02d65',
          600: '#d8295b',
          700: '#c02451',
          800: '#a81f47',
          900: '#901b3d',
        },
      },
    },
  },
  plugins: [],
}
