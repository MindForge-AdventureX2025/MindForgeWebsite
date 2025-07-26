<script lang="ts" setup>
const height = computed(() => `${document.body.offsetHeight - 129}px`)
</script>

<template>
  <div class="flex" :style="{ height }">
    <div class="hidden lg:flex" />
    <div class="lg:hidden flex" />
  </div>
</template>

<style>

</style>
