export default defineNuxtConfig({
  runtimeConfig: {
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap' }
      ]
    }
  }
})