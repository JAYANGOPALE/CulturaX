/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'heritage-title': ['"Cinzel"', 'serif'],
        'heritage-body': ['"Lora"', 'serif'],
        'tech': ['"Orbitron"', 'sans-serif'],
        'hand': ['"Patrick Hand"', 'cursive'],
        'sans': ['"Quicksand"', 'sans-serif'],
      },
      colors: {
        'heritage-cream': '#F9F5EB',
        'heritage-paper': '#F0EAD6',
        'heritage-brown': '#4A3B2C',
        'heritage-accent': '#C19A6B',
        'ar-dark': '#000000',
        'ar-gold': '#FFD700',
        'tech-purple': '#FACC15',
        'tech-pink': '#FFFFFF',
        'watercolor-blue': '#00f3ff', 
        'watercolor-red': '#ff0055',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

