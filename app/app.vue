<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <ClientOnly>
    <Toaster />
  </ClientOnly>

  <NuxtLayout> <NuxtPage /> </NuxtLayout>
</template>
