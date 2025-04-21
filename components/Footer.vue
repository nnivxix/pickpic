<script setup lang="ts">
const { title } = useAppConfig();
const links = [
    {
        name: "Term of Service",
        href: "/#",
    },
    {
        name: "Privacy Policy",
        href: "/#",
    },
];
</script>

<template>
    <footer class="py-6 space-y-4 border-t border-border">
        <ul class="flex justify-center gap-4">
            <li v-for="(link, key) in links" :key class="underline">
                <NuxtLink :to="link.href">
                    {{ link.name }}
                </NuxtLink>
            </li>
        </ul>
        <div class="text-center text-sm text-muted-foreground">
            <p>
                &copy; {{ new Date().getFullYear() }}
                <NuxtLink to="/" class="underline">
                    {{ title }}
                </NuxtLink>
            </p>
        </div>
    </footer>
</template>
