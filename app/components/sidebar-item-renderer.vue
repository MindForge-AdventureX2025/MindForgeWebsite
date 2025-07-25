<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ props.title }}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="(item, index) of props.data" :key="index + item.href">
          <SidebarMenuButton class="flex justify-between items-center pl-4">
            <NuxtLink :to="item.href" class="flex-1 whitespace-nowrap overflow-hidden">
              {{ item.name }}
            </NuxtLink>

            <!-- 配置详细按钮 -->
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size="icon" variant="ghost" class="cursor-pointer">
                  <Icon name="proicons:more" class="text-xl" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <!-- <DropdownMenuGroup>
                  <DropdownMenuLabel>你好</DropdownMenuLabel>
                  <DropdownMenuItem>
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup> -->
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Dark Mode</DropdownMenuLabel>
                  <DropdownMenuItem>System</DropdownMenuItem>
                  <DropdownMenuItem>Light</DropdownMenuItem>
                  <DropdownMenuItem>Dark</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuButton>
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
