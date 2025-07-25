<template>
  <template v-if="data && status === 'success' && 'messages' in data">
    <div class="w-full flex-[1] flex flex-col">
      <div
        v-if="data?.messages.length === 0"
        class="flex flex-col items-center justify-center flex-[1]"
      >
        <h3 class="text-stone-400 text-4xl">How can I help you today?</h3>
      </div>

      <client-backend-provider v-else>
        <div v-for="(message, index) of data.messages">
          {{ message }}
        </div>
      </client-backend-provider>
      <div class="h-42 p-5 px-8">
        <div
          :class="
            `w-full h-full bg-sidebar-accent border-[1px] rounded-2xl p-3 flex flex-col gap-2 duration-200 ` +
            (focus ? 'border-accent-foreground border-2' : '')
          "
        >
          <textarea
            @focus="makeFocus"
            @blur="unfocus"
            class="border-0 outline-0 flex-[1] resize-none"
            @keydown="handleKeydown"
            v-model="textValue"
            placeholder="Type your message here..."
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
          <Skeleton class="h-12 w-12 rounded-full"> </Skeleton>
        </div>
        <div class="w-full flex justify-end">
          <Skeleton class="h-12 w-12 rounded-full"> </Skeleton>
        </div>
        <div class="w-full">
          <Skeleton class="h-12 w-12 rounded-full"> </Skeleton>
        </div>
      </div>
      <Skeleton class="h-36 w-full"> </Skeleton>
    </div>
  </template>
</template>

<script lang="ts" setup>
import type { Chat } from "~/types/chat";

const route = useRoute();
const focus = ref(false);
const textValue = ref<string>("");
const canSend = ref(true);

const makeFocus = () => {
  focus.value = true;
};
const unfocus = () => {
  focus.value = false;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    if (textValue.value) {
      send();
    }
  }
};

const send = async () => {
  if (canSend.value) {
    canSend.value = false;
    const data = await $fetch("/api/m/chats/" + route.params.id, {
      method: "put",
      body: {
        message: textValue.value,
      },
    });
    canSend.value = true;

    console.log(data);
  }
};

const { data, refresh, status } = useFetch<Chat>(`/api/m/chats/${route.params.id}`, {
  method: "get",
});

console.log(data.value, status.value);

definePageMeta({
  middleware: ["user"],
  layout: false,
  title: "Chats",
});
</script>

<style></style>
