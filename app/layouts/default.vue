<template>
  <div>
    <div class="w-full h-14 border-b-2 flex items-center justify-between px-5">
      <h3 class="text-3xl font-bold font-mono">MindForge</h3>
      <div class="flex items-center gap-2">
        <!-- Button group -->
        <UiButton variant="outline">Sign In</UiButton>
        <SettingsButton />
      </div>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
