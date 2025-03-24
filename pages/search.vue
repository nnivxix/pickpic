<script setup lang="ts">
import API_PATH from "~/constants/API_PATH";
import type { Photo } from "~/types/photo";
interface ResponseSearch {
    total: number;
    total_pages: number;
    results: Photo[];
}

const { query } = useRoute();
const searchQuery = useRouteQuery("q", "");

const { data, refresh } = await useAsyncData<ResponseSearch>(
    "search",
    () =>
        $unsplash(API_PATH.SEARCH_PHOTOS, {
            params: {
                query: searchQuery.value,
                per_page: 20,
            },
        }),
    {
        deep: true,
    }
);
</script>

<template>
    <div class="relative">
        <SearchImage v-if="!query.q" @refresh="refresh" />
        <MasonryGrid v-if="data?.results">
            <ImgCard
                v-for="photo in data?.results"
                :key="photo.id"
                :photo="photo"
            />
        </MasonryGrid>
        <FloatingSearch @refresh="refresh" />
    </div>
</template>
