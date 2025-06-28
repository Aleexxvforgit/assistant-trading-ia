/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: 'class', // ← ajoute ça
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
          dark: {
          background: '#0f1117',
          surface: '#1a1c23',
          card: '#242731',
          text: '#f1f1f1',
          muted: '#a1a1a1',
          border: '#2e2e2e'
        },
        light: {
          background: '#f9fafb',
          surface: '#f3f4f6',
          card: '#e5e7eb',
          text: '#111827',
          muted: '#4b5563',
          border: '#d1d5db'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
