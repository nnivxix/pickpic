<script setup lang="ts">
import type { Photo } from "~/types/photo";

const { photo } = defineProps<{
    photo: Photo;
}>();

/**
 * @link https://w3bits.com/css-grid-masonry/
 */
const span = computed(() => Math.ceil(photo.height / photo.width));
</script>
<template>
    <NuxtLink
        :data-span="span"
        :to="`/photos/${photo.id}`"
        class="py-2 group relative"
        :style="{ 'grid-row-end': `span ${span}` }"
    >
        <!-- <div
            class="absolute top-2 z-50 left-2 w-8 h-8 bg-gray-600 text-white flex items-center justify-center rounded-full"
        >
            {{ index }}
        </div> -->
        <!-- <div
            class="absolute inset-0 bg-red-300 bg-opacity-0 rounded-lg group-hover:bg-opacity-50 group-hover:-translate-y-2 z-10 transition-all duration-300 ease-in-out pointer-events-none"
        ></div> -->
        <img
            :src="photo.urls.small"
            :alt="photo.alt_description"
            :height="photo.height"
            :width="photo.width"
            class="object-cover py-1 w-full h-full rounded-lg hover:scale-95 transition-transform duration-300 ease-in-out"
        />
    </NuxtLink>
</template>
