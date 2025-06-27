/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        accent: '#00f6ff'
      }
    }
  },
  plugins: [],
}
