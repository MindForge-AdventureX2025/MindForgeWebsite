<script lang="ts" setup></script>

<template>
  <SidebarProvider>
    <UserSidebar />
    <div class="w-full flex flex-col">
      <UserAppBar />
      <slot />
    </div>
  </SidebarProvider>
</template>

<style></style>
