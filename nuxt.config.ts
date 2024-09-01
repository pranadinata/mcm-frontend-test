// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: {
    dirs: [
      {
        path: '~/components', // Path ke folder komponen
        global: true, // Mengaktifkan auto-import untuk semua komponen di direktori ini
        extensions: ['vue'], // Ekstensi file yang akan dipertimbangkan sebagai komponen
      },
    ],
  },
  devtools: { enabled: false },
  // routeRules: { '/': { prerender: true }, '/*': { cors: true } },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
