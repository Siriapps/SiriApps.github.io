/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Instrument Serif', 'serif'],
        body: ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        'body-lg': ['1.65rem', { lineHeight: '1.6' }],
        'heading-sm': ['2.5rem', { lineHeight: '1.1' }],
        'heading-md': ['3.5rem', { lineHeight: '1.05' }],
        'heading-lg': ['4.5rem', { lineHeight: '1.05' }],
        'heading-xl': ['5.5rem', { lineHeight: '1' }],
      },
      maxWidth: {
        content: '78rem',
      },
      spacing: {
        section: '5rem',
        'section-lg': '7rem',
      },
    },
  },
  plugins: [],
}
