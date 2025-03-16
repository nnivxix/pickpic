<script setup lang="ts">
const { query } = useRoute();
</script>

<template>
  <div>Page: search => {{ query.q }}</div>
</template>
