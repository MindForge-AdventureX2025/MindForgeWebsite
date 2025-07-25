<template>
  <div class="w-full h-14 flex items-center justify-between px-5">
    <div class="flex items-center">
      <MobileSidebarController />
      <h3 class="font-bold text-xl">
        {{ route.meta.title || "User's Dashboard" }}
      </h3>
    </div>
    <client-only>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </client-only>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
