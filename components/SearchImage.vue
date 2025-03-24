<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { buttonVariants } from "./ui/button";

const keywords = ref<string[]>([
    "nature",
    "mountain",
    "ocean",
    "city",
    "people",
    "food",
    "animal",
    "flower",
    "car",
    "building",
]);

const searchQuery = useRouteQuery<string>("q");

const emit = defineEmits<{
    refresh: [];
}>();

const searchPhoto = async () => {
    await navigateTo({
        name: "search",
        query: { q: searchQuery.value },
        force: true,
    });

    emit("refresh");
};
</script>

<template>
    <div class="mx-auto px-4 relative py-8">
        <div class="flex flex-col items-center justify-center">
            <div
                class="flex flex-col max-w-2xl items-center gap-4 justify-center w-full min-h-96"
            >
                <div class="text-center">
                    <h1 class="text-4xl font-bold">PickPic</h1>
                    <p class="text-lg">
                        The best place to find free photos for your blog
                    </p>
                </div>
                <form @submit.prevent="searchPhoto" class="w-full">
                    <Input
                        v-model:modelValue="searchQuery"
                        id="search"
                        type="search"
                        placeholder="Search photos..."
                    />
                </form>
                <div class="space-y-2">
                    <h2 class="text-lg font-semibold">Popular keywords</h2>
                    <div class="flex flex-wrap gap-2">
                        <NuxtLink
                            v-for="keyword in keywords"
                            :key="keyword"
                            :to="{ name: 'search', query: { q: keyword } }"
                            :class="buttonVariants({ variant: 'outline' })"
                            size="sm"
                        >
                            {{ keyword }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
