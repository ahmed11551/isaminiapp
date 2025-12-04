/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        telegram: {
          bg: '#17212b',
          secondary: '#242f3d',
          text: '#ffffff',
          button: '#5288c1',
          buttonHover: '#4a7ba8',
        },
      },
    },
  },
  plugins: [],
};

