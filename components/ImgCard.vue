<script setup lang="ts">
import type { Photo } from "~/types/photo";

const { photo } = defineProps<{
    photo: Photo;
}>();
</script>
<template>
    <NuxtLink :to="`/photos/${photo.id}`" class="py-2 group relative">
        <div
            class="absolute inset-0 bg-red-300 bg-opacity-0 rounded-lg group-hover:bg-opacity-50 group-hover:-translate-y-2 z-10 transition-all duration-300 ease-in-out pointer-events-none"
        ></div>
        <img
            :src="photo.urls.regular"
            :alt="photo.alt_description"
            :height="photo.height"
            :width="photo.width"
            class="object-cover py-1 w-full rounded-lg hover:scale-95 transition-transform duration-300 ease-in-out"
        />
    </NuxtLink>
</template>
