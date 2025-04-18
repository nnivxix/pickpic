<script setup lang="ts">
import API_PATH from "~/constants/API_PATH";
import type { Photo } from "~/types/photo";

await navigateTo("/pick", {
    replace: true,
    redirectCode: 301,
});

const { arrivedState } = useScroll(document);
const page = ref(1);

const { data: photos } = await useFetch<Photo[]>("/api/photos", {
    params: {
        per_page: 30,
        page: page.value,
    },
});

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

useSeoMeta({
    title: "PickPic",
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
