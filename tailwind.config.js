/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ParlouX Brand Colors
        'deep-black': '#0A0A0A',
        'soft-gold': '#C9A34E',
        'bright-gold': '#DDBB5F',
        'ivory-white': '#F9F8F6',
        'elegant-base': '#D1CFCB',
        'champagne-nude': '#E8DCC4',
        'font-primary': '#111111',
        'font-secondary': '#4B4B4B',
        // Dark mode specific colors
        'font-primary-dark': '#F9F8F6',
        'font-secondary-dark': '#D1CFCB',
        'font-muted-dark': '#A8A6A1',
      },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'josefin': ['Josefin Sans', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'gold-underline': 'goldUnderline 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        goldUnderline: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
