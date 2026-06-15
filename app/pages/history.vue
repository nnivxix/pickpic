<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { buttonVariants } from "~/components/ui/button";

const history = useStorage<{ id: string; url: string; image: string }[]>(
  "history",
  [],
);

const deleteImage = (id: string) => {
  try {
    history.value = history.value.filter((item) => item.id !== id);

    toast({
      title: "Image removed from history",
    });
  } catch (error) {
    toast({
      title: "Failed to remove image",
      description: "Please try again.",
      variant: "destructive",
    });
    console.error("Error removing image from localStorage:", error);
  }
};
</script>
<template>
<div class="max-w-2xl mx-auto py-10 px-4">
  <h1 class="text-3xl font-bold mb-6 text-center text-primary">History</h1>
  <div v-if="history.length === 0" class="text-muted-foreground text-center py-10">
    No history yet.
  </div>
  <div v-else>
    <Table class="bg-card rounded-lg shadow border border-border">
      <TableHeader>
        <TableRow>
          <TableHead> Image </TableHead>
          <TableHead> URL </TableHead>
          <TableHead class="text-right"> Actions </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in history" :key="item.id">
          <TableCell>
            <img :src="item.image" alt="Image" class="w-20 h-20 object-cover rounded-md border border-border" />
          </TableCell>
          <TableCell>
            <NuxtLink :to="item.url" target="_blank"
              class="text-sm text-muted-foreground underline truncate text-wrap block max-w-xs">
              {{ item.url }}
            </NuxtLink>
          </TableCell>
          <TableCell class="text-right space-x-1">
            <Button variant="destructive" size="sm" @click="deleteImage(item.id)">
              Delete
            </Button>
            <NuxtLink :to="`/?url=${item.url}`" :class="buttonVariants({ variant: 'default', size: 'sm' })">
              View
            </NuxtLink>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</div>
</template>
