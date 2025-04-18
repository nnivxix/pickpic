<script setup lang="ts">
const form = ref({
    url: "",
});
const pick = async () => {
    await $fetch("/api/pick", {
        method: "POST",
        body: { ...form.value },
    });
};
</script>

<template>
    <main>
        <div class="max-w-3xl mx-auto px-4 py-8">
            <form class="grid grid-cols-6 gap-4" @submit.prevent="pick">
                <Input v-model="form.url" class="col-span-5" />
                <Button class="col-span-1">Pick</Button>
            </form>
        </div>
    </main>
</template>

<style scoped></style>
