export const $unsplash = $fetch.create({
  baseURL: useRuntimeConfig().public.unsplash.baseUrl,
  onRequest: async ({ options }) => {
    const runtimeConfig = useRuntimeConfig();

    options.headers.set(
      "Authorization",
      `Client-ID ${runtimeConfig.public.unsplash.accessKey}`
    );
  },
});
