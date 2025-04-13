import API_PATH from "~/constants/API_PATH";
import { $unsplash } from "~/utils/$unsplash";

export default defineEventHandler((event) => {
    const query = getQuery<{ query: string; per_page: string; page: string }>(
        event
    );

    const unsplash = $unsplash(API_PATH.SEARCH_PHOTOS, {
        params: {
            query: query.query,
            per_page: query.per_page || "10",
            page: query.page || "1",
        },
    });

    return unsplash;
});
