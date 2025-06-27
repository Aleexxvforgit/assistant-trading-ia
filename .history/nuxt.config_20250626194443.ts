export default {
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  nitro: {
    compatibility: {
      date: '2025-06-26'
    }
  }
}
