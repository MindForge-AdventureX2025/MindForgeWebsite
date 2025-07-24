<template>
  <ClientOnly>
    <Sidebar collapsible="icon">
      <SidebarHeader class="flex justify-between flex-row p-4">
        Head <SidebarTrigger class="cursor-pointer" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarContent> </SidebarContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel> F </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />
                    <span v-if="sidebarOpen">R**n Z*u</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />
                    <span v-if="sidebarOpen">R**n Z*u</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />
                    <span v-if="sidebarOpen">R**n Z*u</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />
                    <span v-if="sidebarOpen">R**n Z*u</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton @click="post" class="flex items-center cursor-pointer">
          <Icon name="material-symbols:add" class="text-xl" />
          <span v-if="sidebarOpen">New Diary</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useSidebar } from "./ui/sidebar";
import SidebarHeader from "./ui/sidebar/SidebarHeader.vue";

const sidebarOpen = useSidebar().open;

watch(sidebarOpen, newValue => {
  console.log("Sidebar open state changed:", newValue);
});

async function post() {
  // 写一个方法 用于 post https://mindforgeserver.onrender.com/api/journals 这个api
  // 发送数据到服务器 使用nuxt数据获取
  try {
    // const data = await $fetch("https://mindforgeserver.onrender.com/api/journals", {
    //   method: "post",
    //   ignoreResponseError: true,
    // });
    const data = await $fetch("/api/journals", { method: "post" });
    console.log("Data fetched:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
</script>

<style></style>
