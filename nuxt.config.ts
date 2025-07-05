import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/tailwind.css'],
  nitro: {
    compatibilityDate: '2025-07-05',
  },
  typescript: {
    strict: true,
    shim: false,
  },
  runtimeConfig: {
    // Clés privées accessibles côté serveur uniquement
    mistralApiKey: process.env.MISTRAL_API_KEY,
    
    // Clés publiques exposées au client
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    }
  },
  devtools: { enabled: true },
  app: {
    // Pour une transition plus fluide entre les pages
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
});