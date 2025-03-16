<script setup lang="ts">
const { query } = useRoute();
const searchQuery = ref(query.q as string);
</script>

<template>
    <div class="fixed bottom-8 inset-x-0 flex justify-center">
        <form
            @submit.prevent="$router.push(`/search?q=${searchQuery}`)"
            class="flex items-center rounded-full bg-background shadow-lg hover:shadow-xl transition-shadow px-4 py-2"
        >
            <Icon name="ion:search" class="text-xl mr-2" />
            <Input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="border-none w-56 shadow-none focus-visible:ring-0"
            />
        </form>
    </div>
</template>

<style scoped></style>
