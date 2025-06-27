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
      date: 'export default {
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
      date: '2025-06-26'
    }
  }
}
'
    }
  }
}
