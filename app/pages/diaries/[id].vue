<script lang="ts" setup>
import { useDebounceFn, useEventBus } from '@vueuse/core'

definePageMeta({
  middleware: ['user'],
  layout: false,
  title: 'Diaries',
})

const route = useRoute()
const bus = useEventBus('optimizeRename')

const { data, refresh: _, status } = useFetch<Journal>(`/api/m/journals/${route.params.id}`, {
  method: 'get',
})

const showingData = reactive<ShowingJournal>({
  title: '',
  content: '',
  id: '',
})

watch(data, (newValue) => {
  if (newValue && status.value === 'success') {
    showingData.content = newValue.content
    showingData.title = newValue.title
    showingData.id = newValue._id
  }
}, {
  immediate: true,
})

const updateTitle = useDebounceFn(async () => {
  bus.emit('rename', { id: route.params.id, newName: showingData.title })

  await $fetch(`/api/m/journals/rename/${showingData.id}`, {
    method: 'post',
    body: { name: showingData.title },
  })
}, 1000)
</script>

<template>
  <div class="px-8 py-4 md:px-14 flex flex-col flex-[1] ">
    <!-- eslint-disable-next-line vue/no-lone-template -->
    <template v-if="status === 'success' && data ">
      <input v-model="showingData.title" class="duration-150 w-full flex pb-0 border-b-[1px] focus:border-accent-foreground outline-none mt-2 text-2xl font-bold" placeholder="Your title" @input="updateTitle">
      <DiaryEditor />
      <!-- <MDC value="# Hi There" class="w-full h-full overflow-auto " /> -->
    </template>

    <div v-else class="flex-col flex-[1] flex gap-8">
      <Skeleton class="w-full h-14" />
      <Skeleton class="w-full flex-1" />
    </div>
  </div>
</template>

<style></style>
