// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-03-24",

    app: {
        head: {
            title: "PickPic",
            meta: [
                {
                    name: "description",
                    content:
                        "Pickpic is a free image library that offers high-quality photos for your personal and commercial use.",
                },
            ],
        },
    },
    devtools: { enabled: true },
    modules: [
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxt/fonts",
        "@nuxtjs/tailwindcss",
        "shadcn-nuxt",
        "@vueuse/nuxt",
    ],
    runtimeConfig: {
        public: {
            unsplash: {
                accessKey: process.env.NUXT_UNSPLASH_ACCESS_KEY,
                baseUrl: process.env.NUXT_UNSPLASH_BASE_URL,
            },
            appUrl: process.env.NUXT_APP_URL,
        },
    },
    shadcn: {
        prefix: "",
        componentDir: "./components/ui",
    },

    experimental: {
        asyncContext: true,
        typedPages: true,
    },
});
