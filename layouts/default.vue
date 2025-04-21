<template>
    <div class="mx-auto px-4">
        <Navbar />
        <div class="flex flex-col min-h-[95vh]">
            <div class="flex-1">
                <slot />
            </div>
            <Footer />
        </div>
    </div>
</template>
