<template>
  <ClientOnly>
    <Sidebar collapsible="icon">
      <SidebarHeader
        :class="
          'flex flex-row items-center ' + (open ? 'p-4 justify-between' : 'py-4 justify-center')
        "
      >
        <span v-if="open">Head</span>
        <Button variant="outline" size="icon" class="!w-8 !h-8 sm:block hidden">
          <Icon v-if="open" name="ri:menu-fold-line" class="text-xl" @click="changeOpen" />
          <Icon v-else name="ri:menu-fold-2-line" class="text-xl" @click="changeOpen" />
        </Button>
        <Button variant="outline" size="icon" class="!w-8 !h-8 block sm:hidden">
          <Icon
            v-if="openMobile"
            name="ri:menu-fold-line"
            class="text-xl"
            @click="changeOpenMobile"
          />
        </Button>
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
                    <span v-if="open">R**n Z*u</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />
                    <span v-if="open">R**n Z*u</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />
                    <span v-if="open">R**n Z*u</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />
                    <span v-if="open">R**n Z*u</span>
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
          <span v-if="open">New Diary</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useSidebar } from "./ui/sidebar";
import SidebarHeader from "./ui/sidebar/SidebarHeader.vue";

const { open, setOpen, openMobile, setOpenMobile } = useSidebar();

async function post() {
  try {
    const data = await $fetch("/api/chats", {
      method: "post",
    });
    console.log("Data fetched:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function changeOpen() {
  setOpen(!open.value);
}

function changeOpenMobile() {
  setOpenMobile(!openMobile.value);
}
</script>

<style></style>
