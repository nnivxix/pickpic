<script setup lang="ts">
import type { Image, ConversionWidth } from '~/types/image';

const { label, image } = defineProps<{
  label: "HTML" | "Markdown";
  image: Image
}>();

const conversion = ref<ConversionWidth>('raw');
const selectedConversion = computed(() => {
  if (!conversion.value) return null;
  return image.conversions.find((conv) => conv.width === conversion.value);

});

const code = computed(() => {
  if (!selectedConversion.value) return '';
  return label === "HTML" ? createHtmlTemplate(image, selectedConversion.value) : createMarkdownTemplate(image, selectedConversion.value);
});
const { copy, isSupported } = useClipboard({ source: code });
const copyText = async () => {
  if (!isSupported.value) {
    toast({
      title: "Copy to clipboard is not supported in this browser",
    });
    return;
  }

  try {
    await copy(code.value);
    toast({
      title: "Copied to clipboard",
    });
  } catch (error) {
    console.error("Error copying text:", error);
    toast({
      title: "Failed to copy",
      description: "Please try again.",
    });
  }
};
</script>

<template>
<Card>
  <div class="flex justify-between items-center px-6 py-4">
    <CardHeader class="block p-0">{{ label }} <span class="text-sm text-muted-foreground">(click content to copy)</span>
    </CardHeader>
    <NativeSelect v-model="conversion" class="w-28 ">
      <NativeSelectOption v-for="conversion in image.conversions" :key="conversion.width" :value="conversion.width">
        {{ conversion.width }}
      </NativeSelectOption>
    </NativeSelect>
  </div>

  <CardContent @click="copyText" class="cursor-pointer relative">
    <ClientOnly>
      <pre :title="code" :class="[isSupported ? 'line-clamp-3' : 'line-clamp-none']"
        class="whitespace-pre-wrap bg-foreground text-background/70 wrap-break-words text-sm rounded-md">{{ code }}
      </pre>
    </ClientOnly>
  </CardContent>
</Card>
</template>
