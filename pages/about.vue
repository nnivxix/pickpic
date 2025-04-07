<script setup lang="ts">
useSeoMeta({
    title: "PickPic - About",
});

const images = [
    {
        src: "/pickpic.png",
        width: 480,
        height: 480,
    },
    {
        src: "/pickpic-banner.jpg",
        width: 800,
        height: 400,
    },
];
</script>

<template>
    <section class="max-w-6xl mx-auto px-4 space-y-4 my-6">
        <!-- <ClientOnly>
            <img
                alt="Pickpic banner"
                class="w-full h-auto rounded-lg"
                :src="images.at(0)?.src"
                :srcset="
                    images
                        .map((image) => `${image.src} ${image.width}w`)
                        .join(', ')
                "
                sizes="(max-width:
            600px) 480px, 800px"
            />
        </ClientOnly> -->
        <div>
            <h1 class="text-2xl lg:text-4xl font-bold">
                One Click to Explore, One Click to Embed
            </h1>
            <p class="text-muted-foreground text-lg">
                Pickpik simplifies the way you explore and use Unsplash images,
                providing instant markdown syntax to enhance your content.
            </p>
        </div>

        <!-- <ul class="list-disc list-inside space-y-2">
            <li>
                <strong>Explore:</strong> Discover stunning images from
                Unsplash.
            </li>
            <li>
                <strong>Search:</strong> Find the perfect image for your
                project.
            </li>
            <li>
                <strong>Markdown:</strong> Copy and paste markdown syntax for
                easy integration.
            </li>
        </ul> -->
    </section>
</template>

<style scoped></style>
