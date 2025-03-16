<script setup lang="ts">
import type { Photo } from "~/types/photo";

const { data: photos } = await useAsyncData<Photo[]>("photos", () =>
    $unsplash("/photos", {
        params: {
            per_page: 20,
        },
    })
);
</script>

<template>
    <div>
        <!-- <HomeHero /> -->
        <SearchImage />
        <MasonryGrid>
            <ImgCard v-for="photo in photos" :key="photo.id" :photo="photo" />
        </MasonryGrid>
    </div>
</template>
