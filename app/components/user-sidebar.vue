<script lang="ts" setup>
import type { ApiChatHistoryItem, History } from '../types/chatHistory.d'
import type { RenderingItem } from '~/types/sidebarRendering'
import { useBreakpoints, useEventBus } from '@vueuse/core'
import { useSidebar } from './ui/sidebar'
import SidebarHeader from './ui/sidebar/SidebarHeader.vue'

const { open, setOpen, openMobile, setOpenMobile } = useSidebar()
const tabs = ref<'journal' | 'chat'>('journal')
const colorMode = useColorMode()
const chatHistory = reactive<History>({
  today: [],
  yesterday: [],
  thisMonth: [],
  other: [],
})
const journalHistory = reactive<History>({
  today: [],
  yesterday: [],
  thisMonth: [],
  other: [],
})

const route = useRoute()

const {
  data: dataChat,
  refresh: refreshChat,
  status: statusChat,
} = useFetch<ApiChatHistoryItem[]>('/api/m/chats/', {
  method: 'get',
})

const {
  data: dataJournal,
  refresh: refreshJournal,
  status: statusJournal,
} = useFetch<ApiChatHistoryItem[]>('/api/m/journals/', {
  method: 'get',
})

// route变化的时候refresh数据
watch(route, async () => {
  await refreshChat()
  await refreshJournal()
})

// data更新时自动做操作
watch(
  dataChat,
  (newData) => {
    if (newData) {
      if (statusChat.value === 'success') {
        chatHistory.today = []
        chatHistory.yesterday = []
        chatHistory.thisMonth = []
        chatHistory.other = []

        const transfer = (originalData: ApiChatHistoryItem): RenderingItem => {
          return {
            href: `/chats/${originalData._id}`,
            name: originalData.title,
            rename: `/api/m/chats/rename/${originalData._id}`,
            // delete: `https://mindforgeserver.onrender.com/api/chats/delete/${originalData._id}`,
            delete: `/api/m/chats/delete/${originalData._id}`,
            _id: originalData._id,
          }
        }

        // 根据nonTitleUpdatedAt字段来排序 从新到旧
        newData.sort((a, b) => b.nonTitleUpdatedAt - a.nonTitleUpdatedAt)
        // 将数据分组
        newData.forEach((item) => {
          if (new Date(item.nonTitleUpdatedAt).getDate() === new Date().getDate()) {
            // 如果在同一天
            chatHistory.today.push(transfer(item))
          }
          else if (new Date(item.nonTitleUpdatedAt).getDate() === new Date().getDate() - 1) {
            // 如果是昨天
            chatHistory.yesterday.push(transfer(item))
          }
          else if (new Date(item.nonTitleUpdatedAt).getMonth() === new Date().getMonth()) {
            // 如果是更早的
            chatHistory.thisMonth.push(transfer(item))
          }
          else {
            // 如果是其他时间
            chatHistory.other.push(transfer(item))
          }
        })
      }
      else {
        // 出现问题 有空再处理
        console.error(dataChat.value, statusChat.value)
      }
    }
  },
  { immediate: true },
)

watch(
  dataJournal,
  (newData) => {
    if (newData) {
      if (statusJournal.value === 'success') {
        journalHistory.today = []
        journalHistory.yesterday = []
        journalHistory.thisMonth = []
        journalHistory.other = []

        const transfer = (originalData: ApiChatHistoryItem): RenderingItem => {
          return {
            href: `/journals/${originalData._id}`,
            name: originalData.title,
            rename: `/api/m/journals/rename/${originalData._id}`,
            delete: `/api/m/journals/delete/${originalData._id}`,
            _id: originalData._id,
          }
        }

        // 根据nonTitleUpdatedAt字段来排序 从新到旧
        newData.sort((a, b) => b.nonTitleUpdatedAt - a.nonTitleUpdatedAt)
        // 将数据分组
        newData.forEach((item) => {
          if (new Date(item.nonTitleUpdatedAt).getDate() === new Date().getDate()) {
            // 如果在同一天
            journalHistory.today.push(transfer(item))
          }
          else if (new Date(item.nonTitleUpdatedAt).getDate() === new Date().getDate() - 1) {
            // 如果是昨天
            journalHistory.yesterday.push(transfer(item))
          }
          else if (new Date(item.nonTitleUpdatedAt).getMonth() === new Date().getMonth()) {
            // 如果是更早的
            journalHistory.thisMonth.push(transfer(item))
          }
          else {
            // 如果是其他时间
            journalHistory.other.push(transfer(item))
          }
        })
      }
      else {
        // 出现问题 有空再处理
        console.error(dataChat.value, statusChat.value)
      }
    }
  },
  { immediate: true },
)

