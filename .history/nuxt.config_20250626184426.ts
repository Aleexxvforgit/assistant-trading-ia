export default defineNuxtConfig({
  compatibilityDate: '2025-06-26',
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY
  },
  modules: [],
  app: {
    head: {
      title: 'Assistant Trading IA',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Assistant IA pour analyser vos trades et automatiser vos décisions.' }
      ]
    }
  }
})
