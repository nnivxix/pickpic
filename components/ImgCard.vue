<script setup lang="ts">
const { photo } = defineProps<{
  photo: any;
}>();
</script>
<template>
  <NuxtLink :to="`/photos/${photo.id}`" class="object-fill py-2">
    <img
      :src="photo.urls.regular"
      :alt="photo.alt_description"
      :height="photo.height"
      :width="photo.width"
      class="object-cover py-1 w-full rounded-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out"
    />
  </NuxtLink>
</template>
