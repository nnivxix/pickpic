<script setup lang="ts">
import API_PATH from "~/constants/API_PATH";
import type { Photo } from "~/types/photo";

const { arrivedState } = useScroll(document);
const page = ref(1);

const { data: photos } = await useAsyncData<Photo[]>("photos", () =>
    $unsplash(API_PATH.PHOTOS, {
        params: {
            per_page: 30,
            page: page.value,
        },
    })
);

const counterCurrentFetchResults = ref(photos.value?.length ?? 0);

watch(arrivedState, async (arrived) => {
    if (arrived.bottom && counterCurrentFetchResults.value > 0) {
        {
            const data = await $unsplash<Photo[]>(API_PATH.PHOTOS, {
                params: {
                    per_page: 30,
                    page: page.value + 1,
                },
            });

            counterCurrentFetchResults.value = data.length;

            photos.value = [...(photos.value as Photo[]), ...data];
            page.value += 1;
        }
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
