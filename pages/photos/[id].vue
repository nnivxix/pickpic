<script setup lang="ts">
import type { Photo } from "~/types/photo";

const { params } = useRoute("photos-id");

const { data: photo } = await useAsyncData<Photo>("photo", () =>
  $unsplash(`/photos/${params.id}`)
);

const markdown = computed(
  () =>
    `![${photo?.value?.description || photo?.value?.alt_description}](${
      photo?.value?.urls.regular
    })`
);

const html = computed(
  () =>
    `<img src="${photo?.value?.urls.regular}" alt="${
      photo?.value?.description || photo?.value?.alt_description
    }" />`
);
</script>
<template>
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
      </div>
      <div
        class="flex flex-col gap-4 justify-between md:col-span-1 col-span-full"
      >
        <div>
          <h1 class="text-lg font-semibold">
            {{ photo?.description || photo?.alt_description }}
          </h1>
          <p class="text-sm">
            Original URI:
            <NuxtLink
              class="underline"
              :to="photo?.links.html"
              :external="true"
              target="_blank"
            >
              {{ photo?.links.html }}
            </NuxtLink>
          </p>
        </div>
        <div class="space-y-4">
          <SnippetCode label="Markdown" :code="markdown" />
          <SnippetCode label="HTML" :code="html" />
        </div>
      </div>
    </div>
  </div>
</template>
