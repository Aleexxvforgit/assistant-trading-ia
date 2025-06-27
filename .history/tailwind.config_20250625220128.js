/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class', // active le mode sombre basé sur une classe
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#3b82f6',
          500: '#2563eb',
          700: '#1d4ed8'
        },
        gray: {
          900: '#121212',
          800: '#1f1f1f',
          700: '#272727'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
