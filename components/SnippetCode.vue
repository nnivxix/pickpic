<script setup lang="ts">
const { label, code, downloadUrl } = defineProps<{
    label: string;
    code: string;
    downloadUrl?: string;
}>();

const { copy, copied, isSupported } = useClipboard({ source: code });

const copyText = async () => {
    if (!isSupported.value) {
        toast({
            title: "Copy to clipboard is not supported in this browser",
        });
        return;
    }

    if (!downloadUrl) {
        toast({
            title: "No download URL provided",
        });
        return;
    }

    try {
        await $unsplash(downloadUrl);
        await copy(code);
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
        <div class="flex justify-between items-center">
            <CardHeader>{{ label }}</CardHeader>
            <div class="p-6">
                <ClientOnly>
                    <Button
                        v-if="isSupported"
                        variant="outline"
                        @click="copyText"
                        >{{ copied ? "Copied" : "Copy" }}</Button
                    >
                </ClientOnly>
            </div>
        </div>
        <CardContent @click="copyText" class="cursor-pointer">
            <ClientOnly>
                <pre
                    :title="code"
                    :class="[isSupported ? 'line-clamp-3' : 'line-clamp-none']"
                    class="whitespace-pre-wrap bg-foreground text-background/70 break-words text-sm rounded-md"
                    >{{ code }}</pre
                >
            </ClientOnly>
        </CardContent>
    </Card>
</template>
