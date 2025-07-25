<template>
  <div class="flex flex-col overflow-auto box-border" :style="{ height }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const height = computed(() => document.body.offsetHeight - 56 - 168 + "px");
</script>

<style></style>
