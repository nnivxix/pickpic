import type { Image, ImageResponse } from "~/types/image";
import { FetchError } from "ofetch";

export const usePickImage = (url: string) => {
    const form = ref({
        url: url,
    });
    const status = ref<"idle" | "loading" | "success" | "error">("idle");
    const error = ref<string | null>(null);
    const image = ref<Image>();

    const pick = async () => {
        try {
            status.value = "loading";
            const data = await $fetch<ImageResponse>("/api/pick", {
                method: "POST",
                body: { ...form.value },
            });
            if (data.data) {
                status.value = "success";
                image.value = data.data;
            }
        } catch (e) {
            console.error("Error picking:", e);
            status.value = "error";

            if (e instanceof FetchError) {
                error.value = e.data.body.message;
            }
        }
    };

    return {
        form,
        status,
        error,
        image,
        pick,
    };
};
