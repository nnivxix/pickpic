<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";
import { featuredPhotos as photos } from "~/data/featured-photos";

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
                <h1 class="text-3xl font-bold">Paste, Pick, then Copy</h1>
                <p class="text-muted-foreground text-lg">
                    Pickpik simplifies the way you use Unsplash images,
                    providing instant markdown syntax to enhance your content.
                </p>
                <div class="flex flex-col lg:flex-row gap-3 lg:gap-5">
                    <NuxtLink
                        to="/"
                        :class="buttonVariants({ variant: 'default' })"
                    >
                        Pick Now
                    </NuxtLink>
                    <NuxtLink
                        to="https://unsplash.com/"
                        target="_blank"
                        :external="true"
                        :class="buttonVariants({ variant: 'outline' })"
                    >
                        Unsplash <Icon name="bx:link-external" />
                    </NuxtLink>
                </div>
            </div>
            <div class="col-span-2 lg:col-span-1 hidden lg:block">
                <div class="grid grid-cols-6 gap-x-4 px-4 object-contain">
                    <img
                        v-for="(photo, index) in photos"
                        :key="index"
                        :src="photo.urls.small"
                        :alt="`${photo.description} by ${photo.user.name}`"
                        :title="`${photo.description} by ${photo.user.name}`"
                        :height="photo.height"
                        :width="photo.width"
                        class="object-cover py-1 w-full h-full rounded-lg col-span-3 md:col-span-2"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
