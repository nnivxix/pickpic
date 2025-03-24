<script setup lang="ts">
import type { Photo } from "~/types/photo";

const { arrivedState } = useScroll(document);
const page = ref(1);

const { data: photos } = await useAsyncData<Photo[]>("photos", () =>
    $unsplash("/photos", {
        params: {
            per_page: 30,
            page: page.value,
        },
    })
);

watch(arrivedState, async (arrived) => {
    if (arrived.bottom) {
        const data = await $unsplash<Photo[]>("/photos", {
            params: {
                per_page: 30,
                page: page.value + 1,
            },
        });

        photos.value = [...(photos.value as Photo[]), ...data];
        page.value += 1;
    }
});
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
