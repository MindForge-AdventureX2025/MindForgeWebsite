<script lang="ts" setup>
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
})

watch(data, (newValue) => {
  if (newValue && status.value === 'success') {
    showingData.content = newValue.content
    showingData.title = newValue.title
  }
}, {
  immediate: true,
})
</script>

<template>
  <div class="p-14">
    <input v-model="showingData.title" class="w-full flex pb-0 border-b-[1px] border-accent-foreground outline-none mt-2 text-2xl font-bold" placeholder="Your title">
  </div>
</template>

<style></style>
