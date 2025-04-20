export default defineNuxtRouteMiddleware((to, from) => {
    const app = useNuxtApp();
    const routes = app.$router.options.routes;
    const filteredRoutes = routes
        .filter((route) => {
            return route.path !== "/pick";
        })
        .map((route) => route.path);

    if (filteredRoutes.includes(to.path)) {
        return navigateTo("/pick");
    }
});
