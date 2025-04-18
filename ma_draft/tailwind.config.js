/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Orbitron', 'sans-serif'],
      },
      colors: {
        // Base background
        'cyber-black': '#1A1A1A',
        'cyber-dark': '#121212',
        'cyber-gray': '#2A2A2A',

        // Neon accent colors
        'neon-blue': '#00DDEB',
        'neon-pink': '#FF007F',
        'neon-green': '#00FF99',
        'neon-purple': '#B026FF',
        'neon-yellow': '#FAFF00',

        // Text colors
        'cyber-white': '#F5F5F5',
        'cyber-light': '#CCCCCC',
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00DDEB, 0 0 10px #00DDEB',
        'neon-pink': '0 0 5px #FF007F, 0 0 10px #FF007F',
        'neon-green': '0 0 5px #00FF99, 0 0 10px #00FF99',
        'neon-glow': '0 0 10px rgba(0, 221, 235, 0.5), 0 0 20px rgba(0, 221, 235, 0.3)',
        'pink-glow': '0 0 10px rgba(255, 0, 127, 0.5), 0 0 20px rgba(255, 0, 127, 0.3)',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(45deg, #00DDEB, #FF007F)',
        'neon-gradient': 'linear-gradient(90deg, #00DDEB, #FF007F, #00FF99)',
        'dark-gradient': 'linear-gradient(to bottom, #1A1A1A, #121212)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 221, 235, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 221, 235, 0.8), 0 0 30px rgba(0, 221, 235, 0.6)' },
          '100%': { boxShadow: '0 0 5px rgba(0, 221, 235, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      borderRadius: {
        'cyber': '0.25rem 0.75rem 0.25rem 0.75rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-glow-blue': {
          textShadow: '0 0 5px rgba(0, 221, 235, 0.7), 0 0 10px rgba(0, 221, 235, 0.5)',
        },
        '.text-glow-pink': {
          textShadow: '0 0 5px rgba(255, 0, 127, 0.7), 0 0 10px rgba(255, 0, 127, 0.5)',
        },
        '.text-glow-green': {
          textShadow: '0 0 5px rgba(0, 255, 153, 0.7), 0 0 10px rgba(0, 255, 153, 0.5)',
        },
        '.border-glow-blue': {
          boxShadow: '0 0 5px #00DDEB, 0 0 10px #00DDEB',
        },
        '.border-glow-pink': {
          boxShadow: '0 0 5px #FF007F, 0 0 10px #FF007F',
        },
        '.border-glow-green': {
          boxShadow: '0 0 5px #00FF99, 0 0 10px #00FF99',
        },
        '.bg-grid': {
          backgroundImage: 'linear-gradient(#2A2A2A 1px, transparent 1px), linear-gradient(to right, #2A2A2A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};