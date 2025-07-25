<template>
  <div :class="props.class" :style="{ height }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const height = computed(() => document.body.offsetHeight - 56 - 168 + "px");

const props = defineProps<{
  class: string;
}>();
</script>

<style></style>
