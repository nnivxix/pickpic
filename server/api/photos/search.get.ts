import API_PATH from "~/constants/API_PATH";
import { $unsplash } from "~/utils/$unsplash";

export default defineEventHandler((event) => {
    const query = getQuery<{ query: string; per_page: string; page: string }>(
        event
    );

    if (!query.query) {
        setResponseHeader(event, "Content-Type", "application/json");
        setResponseStatus(event, 422, "Unprocessable Entity");

        return {
            statusCode: 422,
            statusMessage: "Query parameter is required",
        };
    }

    const unsplash = $unsplash(API_PATH.SEARCH_PHOTOS, {
        params: {
            query: query.query,
            per_page: query.per_page || "10",
            page: query.page || "1",
        },
    });

    return unsplash;
});
