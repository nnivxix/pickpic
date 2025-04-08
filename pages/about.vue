<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";
import { featuredPhotos as photos } from "~/data/featured-photos";

useSeoMeta({
    title: "PickPic - About",
});

const imageData = {
    images: [
        {
            title: "Explore",
            description:
                "Discover stunning images from Unsplash's vast library. Dive into high-quality photography, perfect for any project. Our curated selection ensures you'll find the ideal visual to enhance your creative endeavors.",
            src: "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMDY1MjF8MHwxfGFsbHx8fHx8fHx8fDE3NDQwMTc4NTN8&ixlib=rb-4.0.3&q=80&w=400",
            alt: "The Plan before the Adventure",
        },
        {
            title: "Search",
            description:
                "Find the perfect image for your project. Our search functionality allows you to quickly locate the visuals you need. With an extensive database of high-resolution photos, you're sure to discover the ideal match for your creative vision.",

            src: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMDY1MjF8MHwxfGFsbHx8fHx8fHx8fDE3NDQwMTc5Mzd8&ixlib=rb-4.0.3&q=80&w=400",
            alt: "Using Web on iPad",
        },
        {
            title: "Markdown",
            description:
                "Copy and paste markdown syntax for easy integration. Streamline your workflow by effortlessly embedding images with the correct attribution. Focus on your content, not the formatting.",
            src: "https://images.unsplash.com/photo-1611079830811-865ff4428d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMDY1MjF8MHwxfGFsbHx8fHx8fHx8fDE3NDQwMTc5ODl8&ixlib=rb-4.0.3&q=80&w=400",
            alt: "A school, office notebook with a white pen lies on a gray table, desk, background. Place for an inscription. Office. Job. School. Personal diary. Top view.",
        },
    ],
};
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
                v-for="(image, index) in imageData.images"
                :key="index"
                class="flex flex-col gap-2 mb-4 col-span-3 md:col-span-1"
            >
                <img
                    :src="image.src"
                    :alt="image.alt"
                    class="aspect-video object-cover rounded-lg"
                />
                <h3 class="text-lg font-semibold">{{ image.title }}</h3>
                <p class="text-muted-foreground">{{ image.description }}</p>
            </li>
        </ul>
    </section>
</template>
