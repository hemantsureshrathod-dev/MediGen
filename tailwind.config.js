/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medigen: {
          navy: '#0A1E34',
          navyLight: '#122D4D',
          blue: '#1E40AF',
          blueLight: '#3B82F6',
          cyan: '#0284C7',
          teal: '#0D9488',
          tealLight: '#14B8A6',
          tealBg: '#F0FDFA',
          accent: '#EA580C',
          accentLight: '#F97316',
          accentSoft: '#FFF7ED',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px 0 rgba(10, 30, 52, 0.04), 0 1px 2px -1px rgba(10, 30, 52, 0.04)',
        'soft': '0 4px 12px -2px rgba(10, 30, 52, 0.06), 0 2px 6px -1px rgba(10, 30, 52, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(10, 30, 52, 0.08), 0 4px 10px -2px rgba(10, 30, 52, 0.04)',
        'soft-xl': '0 20px 35px -5px rgba(10, 30, 52, 0.1), 0 8px 16px -4px rgba(10, 30, 52, 0.06)',
      }
    },
  },
  plugins: [],
}

