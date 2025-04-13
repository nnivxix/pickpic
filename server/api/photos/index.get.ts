import API_PATH from "~/constants/API_PATH";
import { $unsplash } from "~/utils/$unsplash";

export default defineEventHandler(async (event) => {
    const query = getQuery<{ per_page: string; page: string }>(event);
    const unsplash = await $unsplash(API_PATH.PHOTOS, {
        params: {
            per_page: query.per_page || "10",
            page: query.page || "1",
        },
    });

    return unsplash;
});
