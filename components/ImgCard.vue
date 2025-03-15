<script setup lang="ts">
const { photo } = defineProps<{
  photo: any;
}>();
</script>
<template>
  <NuxtLink :to="`/photos/${photo.id}`">
    <img
      :src="photo.urls.regular"
      :alt="photo.alt_description"
      :height="photo.height"
      :width="photo.width"
      class="object-cover py-1 w-full rounded-lg"
    />
  </NuxtLink>
</template>
