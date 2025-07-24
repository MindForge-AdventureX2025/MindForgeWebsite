<template>
  <div class="w-full h-14 flex items-center justify-between px-5">
    <div class="flex items-center">
      <MobileSidebarController />
      <h3 class="font-bold text-xl">Today's Diary</h3>
    </div>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
