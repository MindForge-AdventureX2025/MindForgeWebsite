<template>
  <Button size="icon" variant="ghost" class="inline sm:hidden">
    <Icon v-if="!openMobile" name="ri:menu-fold-2-line" class="text-xl" @click="changeOpenMobile" />
  </Button>
</template>

<script lang="ts" setup>
import { useSidebar } from "./ui/sidebar";
const { openMobile, setOpenMobile } = useSidebar();

function changeOpenMobile() {
  setOpenMobile(!openMobile.value);
}
</script>

<style></style>
