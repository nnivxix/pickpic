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
                        "Seamless Image Exploration & Markdown Generation.",
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
