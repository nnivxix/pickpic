<script setup lang="ts">
const { data: privacy } = await useAsyncData("privacy", () =>
  queryCollection("content").path("/privacy").first()
);
</script>

<template>
  <div>
    <div class="max-w-6xl mx-auto py-4">
      <ContentRenderer
        v-if="privacy"
        :value="privacy"
        class="prose prose-h1:text-2xl prose-h1:font-semibold"
      />
    </div>
  </div>
</template>

<style scoped></style>
