/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: '#e3e3e3',
        },
        'light-gray': '#f6f6f6',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
