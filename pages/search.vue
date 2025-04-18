<script setup lang="ts">
import type { Photo } from "~/types/photo";

interface ResponseSearch {
    total: number;
    total_pages: number;
    results: Photo[];
}

const { query } = useRoute();
const searchQuery = useRouteQuery("q", "");
const page = ref(1);
const { arrivedState } = useScroll(document);

const { data: photos, refresh } = await useAsyncData<ResponseSearch>(
    "search",
    () =>
        $fetch("/api/photos/search", {
            params: {
                query: searchQuery.value,
                per_page: 20,
                page: page.value,
            },
        }),
    {
        deep: true,
        watch: [searchQuery],
    }
);

const counterCurrentFetchResults = ref(photos.value?.results.length ?? 0);

watch(arrivedState, async (arrived) => {
    if (arrived.bottom && counterCurrentFetchResults.value > 0) {
        const data = await $fetch<ResponseSearch>("/api/photos/search", {
            params: {
                query: searchQuery.value,
                per_page: 20,
                page: page.value + 1,
            },
        });

        if (photos.value) {
            photos.value.results = [
                ...photos.value.results,
                ...data.results,
            ].filter(
                (photo, index, self) =>
                    index === self.findIndex((t) => t.id === photo.id)
            );
        }
        counterCurrentFetchResults.value = data.results.length;
        page.value += 1;
    }
});

useSeoMeta({
    title: `PickPic - Search: ${searchQuery.value}`,
    description: `Search results for ${searchQuery.value}`,
});
</script>

<template>
    <div class="relative">
        <SearchImage v-if="!query.q" @refresh="refresh" />
        <MasonryGrid v-if="photos?.results">
            <ImgCard
                v-for="photo in photos?.results"
                :key="photo.id"
                :photo="photo"
            />
        </MasonryGrid>
        <FloatingSearch @refresh="refresh" />
    </div>
</template>