async function create() {
  if (tabs.value === 'chat') {
    // 这里为什么不用乐观更新呢?
    // 因为我们需要id 然后用户才能进入界面
    // 所以我们可以用load动画配合处理 先发请求 发完请求就href到新的

    try {
      const data = await $fetch<{
        _id: string
      }>('/api/m/chats', {
        method: 'post',
      })

      if (data && data._id) {
        // 成功创建了新的聊天
        await refreshChat()
        await navigateTo(`/chats/${data._id}`, {
          replace: true,
        })
      }
    }
    catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  else {
    try {
      const data = await $fetch<{
        _id: string
      }>('/api/m/journals', {
        method: 'post',
        body: {
          title: 'New Journal',
        },
      })

      if (data && data._id) {
        // 成功创建了新的聊天
        await refreshChat()
        await navigateTo(`/journals/${data._id}`, {
          replace: true,
        })
      }
    }
    catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
})
const isMobile = breakpoints.smaller('md')

function changeOpen() {
  setOpen(!open.value)
}

function changeOpenMobile() {
  setOpenMobile(!openMobile.value)
}

const bus = useEventBus('optimizeRename')
bus.on((_event, payload) => {
  if (payload) {
    const { id, newName } = payload

    const toArray = (e: History): RenderingItem[] => {
      const v: RenderingItem[] = []

      v.push(...e.today)
      v.push(...e.yesterday)
      v.push(...e.thisMonth)
      v.push(...e.other)

      return v
    }

    const e = toArray(chatHistory).find(e => e._id === id)
    if (e)
      e.name = newName

    const j = toArray(journalHistory).find(j => j._id === id)
    if (j)
      j.name = newName
  }
})
</script>

<template>
  <ClientOnly>
    <Sidebar collapsible="icon">
      <SidebarHeader :class="open ? 'p-4 ' : 'py-4'">
        <div
          :class="`flex items-center flex-row${open ? ' justify-between' : ' justify-center'}`"
        >
          <span v-if="open">
            <AppIcon />
          </span>
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
        <ClientOnly>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button v-if="open" class="w-full" variant="ghost">
                <Icon name="icon-park-solid:dark-mode" class="text-xl" />
                <span>Set Dark Mode</span>
              </Button>
              <Button v-else variant="ghost" size="icon" class="!w-8 !h-8">
                <Icon name="material-symbols:settings" class="text-xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-40">
              <DropdownMenuGroup>
                <DropdownMenuLabel class="text-zinc-400">
                  Dark Mode
                </DropdownMenuLabel>
                <DropdownMenuItem @click="colorMode.preference = 'system'">
                  System
                </DropdownMenuItem>
                <DropdownMenuItem @click="colorMode.preference = 'light'">
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem @click="colorMode.preference = 'dark'">
                  Dark
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ClientOnly>
      </SidebarHeader>

      <SidebarContent>
        <Tabs
          v-if="(!isMobile && open) || isMobile"
          v-model:model-value="tabs"
          default-value="journal"
        >
          <div class="px-2 w-full">
            <TabsList class="w-full">
              <TabsTrigger value="journal">
                <Icon name="system-uicons:notebook" class="text-xl" />
                <span v-if="open">Journals</span>
              </TabsTrigger>
              <TabsTrigger value="chat">
                <Icon name="humbleicons:chats" class="text-xl" />
                <span v-if="open">Chats</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="journal">
            <SidebarItemRenderer
              v-if="journalHistory.today.length > 0"
              title="Today"
              :data="journalHistory.today"
            />
            <SidebarItemRenderer
              v-if="journalHistory.yesterday.length > 0"
              title="Yesterday"
              :data="journalHistory.yesterday"
            />
            <SidebarItemRenderer
              v-if="journalHistory.thisMonth.length > 0"
              title="This Month"
              :data="journalHistory.thisMonth"
            />
            <SidebarItemRenderer
              v-if="journalHistory.other.length > 0"
              title="Others"
              :data="journalHistory.other"
            />
          </TabsContent>
          <TabsContent value="chat">
            <SidebarItemRenderer
              v-if="chatHistory.today.length > 0"
              title="Today"
              :data="chatHistory.today"
            />
            <SidebarItemRenderer
              v-if="chatHistory.yesterday.length > 0"
              title="Yesterday"
              :data="chatHistory.yesterday"
            />
            <SidebarItemRenderer
              v-if="chatHistory.thisMonth.length > 0"
              title="This Month"
              :data="chatHistory.thisMonth"
            />
            <SidebarItemRenderer
              v-if="chatHistory.other.length > 0"
              title="Others"
              :data="chatHistory.other"
            />
          </TabsContent>
        </Tabs>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton class="flex items-center cursor-pointer justify-between" @click="create">
          <span v-if="open">New {{ tabs.charAt(0).toUpperCase() + tabs.slice(1) }}</span>
          <Icon name="material-symbols:add" class="text-xl" />
        </SidebarMenuButton>
        <SidebarMenuButton class="flex items-center cursor-pointer justify-between" as-child>
          <NuxtLink to="/mindfulness">
            <span v-if="open">Mindfulness</span>
            <Icon name="material-symbols:mindfulness" class="text-xl" />
          </NuxtLink>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  </ClientOnly>
</template>

<style></style>
