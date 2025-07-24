<template>
  <ClientOnly>aa </ClientOnly>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["user"],
  layout: false,
});
</script>

<style></style>
