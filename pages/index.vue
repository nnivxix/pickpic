<script setup lang="ts">
import type { ImageResponse } from "~/types/image";

const { query } = useRoute();

const url = ref(query.url as string);
const session = useSessionStorage("url", () => {
  return url.value;
});

const {
  data: image,
  error,
  status,
  execute,
} = await useAsyncData<ImageResponse>(
  "image",
  () => {
    if (query.url) {
      session.value = query.url as string;
    }
    return $fetch("/api/pick", {
      method: "POST",
      body: { url: url.value },
    });
  },
  {
    immediate: query.url ? true : false,
    deep: true,
  }
);

const textAreaUpdate = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  const maxRows = 5;
  const lineHeight = 20; // Approximate line height in pixels
  const scrollHeight = target.scrollHeight;
  const clientHeight = target.clientHeight;
  const padding = 10; // Approximate padding in pixels
  const hasOverflow = scrollHeight > clientHeight + padding;

  if (hasOverflow) {
    const rows = Math.min(Math.floor(scrollHeight / lineHeight), maxRows);
    target.rows = rows;
  }
};

const setDefaultRows = (event: Event) => {
  if (event.target) (event.target as HTMLTextAreaElement).rows = 1;
};

const submit = async () => {
  if (!url.value) {
    return;
  }
  if (session.value === url.value) {
    return;
  }

  session.value = url.value;

  await execute();
};

onMounted(() => {
  session.value = null;
});
</script>

<template>
  <main>
    <div class="max-w-3xl mx-auto px-4 pt-8 pb-4">
      <form class="grid grid-cols-6 gap-4" @submit.prevent="submit">
        <Textarea
          id="url"
          rows="1"
          name="url"
          autofocus
          v-model="url"
          @blur="setDefaultRows($event)"
          @input="textAreaUpdate($event)"
          @focus="textAreaUpdate($event)"
          @keydown.enter.prevent="submit"
          class="md:col-span-5 col-span-full min-h-auto"
          placeholder="https://unsplash.com/photos/abc123"
        />
        <Button
          :isLoading="status === 'pending'"
          :disabled="status === 'pending'"
          class="md:col-span-1 col-span-full"
          >Pick</Button
        >
        <ClientOnly>
          <div v-if="status === 'error'" class="col-span-full">
            <p class="text-destructive">
              {{ (error?.data as any)?.body?.message }}
            </p>
          </div>
        </ClientOnly>
      </form>
    </div>
    <ClientOnly>
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center" v-if="status === 'pending'">
          <p>Loading...</p>
        </div>

        <div v-if="status === 'success'" class="container mx-auto py-8">
          <div class="grid grid-cols-2 gap-4 h-full">
            <div class="col-span-full md:col-span-1">
              <div
                class="col-span-1 overflow-clip aspect-square rounded-lg"
                :style="{
                  backgroundColor: image?.data?.color,
                }"
              >
                <img
                  v-if="image?.data?.conversions.at(0)?.src"
                  :src="image?.data?.conversions.at(0)?.src"
                  :alt="image?.data?.description"
                  class="w-full h-full object-contain rounded-lg shadow-lg"
                />
              </div>
              <p class="italic text-sm text-muted-foreground text-center py-2">
                <span class="">Photo by: </span>
                <NuxtLink
                  :to="image?.data?.author.link"
                  class="underline"
                  target="_blank"
                >
                  {{ image?.data?.author.name }}
                </NuxtLink>
                <span class=""> on </span>
                <NuxtLink
                  :to="image?.data?.original"
                  class="underline"
                  target="_blank"
                >
                  Unsplash
                </NuxtLink>
              </p>
            </div>
            <div
              class="flex flex-col gap-4 justify-between md:col-span-1 col-span-full"
            >
              <Card>
                <CardHeader>
                  <h1 class="text-lg font-semibold">
                    {{
                      image?.data?.description ??
                      image?.data?.caption ??
                      "No description"
                    }}
                  </h1>
                </CardHeader>
                <CardContent class="space-y-2">
                  <p class="text-sm">
                    Original URI:
                    <NuxtLink
                      class="underline"
                      :to="image?.data?.original"
                      :external="true"
                      target="_blank"
                    >
                      {{ image?.data?.original }}
                    </NuxtLink>
                  </p>
                </CardContent>
              </Card>
              <div class="space-y-4" v-if="image?.data">
                <SnippetCode
                  label="Markdown"
                  :code="createMarkdownTemplate(image?.data)"
                />
                <SnippetCode
                  label="HTML"
                  :code="createHtmlTemplate(image?.data)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </main>
</template>
