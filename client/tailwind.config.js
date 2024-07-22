/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      keyframes: {
        gradientMove: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        slide: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        gradientMove: 'gradientMove 8s ease infinite',
        slide: 'slide 8s linear infinite',
      },
    },
  },
  plugins: [],
}

