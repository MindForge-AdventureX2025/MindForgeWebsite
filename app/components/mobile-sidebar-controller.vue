<script lang="ts" setup>
import { useSidebar } from './ui/sidebar'

const { openMobile, setOpenMobile } = useSidebar()

function changeOpenMobile() {
  setOpenMobile(!openMobile.value)
}
</script>

<template>
  <ClientOnly>
    <Button size="icon" variant="ghost" class="flex md:hidden" @click="changeOpenMobile">
      <Icon v-if="!openMobile" name="ri:menu-fold-2-line" class="text-xl" />
    </Button>
  </ClientOnly>
</template>

<style></style>
