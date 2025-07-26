<script lang="ts" setup>
import type { Chat, ChatInfo, UpdateResponse } from '~/types/chat'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import Skeleton from '~/components/ui/skeleton/Skeleton.vue'

const route = useRoute()
const { data, refresh: _, status } = useFetch<Chat>(`/api/m/chats/${route.params.id}`, {
  method: 'get',
})
const focus = ref(false)
const textValue = ref<string>('')
const canSend = ref(true)
const showingMessages = reactive<ChatInfo[]>([])

watch(data, (newValue) => {
  showingMessages.length = 0
  if (status.value === 'success' && newValue?.messages !== undefined) {
    showingMessages.push(...newValue.messages.map((e) => {
      return e._doc
    }))
  }
}, {
  immediate: true,
})

function makeFocus() {
  focus.value = true
}
function unfocus() {
  focus.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    if (textValue.value) {
      send()
    }
  }
}

async function send() {
  if (canSend.value) {
    canSend.value = false
    const text = textValue.value
    textValue.value = ''

    showingMessages.push({
      sender: 'user',
      content: text,
      journalId: [],
      timestamp: new Date().getTime(),
      _id: '',
    })

    let returnValues: UpdateResponse = {
      response: '',
      originalChat: {
        messages: [],
      },
    }

    showingMessages.push(
      {
        sender: 'llm',
        content: '',
        journalId: [],
        timestamp: new Date().getTime(),
        _id: '',
      },
    )

    await fetchEventSource(`/api/m/chats/${route.params.id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
      }),
      onmessage(ev) {
        if (showingMessages[showingMessages.length - 1]) {
          (showingMessages[showingMessages.length - 1] as ChatInfo).content += JSON.parse(ev.data).chunk
        }
        if (ev.event === 'end') {
          returnValues = JSON.parse(ev.data)
        }
      },
      onclose() {
      },
      onerror(e) {
        console.error(e)
      },
    })

    canSend.value = true

    // 处理数组
    showingMessages.pop()

    if (returnValues.originalChat.messages.length > 0) {
      showingMessages.length = 0

      showingMessages.push(...returnValues.originalChat.messages)
    }
  }
}

definePageMeta({
  middleware: ['user'],
  layout: false,
  title: 'Chats',
})
</script>

<template>
  <template v-if="data && status === 'success' && 'messages' in data">
    <div class="w-full flex-[1] flex flex-col">
      <div
        v-if="showingMessages.length === 0"
        class="flex flex-col items-center justify-center flex-[1]"
      >
        <h3 class="text-stone-400 text-4xl">
          How can I help you today?
        </h3>
      </div>

      <client-backend-provider
        v-else
        class="flex flex-col gap-2 overflow-auto box-border sm:p-10 p-3"
      >
        <div v-for="(message, index) of showingMessages" :key="index + message.timestamp.toString()">
          <div v-if="message.sender === 'user'" class="p-3 rounded-xl bg-sidebar-accent w-fit">
            {{ message.content }}
          </div>

          <div v-else class="px-2">
            {{ message.content }}
          </div>
        </div>
        <Skeleton v-if="!canSend && showingMessages[showingMessages.length - 1]?.sender === 'llm' && showingMessages[showingMessages.length - 1]?.content.length === 0" class="w-full h-14" />
      </client-backend-provider>
      <div class="h-42 p-5 px-8">
        <div
          :class="
            `w-full h-full bg-sidebar-accent border-[1px] rounded-2xl p-3 flex flex-col gap-2 duration-200 ${
              focus ? 'border-accent-foreground border-2' : ''}`
          "
        >
          <textarea
            v-model="textValue"
            class="border-0 outline-0 flex-[1] resize-none"
            placeholder="Type your message here..."
            @focus="makeFocus"
            @blur="unfocus"
            @keydown="handleKeydown"
          />
          <div class="flex items-center justify-between">
            <!-- <div class="flex items-center justify-end gap-1"> -->
            <Button size="icon" variant="outline" class="!w-8 !h-8">
              <!-- 加号按钮 -->
              <Icon name="ic:round-plus" class="text-lg" />
            </Button>
            <Button size="icon" class="!w-[30px] !h-[30px]" :disabled="!canSend" @click="send">
              <Icon name="ri:send-plane-2-line" class="text-lg" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="w-full flex-[1] flex flex-col p-10">
      <div class="flex flex-col flex-[1] gap-20">
        <div class="w-full flex">
          <Skeleton class="h-12 w-12 rounded-full" />
        </div>
        <div class="w-full flex justify-end">
          <Skeleton class="h-12 w-12 rounded-full" />
        </div>
        <div class="w-full">
          <Skeleton class="h-12 w-12 rounded-full" />
        </div>
      </div>
      <Skeleton class="h-36 w-full" />
    </div>
  </template>
</template>

<style></style>
