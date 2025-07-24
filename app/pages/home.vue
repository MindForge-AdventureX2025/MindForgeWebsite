<template>
  <ClientOnly>
    <TipTapEditor />
  </ClientOnly>
</template>

<script lang="ts" setup>
import TipTapEditor from "~/components/tip-tap-editor.vue";

definePageMeta({
  middleware: ["user"],
  layout: false,
});
</script>

<style></style>
