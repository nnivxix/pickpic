// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: "2025-03-24",

  app: {
    head: {
      title: "PickPic",
      meta: [
        {
          name: "description",
          content: "Seamless Image Exploration & Markdown Generation.",
        },
        {
          name: "og:image",
          content: process.env.NUXT_APP_URL + "/og-image.jpg",
        },
        {
          name: "twitter:image",
          content: process.env.NUXT_APP_URL + "/og-image.jpg",
        },
      ],
    },
  },

  css: ['~/assets/css/tailwind.css'],

  devtools: { enabled: true },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxt/content",
  ],

  runtimeConfig: {
    unsplashAccessKey: import.meta.env.UNSPLASH_ACCESS_KEY,
    public: {
      appUrl: import.meta.env.NUXT_APP_URL,
    },
  },

  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },

  experimental: {
    asyncContext: true,
    typedPages: true,
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
