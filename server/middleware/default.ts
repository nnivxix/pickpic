export default defineEventHandler((event) => {
    const url = getRequestURL(event);
    const runtime = useRuntimeConfig();
    // console.log("appUrl =>", runtime.public.appUrl);

    if (url.pathname === "/api/photos") {
        // console.log("default middleware");
    }
});
