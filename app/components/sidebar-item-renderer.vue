<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ props.title }}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="(item, index) of props.data" asChild :key="index">
          <NuxtLink :to="item.href"> a </NuxtLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>

<script lang="ts" setup>
import type { RenderingItem } from "~/types/sidebarRendering";

const props = defineProps<{
  title: string;
  data: RenderingItem[];
}>();
</script>

<style></style>
