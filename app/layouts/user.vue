<template>
  <SidebarProvider>
    <UserSidebar />
    <slot />
    <ClientOnly>
      <MobileSidebarController />
    </ClientOnly>
  </SidebarProvider>
</template>

<script lang="ts" setup></script>

<style></style>
