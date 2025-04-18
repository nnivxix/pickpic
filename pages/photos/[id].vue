<script setup lang="ts">
import type { Photo } from "~/types/photo";

const { params, fullPath } = useRoute("photos-id");

const TITLE_TRUNCATION_LIMIT = 54;
const DESCRIPTION_TRUNCATION_LIMIT = 155;
const runtimeConfig = useRuntimeConfig();

const { data: photo } = await useFetch<Photo>(`/api/photos/${params.id}`);

if (!photo.value) {
    throw createError({
        statusCode: 404,
        message: "Photo not found",
    });
}

const unsplashLink = computed(
    () => `${photo.value?.links.html}?utm_source=pickpic&utm_medium=referral`
);

const markdown = computed(
    () =>
        `![${photo?.value?.description || photo?.value?.alt_description}](${
            photo?.value?.urls.small
        })`
);

const html = computed(
    () =>
        `<img src="${photo?.value?.urls.small}" alt="${
            photo?.value?.description || photo?.value?.alt_description
        }" />`
);

const title = computed(() => {
    const text = photo.value?.description || photo.value?.alt_description || "";
    return `PickPic - ${
        text.length > TITLE_TRUNCATION_LIMIT
            ? text.substring(0, TITLE_TRUNCATION_LIMIT - 3) + "..."
            : text
    }`;
});
const description = computed(() => {
    const text = photo.value?.description || photo.value?.alt_description || "";
    return text.length > DESCRIPTION_TRUNCATION_LIMIT
        ? text.substring(0, DESCRIPTION_TRUNCATION_LIMIT - 3) + "..."
        : text;
});

useSeoMeta({
    title,
    description,
    ogImage: photo.value?.urls.small,
    ogUrl: runtimeConfig.public.appUrl + fullPath,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: photo.value?.urls.small,
    twitterCard: "summary_large_image",
});
</script>
<template>
    <div class="max-w-6xl mx-auto">
        <div class="container mx-auto py-8">
            <div class="grid grid-cols-2 gap-4 h-full">
                <div class="md:col-span-1 col-span-full">
                    <div
                        class="overflow-clip aspect-square rounded-lg"
                        :style="{ backgroundColor: photo?.color }"
                    >
                        <img
                            class="w-full h-full object-contain"
                            :src="photo?.urls.regular"
                        />
                    </div>
                    <p
                        class="italic text-sm text-muted-foreground text-center py-2"
                    >
                        <span class="">Photo by: </span>
                        <NuxtLink
                            :to="photo?.user.links.html"
                            class="underline"
                            target="_blank"
                        >
                            {{ photo?.user.name }}
                        </NuxtLink>
                        <span class=""> on </span>
                        <NuxtLink
                            :to="unsplashLink"
                            class="underline"
                            target="_blank"
                        >
                            Unsplash
                        </NuxtLink>
                    </p>
                </div>
                <div
                    class="flex flex-col gap-4 justify-between md:col-span-1 col-span-full"
                >
                    <Card>
                        <CardHeader>
                            <h1 class="text-lg font-semibold">
                                {{
                                    photo?.description || photo?.alt_description
                                }}
                            </h1>
                        </CardHeader>
                        <CardContent class="space-y-2">
                            <p class="text-sm">
                                Original URI:
                                <NuxtLink
                                    class="underline"
                                    :to="unsplashLink"
                                    :external="true"
                                    target="_blank"
                                >
                                    {{ photo?.links.html }}
                                </NuxtLink>
                            </p>
                        </CardContent>
                    </Card>
                    <ClientOnly>
                        <div class="space-y-4">
                            <SnippetCode
                                label="Markdown"
                                :code="markdown"
                                :downloadUrl="photo?.links.download_location"
                            />
                            <SnippetCode
                                label="HTML"
                                :code="html"
                                :downloadUrl="photo?.links.download_location"
                            />
                        </div>
                    </ClientOnly>
                </div>
            </div>
        </div>
    </div>
</template>
