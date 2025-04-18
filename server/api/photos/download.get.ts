import { $unsplash } from "~/utils/$unsplash";

export default defineEventHandler(async (event) => {
    const query = getQuery<{ location: string }>(event);
    const { location } = query;

    if (!location) {
        setResponseHeader(event, "Content-Type", "application/json");
        setResponseStatus(event, 422, "Unprocessable Entity");

        return {
            statusCode: 422,
            statusMessage: "Location parameter is required",
        };
    }

    try {
        const unsplash = await $unsplash<{ url: string }>(location);

        return {
            url: unsplash.url,
        };
    } catch (error) {
        setResponseHeader(event, "Content-Type", "application/json");
        setResponseStatus(event, 500, "Internal Server Error");

        return {
            statusCode: 500,
            statusMessage: "Internal Server Error",
        };
    }
});
