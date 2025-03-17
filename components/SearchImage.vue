<script setup lang="ts">
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

const search = ref<string>("");

const searchPhoto = async () => {
    if (!search.value) return;
    await navigateTo({ path: "/search", query: { q: search.value } });
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
                        v-model:modelValue="search"
                        id="search"
                        type="search"
                        placeholder="Search photos..."
                    />
                </form>
                <div class="space-y-2">
                    <h2 class="text-lg font-semibold">Popular keywords</h2>
                    <div class="flex flex-wrap gap-2">
                        <Button
                            v-for="keyword in keywords"
                            :key="keyword"
                            variant="outline"
                            size="sm"
                            @click="
                                async () =>
                                    await navigateTo({
                                        path: '/search',
                                        query: { q: keyword },
                                    })
                            "
                        >
                            {{ keyword }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
