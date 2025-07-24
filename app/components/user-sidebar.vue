<template>
  <ClientOnly>
    <Sidebar collapsible="icon">
      <SidebarHeader
        :class="
          'flex flex-row items-center ' + (open ? 'p-4 justify-between' : 'py-4 justify-center')
        "
      >
        <span v-if="open">Head</span>
        <Button variant="outline" size="icon" class="!w-8 !h-8 sm:flex hidden">
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
        <Tabs default-value="diary" v-if="(!isMobile && open) || isMobile">
          <div class="px-2 w-full">
            <TabsList class="w-full">
              <TabsTrigger value="diary">
                <Icon name="ri:account-box-line" class="text-xl" />
                <span v-if="open">Diaries</span>
              </TabsTrigger>
              <TabsTrigger value="chats">
                <Icon name="ri:account-box-line" class="text-xl" />
                <span v-if="open">Chats</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="diary"> Make changes to your account here. </TabsContent>
          <TabsContent value="chats">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem> </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </TabsContent>
        </Tabs>
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
import { useBreakpoints } from "@vueuse/core";
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

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
});
const isMobile = breakpoints.smaller("sm");

function changeOpen() {
  setOpen(!open.value);
}

function changeOpenMobile() {
  setOpenMobile(!openMobile.value);
}
</script>

<style></style>
