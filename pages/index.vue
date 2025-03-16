<script setup lang="ts">
definePageMeta({
  layout: "home",
});

const { data: photos } = await useAsyncData("photos", () =>
  $unsplash("/photos", {
    params: {
      per_page: 20,
    },
  })
);
</script>

<template>
  <div>
    <!-- <HomeHero /> -->
    <MasonryGrid>
      <ImgCard v-for="photo in photos" :key="photo.id" :photo="photo" />
    </MasonryGrid>
  </div>
</template>
