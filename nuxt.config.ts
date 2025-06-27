export default {
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
  },
  nitro: {
    compatibility: {
      date: '2024-04-03'
    }
  }
}
