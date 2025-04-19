<script setup lang="ts">
import type { Image } from "~/types/image";
import { responseImage } from "~/data/image";

const form = ref({
    url: "",
});
const status = ref<"idle" | "loading" | "success" | "error">("idle");
const error = ref<string | null>(null);
const image = ref<Image>();

const pick = async () => {
    try {
        status.value = "loading";
        const data = await $fetch<{
            statusCode: number;
            body: {
                message: string;
            };
            data: Image;
        }>("/api/pick", {
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
        if (e instanceof Error) {
            error.value = e.message;
        } else if (typeof e === "string") {
            error.value = e;
        } else {
            error.value = "Unknown error";
        }
    }
};

const markdown = computed(() => {
    return `![${image.value?.description || image.value?.caption}](${
        image.value?.conversions.at(0)?.src
    })`;
});
const html = computed(() => {
    return `<img src="${image.value?.conversions.at(0)?.src}" alt="${
        image.value?.description || image.value?.caption
    }" />`;
});
</script>

<template>
    <main>
        <div class="max-w-3xl mx-auto px-4 py-8">
            <form class="grid grid-cols-6 gap-4" @submit.prevent="pick">
                <Input
                    v-model="form.url"
                    aria-rowcount="3"
                    class="col-span-5"
                />
                <Button class="col-span-1">Pick</Button>
            </form>
        </div>
        <div class="max-w-7xl mx-auto px-4 py-8">
            <div v-if="status === 'loading'">
                <p>Loading...</p>
            </div>
            <div v-if="status === 'error'">
                <p class="text-destructive">Error: {{ error }}</p>
            </div>
            <div v-if="status === 'success'" class="container mx-auto py-8">
                <div class="grid grid-cols-2 gap-4 h-full">
                    <div class="col-span-1">
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
                        <ClientOnly>
                            <div class="space-y-4">
                                <SnippetCode
                                    label="Markdown"
                                    :code="markdown"
                                />
                                <SnippetCode label="HTML" :code="html" />
                            </div>
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>
