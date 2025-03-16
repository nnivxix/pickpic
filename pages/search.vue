<script setup lang="ts">
import type { Photo } from "~/types/photo";
interface ResponseSearch {
    total: number;
    total_pages: number;
    results: Photo[];
}

const { query } = useRoute();

const { data } = await useAsyncData<ResponseSearch>("search", () =>
    $unsplash("/search-photos", {
        params: {
            query: query.q,
            per_page: 20,
        },
    })
);
</script>

<template>
    <div class="relative">
        <MasonryGrid>
            <ImgCard
                v-for="photo in data?.results"
                :key="photo.id"
                :photo="photo"
            />
            <ImgCard
                v-for="photo in data?.results"
                :key="photo.id"
                :photo="photo"
            />
        </MasonryGrid>
        <FloatingSearch />
    </div>
</template>
