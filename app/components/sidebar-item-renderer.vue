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
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Edit</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Icon name="wpf:rename" class="text-lg" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="material-symbols:delete-outline-sharp" class="text-lg" />
                    <span>Delete</span>
                  </DropdownMenuItem>
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
