<script setup lang="ts">
const { data: tos } = await useAsyncData("terms-of-service", () =>
  queryCollection("content").path("/tos").first()
);
</script>

<template>
  <div class="max-w-6xl mx-auto py-4">
    <ContentRenderer
      v-if="tos"
      :value="tos"
      class="prose prose-h1:text-2xl prose-h1:font-semibold"
    />
  </div>
</template>
