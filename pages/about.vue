<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";
import { featuredPhotos as photos } from "~/data/featured-photos";
import { features } from "~/data/features";

useSeoMeta({
    title: "PickPic - About",
});
</script>

<template>
    <section class="max-w-6xl mx-auto px-4 space-y-4 my-6">
        <div class="grid grid-cols-2 gap-4">
            <div
                class="col-span-2 lg:col-span-1 flex flex-col gap-4 justify-center"
            >
                <h1 class="text-3xl font-bold">
                    One Click to Explore, One Click to Embed
                </h1>
                <p class="text-muted-foreground text-lg">
                    Pickpik simplifies the way you explore and use Unsplash
                    images, providing instant markdown syntax to enhance your
                    content.
                </p>
                <div>
                    <NuxtLink
                        to="/search"
                        :class="buttonVariants({ variant: 'default' })"
                    >
                        Explore
                    </NuxtLink>
                </div>
            </div>
            <div class="col-span-2 lg:col-span-1 hidden lg:block">
                <div class="grid grid-cols-6 gap-x-4 px-4 object-contain">
                    <img
                        v-for="(photo, index) in photos"
                        :key="index"
                        :src="photo.urls.small"
                        :alt="photo.description"
                        :height="photo.height"
                        :width="photo.width"
                        class="object-cover py-1 w-full h-full rounded-lg col-span-3 md:col-span-2"
                    />
                </div>
            </div>
        </div>

        <h2 class="text-2xl font-bold text-center">Features</h2>
        <ul class="grid grid-cols-3 gap-6">
            <li
                v-for="(feature, index) in features"
                :key="index"
                class="flex flex-col gap-2 mb-4 col-span-3 md:col-span-1"
            >
                <img
                    :src="feature.src"
                    :alt="feature.alt"
                    class="aspect-video object-cover rounded-lg"
                />
                <h3 class="text-lg font-semibold">{{ feature.title }}</h3>
                <p class="text-muted-foreground">{{ feature.description }}</p>
            </li>
        </ul>
    </section>
</template>
