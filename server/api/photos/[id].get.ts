import API_PATH from "~/constants/API_PATH";
import { $unsplash } from "~/utils/$unsplash";
import { FetchError } from "ofetch";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    if (!id) {
        setResponseHeader(event, "Content-Type", "application/json");
        setResponseStatus(event, 422, "Unprocessable Entity");

        return {
            statusCode: 422,
            statusMessage: "ID parameter is required",
        };
    }

    try {
        const unsplash = await $unsplash(`${API_PATH.PHOTOS}/${id}`);

        return unsplash;
    } catch (error) {
        if (error instanceof FetchError) {
            if (error.statusCode === 404) {
                setResponseHeader(event, "Content-Type", "application/json");
                setResponseStatus(event, 404, "Not Found");

                return {
                    statusCode: 404,
                    statusMessage: "Photo not found",
                };
            }
        }
        setResponseHeader(event, "Content-Type", "application/json");
        setResponseStatus(event, 500, "Internal Server Error");

        return {
            statusCode: 500,
            statusMessage: "Internal Server Error",
        };
    }
});
