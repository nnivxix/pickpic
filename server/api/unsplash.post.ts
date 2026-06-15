import type { Image, ConversionWidth } from "~/types/image";

interface UnsplashPhoto {
  id: string;
  description: string | null;
  alt_description: string | null;
  width: number;
  height: number;
  color: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ url: string }>(event);

  if (!body.url) {
    setResponseStatus(event, 400, "Bad Request");
    return {
      statusCode: 400,
      body: { message: "URL is required" },
      data: null,
    };
  }

  if (!body.url.startsWith("https://unsplash.com/")) {
    setResponseStatus(event, 400, "Bad Request");
    return {
      statusCode: 400,
      body: { message: "URL must be from Unsplash" },
      data: null,
    };
  }

  // Handles: /photos/{id} and /photos/{slug}--{id}
  const photoId = body.url.split("/photos/").at(1)
  if (!photoId) {
    setResponseStatus(event, 400, "Bad Request");
    return {
      statusCode: 400,
      body: { message: "Could not extract photo ID from URL" },
      data: null,
    };
  }

  const config = useRuntimeConfig(event);
  const accessKey = config.unsplashAccessKey;

  if (!accessKey) {
    console.error("UNSPLASH_ACCESS_KEY is not set");
    setResponseStatus(event, 500, "Internal Server Error");
    return {
      statusCode: 500,
      body: { message: "Server misconfiguration" },
      data: null,
    };
  }

  try {
    const photo = await $fetch<UnsplashPhoto>(
      `https://api.unsplash.com/photos/${photoId}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
          "Accept-Version": "v1",
        },
      },
    );

    const conversions = Object.entries(photo.urls).map(([key, src]) => ({
      src,
      width: key as ConversionWidth,
    }));

    const data: Image = {
      original: body.url,
      description: photo.description || photo.alt_description || "",
      caption: photo.alt_description || "",
      width: photo.width,
      height: photo.height,
      color: photo.color,
      src: photo.urls.regular,
      conversions,
      author: {
        name: photo.user.name,
        link: photo.user.links.html,
      },
      message: "Success",
    };

    return { statusCode: 200, body: { message: "Success" }, data };
  } catch (error: unknown) {
    console.error("unsplash.post error:", error);

    const status =
      error && typeof error === "object" && "statusCode" in error
        ? (error as { statusCode: number }).statusCode
        : 500;

    if (status === 404) {
      setResponseStatus(event, 404, "Not Found");
      return {
        statusCode: 404,
        body: { message: "Photo not found" },
        data: null,
      };
    }
    if (status === 403 || status === 401) {
      setResponseStatus(event, 403, "Forbidden");
      return {
        statusCode: 403,
        body: { message: "Unsplash API access denied" },
        data: null,
      };
    }

    setResponseStatus(event, 500, "Internal Server Error");
    return {
      statusCode: 500,
      body: { message: "Failed to fetch photo from Unsplash" },
      data: null,
    };
  }
});
