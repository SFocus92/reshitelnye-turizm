/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        green: {
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
        },
        yellow: {
          300: '#fef08a',
          500: '#eab308',
          600: '#ca8a04',
        },
      },
    },
  },
  plugins: [],
};
