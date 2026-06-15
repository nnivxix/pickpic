<script setup lang="ts">
import { useStorage } from "@vueuse/core";

const history = useStorage<{ id: string; url: string; image: string }[]>(
  "history",
  [],
);
</script>
<template>
  <div class="max-w-2xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-primary">History</h1>
    <div
      v-if="history.length === 0"
      class="text-muted-foreground text-center py-10"
    >
      No history yet.
    </div>
    <div v-else>
      <Table class="bg-card rounded-lg shadow border border-border">
        <TableHeader>
          <TableRow>
            <TableHead> Image </TableHead>
            <TableHead> URL </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in history" :key="item.id">
            <TableCell>
              <img
                :src="item.image"
                alt="Image"
                class="w-20 h-20 object-cover rounded-md border border-border"
              />
            </TableCell>
            <TableCell>
              <NuxtLink
                :to="item.url"
                target="_blank"
                class="text-sm text-muted-foreground truncate text-wrap block max-w-xs"
              >
                {{ item.url }}
              </NuxtLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style scoped></style>
