import * as cheerio from "cheerio";
import { Photo } from "~/types/photo.server";

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        url: string;
    }>(event);

    if (!body.url) {
        setResponseStatus(event, 400, "Bad Request");
        setResponseHeader(event, "Content-Type", "application/json");
        return {
            statusCode: 400,
            body: {
                message: "URL is required",
            },
        };
    }

    if (!body.url.startsWith("https://unsplash.com/")) {
        setResponseStatus(event, 400, "Bad Request");
        setResponseHeader(event, "Content-Type", "application/json");
        return {
            statusCode: 400,
            body: {
                message: "URL must be from Unsplash",
            },
        };
    }

    try {
        const response = await $fetch<string>(body.url, {
            responseType: "text",
        });

        const document = cheerio.load(response);

        const scriptTag = document("script[type='application/ld+json']").text();
        const imageObject: Photo = JSON.parse(scriptTag);

        const description = document(
            "button[aria-label='Zoom in on this image']"
        )
            .children("img")
            .attr("alt");
        const width = document("button[aria-label='Zoom in on this image']")
            .children("img")
            .attr("width");
        const height = document("button[aria-label='Zoom in on this image']")
            .children("img")
            .attr("height");
        const image = document("button[aria-label='Zoom in on this image']")
            .children("img")
            .attr("src");
        const images =
            document("button[aria-label='Zoom in on this image']")
                .children("img")
                .attr("srcset")
                ?.split(",")
                .map((item) => {
                    const [src, width] = item.trim().split(" ");

                    return {
                        src: src.trim(),
                        width: width,
                    };
                }) || [];

        return {
            original: body.url,
            description: imageObject.description || description,
            caption: imageObject.caption,
            width: Number(width),
            height: Number(height),
            src: image,
            conversions: images,
            author: {
                name: imageObject.author.name,
            },
        };
    } catch (error) {
        setResponseStatus(event, 500, "Internal Server Error");
        setResponseHeader(event, "Content-Type", "application/json");
        return {
            statusCode: 500,
            body: {
                message: "Error fetching data",
            },
        };
    }
});
