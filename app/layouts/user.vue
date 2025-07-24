<template>
  <SidebarProvider>
    <UserSidebar />
    <div class="w-full flex flex-col">
      <UserAppBar />
      <slot />
    </div>
  </SidebarProvider>
</template>

<script lang="ts" setup></script>

<style></style>
