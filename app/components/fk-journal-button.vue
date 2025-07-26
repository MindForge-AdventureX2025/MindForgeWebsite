<script lang="ts" setup>
import type { ApiChatHistoryItem } from '~/types/chatHistory'

const props = defineProps<{
  disabled: boolean
}>()

const emit = defineEmits(['submit'])

const renderingData = ref<ApiChatHistoryItem[]>([])
async function clickHandle() {
  const data = await $fetch<ApiChatHistoryItem[]>('/api/m/journals/', {
    method: 'get',
  })

  renderingData.value = data
}

const selectedJournal = ref()
const textValue = ref('')

watch(selectedJournal, async (nv) => {
  if (nv) {
    const data = await $fetch<Journal>(`/api/m/journals/${nv}`, {
      method: 'get',
    })

    textValue.value = data.content
  }
})

function submit() {
  emit('submit', {
    id: selectedJournal.value,
    text: textValue.value,
  })
}
</script>

<template>
  <ClientOnly>
    <Dialog>
      <DialogTrigger :disabled="props.disabled">
        <Button size="icon" class="!w-[30px] !h-[30px]" variant="outline" @click="clickHandle">
          <Icon name="ic:round-plus" class="text-lg" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Journal</DialogTitle>
          <DialogDescription>Add Journal to make AI can edit your journal data</DialogDescription>
        </DialogHeader>

        <Select v-model="selectedJournal">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a journal" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="(item, index) of renderingData" :key="item._id + index.toString()" :value="item._id">
                {{ item.title }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <textarea v-model="textValue" class="resize-none h-40" placeholder="Keep the sentence you want to update there" />
        <DialogFooter>
          <DialogClose class="flex gap-2">
            <Button variant="secondary">
              Cancel
            </Button>
            <Button :disabled="!(selectedJournal && textValue)" @click="submit">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </ClientOnly>
</template>

<style>

</style>
