<template>
  <ClientOnly>
    <Sidebar collapsible="icon">
      <SidebarHeader :class="open ? 'p-4 ' : 'py-4'">
        <div
          :class="'flex items-center flex-row' + (open ? ' justify-between' : ' justify-center')"
        >
          <span v-if="open">Head</span>
          <Button variant="outline" size="icon" class="!w-8 !h-8 sm:flex hidden">
            <Icon v-if="open" name="ri:menu-fold-line" class="text-xl" @click="changeOpen" />
            <Icon v-else name="ri:menu-fold-2-line" class="text-xl" @click="changeOpen" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            class="!w-8 !h-8 flex sm:hidden"
            @click="changeOpenMobile"
          >
            <Icon v-if="openMobile" name="ri:menu-fold-line" class="text-xl" />
          </Button>
        </div>
        <Button class="w-full" variant="ghost" v-if="open">
          <Icon name="material-symbols:settings" class="text-xl" />
          <span>Settings</span>
        </Button>
        <Button variant="ghost" size="icon" class="!w-8 !h-8" v-else>
          <Icon name="material-symbols:settings" class="text-xl" />
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <Tabs
          v-model:model-value="tabs"
          default-value="diary"
          v-if="(!isMobile && open) || isMobile"
        >
          <div class="px-2 w-full">
            <TabsList class="w-full">
              <TabsTrigger value="diary">
                <Icon name="system-uicons:notebook" class="text-xl" />
                <span v-if="open">Diaries</span>
              </TabsTrigger>
              <TabsTrigger value="chat">
                <Icon name="humbleicons:chats" class="text-xl" />
                <span v-if="open">Chats</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="diary"> Make changes to your account here. </TabsContent>
          <TabsContent value="chat">
            <SidebarItemRenderer title="Today" :data="chatHistory.today" />
            <SidebarItemRenderer title="Yesterday" :data="chatHistory.yesterday" />
            <SidebarItemRenderer title="This Month" :data="chatHistory.thisMonth" />
            <SidebarItemRenderer title="Others" :data="chatHistory.other" />
          </TabsContent>
        </Tabs>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton @click="post" class="flex items-center cursor-pointer">
          <Icon name="material-symbols:add" class="text-xl" />
          <span v-if="open">New {{ tabs.charAt(0).toUpperCase() + tabs.slice(1) }}</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useBreakpoints } from "@vueuse/core";
import { useSidebar } from "./ui/sidebar";
import SidebarHeader from "./ui/sidebar/SidebarHeader.vue";
import type { ApiChatHistoryItem, ChatHistory } from "../types/chatHistory.d";
import type { RenderingItem } from "~/types/sidebarRendering";

const { open, setOpen, openMobile, setOpenMobile } = useSidebar();
const tabs = ref<"diary" | "chat">("diary");
const chatHistory = reactive<ChatHistory>({
  today: [],
  yesterday: [],
  thisMonth: [],
  other: [],
});

const { data, refresh, status } = useFetch<ApiChatHistoryItem[]>("/api/chats/", {
  method: "get",
});

if (status.value === "success") {
  const transfer = (originalData: ApiChatHistoryItem): RenderingItem => {
    return {
      href: originalData._id,
      name: originalData.title,
    };
  };

  data.value?.forEach(item => {
    if (new Date(item.updatedAt).getDate() === new Date().getDate()) {
      // 如果在同一天
      chatHistory.today.push(transfer(item));
    } else if (new Date(item.updatedAt).getDate() === new Date().getDate() - 1) {
      // 如果是昨天
      chatHistory.yesterday.push(transfer(item));
    } else if (new Date(item.updatedAt).getMonth() === new Date().getMonth()) {
      // 如果是更早的
      chatHistory.thisMonth.push(transfer(item));
    } else {
      // 如果是其他时间
      chatHistory.other.push(transfer(item));
    }
  });

  console.log(JSON.stringify(chatHistory));
} else {
  // 出现问题 有空再处理
  console.log(data.value, status.value);
}

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
