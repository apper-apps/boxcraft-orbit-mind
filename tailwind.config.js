/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF6F0',
          100: '#F5EDE0',
          200: '#EBDBC1',
          300: '#E1C9A2',
          400: '#D7B783',
          500: '#D4A574',
          600: '#BC8E5E',
          700: '#A47748',
          800: '#8C6032',
          900: '#74491C'
        },
        secondary: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#D2D9E0',
          300: '#BBC6D1',
          400: '#A4B3C2',
          500: '#2C3E50',
          600: '#253545',
          700: '#1E2C3A',
          800: '#17232F',
          900: '#101A24'
        },
        accent: {
          50: '#FDEDED',
          100: '#FCDCDC',
          200: '#F9B9B9',
          300: '#F69696',
          400: '#F37373',
          500: '#E74C3C',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D'
        },
        surface: '#FAFAFA',
        background: '#FFFFFF'
      },
      fontFamily: {
        'display': ['Bebas Neue', 'cursive'],
        'body': ['Inter', 'sans-serif']
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem'
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'hard': '0 8px 32px rgba(0, 0, 0, 0.15)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'gradient-y': {
          '0%, 50%, 100%': { 'background-size': '400% 400%', 'background-position': 'center top' },
          '25%': { 'background-size': '200% 200%', 'background-position': 'center center' },
          '75%': { 'background-size': '200% 200%', 'background-position': 'center bottom' }
        },
        'gradient-x': {
          '0%, 50%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '25%': { 'background-size': '200% 200%', 'background-position': 'right center' }
        },
        'gradient-xy': {
          '0%, 100%': { 'background-size': '400% 400%', 'background-position': 'left center' },
          '25%': { 'background-size': '200% 200%', 'background-position': 'right center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right bottom' },
          '75%': { 'background-size': '200% 200%', 'background-position': 'left bottom' }
        }
      }
    },
  },
  plugins: [],
}