<script setup lang="ts">
const { label, code } = defineProps<{
  label: string;
  code: string;
}>();
</script>

<template>
  <Card>
    <div class="flex justify-between items-center">
      <CardHeader>{{ label }}</CardHeader>
      <div class="p-6">
        <Button variant="outline">Copy</Button>
      </div>
    </div>
    <CardContent>
      <pre
        class="whitespace-pre-wrap bg-foreground text-background/70 break-words line-clamp-3"
        >{{ code }}</pre
      >
    </CardContent>
  </Card>
</template>
