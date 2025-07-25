<script lang="ts" setup>
const props = defineProps<{
  class: string
}>()

const height = computed(() => `${document.body.offsetHeight - 56 - 168}px`)
</script>

<template>
  <div :class="props.class" :style="{ height }">
    <slot />
  </div>
</template>

<style></style>
