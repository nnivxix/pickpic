<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { type ButtonVariants, buttonVariants } from ".";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  isLoading: false,
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <Icon v-if="isLoading" name="bx:loader-alt" class="animate-spin" />
    <slot />
  </Primitive>
</template>
