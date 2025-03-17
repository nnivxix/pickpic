<script setup lang="ts">
import API_PATH from "~/constants/API_PATH";
import type { Photo } from "~/types/photo";

const { data: photo } = await useAsyncData<Photo>("photo-random", () =>
    $unsplash(API_PATH.RANDOM_PHOTO)
);
</script>

<template>
    <div class="rounded-md flex items-center relative justify-center">
        <img
            :src="photo?.urls.regular"
            :alt="photo?.alt_description"
            class="object-cover w-full lg:aspect-video aspect-square"
        />
        <div class="absolute inset-0 bg-foreground opacity-50"></div>
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-white">PickPic</h1>
                <p class="text-lg text-white">
                    The best place to pick photos for your blog.
                </p>
            </div>
        </div>
    </div>
</template>
