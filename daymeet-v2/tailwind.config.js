/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace']
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        }
      },
      colors: {
        brand: {
          surface: '#FAF9FF',
          card: '#FFFFFF',
          containerHigh: '#E5E8F5',
          containerLow: '#F1F3FF',
          onSurface: '#181B25',
          onSurfaceVariant: '#464555',
          outlineVariant: '#C7C4D8',
          primary: '#3525CD',
          primaryContainer: '#4F46E5',
          primaryFixed: '#E2DFFF',
          secondary: '#006591',
          tertiary: '#005338',
          tertiaryFixed: '#6FFBBE',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#E53935',
          sky: '#0288D1'
        }
      }
    }
  },
  plugins: [],
}
