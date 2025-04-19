<script setup lang="ts">
import type { Image, ImageResponse } from "~/types/image";
import { FetchError } from "ofetch";

const { query } = useRoute();

const form = ref({
    url: query.url as string,
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

const { data: responseImage, error: errorImage } =
    await useAsyncData<ImageResponse>(
        "image",
        () =>
            $fetch("/api/pick", {
                method: "POST",
                body: { ...form.value },
            }),
        {
            immediate: query.url ? true : false,
        }
    );

if (responseImage.value?.data) {
    status.value = "success";
    image.value = responseImage.value.data;
}
if (errorImage.value?.data) {
    status.value = "error";
    error.value = (errorImage.value.data as { body?: { message: string } }).body
        ?.message as string;
}

const markdown = computed(() => {
    return `![${image.value?.description || image.value?.caption} by ${
        image.value?.author.name
    }](${image.value?.conversions.at(0)?.src})`;
});
const html = computed(() => {
    return `<img src="${image.value?.conversions.at(0)?.src}" alt="${
        image.value?.description || image.value?.caption
    } by ${image.value?.author.name}" />`;
});
</script>

<template>
    <main>
        <div class="max-w-3xl mx-auto px-4 pt-8 pb-4">
            <form class="grid grid-cols-6 gap-4" @submit.prevent="pick">
                <Input v-model="form.url" class="md:col-span-5 col-span-full" />
                <Button
                    :isLoading="status === 'loading'"
                    :disabled="status === 'loading'"
                    class="md:col-span-1 col-span-full"
                    >Pick</Button
                >
                <ClientOnly>
                    <div v-if="status === 'error'" class="col-span-full">
                        <p class="text-destructive">{{ error }}</p>
                    </div>
                </ClientOnly>
            </form>
        </div>
        <ClientOnly>
            <div class="max-w-7xl mx-auto px-4">
                <div v-if="status === 'loading'">
                    <p>Loading...</p>
                </div>

                <div v-if="status === 'success'" class="container mx-auto py-8">
                    <div class="grid grid-cols-2 gap-4 h-full">
                        <div class="col-span-full md:col-span-1">
                            <div
                                class="col-span-1 overflow-clip aspect-square rounded-lg"
                                :style="{
                                    backgroundColor: image?.color,
                                }"
                            >
                                <img
                                    v-if="image"
                                    :src="image.conversions.at(0)?.src"
                                    :alt="image.description"
                                    class="w-full h-full object-contain rounded-lg shadow-lg"
                                />
                            </div>
                            <p
                                class="italic text-sm text-muted-foreground text-center py-2"
                            >
                                <span class="">Photo by: </span>
                                <NuxtLink
                                    :to="image?.author.link"
                                    class="underline"
                                    target="_blank"
                                >
                                    {{ image?.author.name }}
                                </NuxtLink>
                                <span class=""> on </span>
                                <NuxtLink
                                    :to="image?.original"
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
                                            image?.description ??
                                            image?.caption ??
                                            "No description"
                                        }}
                                    </h1>
                                </CardHeader>
                                <CardContent class="space-y-2">
                                    <p class="text-sm">
                                        Original URI:
                                        <NuxtLink
                                            class="underline"
                                            :to="image?.original"
                                            :external="true"
                                            target="_blank"
                                        >
                                            {{ image?.original }}
                                        </NuxtLink>
                                    </p>
                                </CardContent>
                            </Card>
                            <div class="space-y-4">
                                <SnippetCode
                                    label="Markdown"
                                    :code="markdown"
                                />
                                <SnippetCode label="HTML" :code="html" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientOnly>
    </main>
</template>
