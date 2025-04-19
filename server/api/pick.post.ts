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
            data: null,
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
            data: null,
        };
    }

    try {
        const response = await $fetch<string>(body.url, {
            responseType: "text",
        });

        const document = cheerio.load(response);

        const scriptTag = document("script[type='application/ld+json']").text();
        const imageObject: Photo = JSON.parse(scriptTag);

        if (!imageObject.isAccessibleForFree) {
            setResponseStatus(event, 403, "Forbidden");
            setResponseHeader(event, "Content-Type", "application/json");
            return {
                statusCode: 403,
                body: {
                    message: "Image is not accessible for free",
                },
                data: null,
            };
        }

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

        const color = document("button[aria-label='Zoom in on this image']")
            .children("img")
            .attr("style")
            ?.match(/background-color:\s*([^;]+)/)
            ?.at(1);

        const authorLink = document("a[href^='/@']").attr("href");

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
            statusCode: 200,
            body: {
                message: "Success",
            },
            data: {
                original: body.url,
                description: imageObject.description || description,
                caption: imageObject.caption,
                width: Number(width),
                height: Number(height),
                src: image,
                color,
                conversions: images,
                author: {
                    name: imageObject.author.name,
                    link: `https://unsplash.com${authorLink}`,
                },
            },
        };
    } catch (error) {
        setResponseStatus(event, 404, "Not Found");
        setResponseHeader(event, "Content-Type", "application/json");
        return {
            statusCode: 404,
            body: {
                message: "Image not found",
            },
            data: null,
        };
    }
});
