<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
  middleware: ['user'],
  layout: false,
  title: 'Diaries',
})

const route = useRoute()

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
  await $fetch(`/api/m/journals/rename/${showingData.id}`, {
    method: 'post',
    body: { name: showingData.title },
  })
}, 1000)
</script>

<template>
  <div class="p-14">
    <input v-model="showingData.title" class="w-full flex pb-0 border-b-[1px] border-accent-foreground outline-none mt-2 text-2xl font-bold" placeholder="Your title" @input="updateTitle">
  </div>
</template>

<style></style>
