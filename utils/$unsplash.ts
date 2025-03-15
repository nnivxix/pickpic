export const $unsplash = $fetch.create({
  baseURL: "https://api.unsplash.com",
  onRequest: async ({ options }) => {
    const runtimeConfig = useRuntimeConfig();

    options.headers.set(
      "Authorization",
      `Client-ID ${runtimeConfig.public.unsplash.accessKey}`
    );
  },
});
