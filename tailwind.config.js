/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wedding-bg': '#0b132b',
        'wedding-text': '#e6dbd0',
        'wedding-accent': '#e6dbd0',
      },
      fontFamily: {
        'cursive': ['Dancing Script', 'Brush Script MT', 'cursive'],
      },
    },
  },
  plugins: [],
}
