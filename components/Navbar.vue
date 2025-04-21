<script setup lang="ts">
const navigation = [
  {
    name: "About",
    link: "/about",
  },
];
</script>

<template>
  <header class="border-b border-border">
    <nav class="py-2 px-3 flex justify-between max-w-6xl mx-auto items-center">
      <NuxtLink class="text-2xl font-semibold" to="/">PickPic</NuxtLink>
      <ul>
        <li
          v-for="item in navigation"
          :key="item.link"
          class="inline-block mx-2"
        >
          <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
