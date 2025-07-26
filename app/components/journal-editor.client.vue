<script lang="ts" setup>
import mdi from 'markdown-it'

const emit = defineEmits(['input'])

const height = computed(() => `${document.body.offsetHeight - 129}px`)

const model = defineModel<string>()
const md = mdi()
const html = computed(() => md.render(model.value || '*Your journal will appear here.*'))

function handleInput(event: Event) {
  emit('input', event)
}

const colorMode = useColorMode()
</script>

<template>
  <div class="flex flex-col md:flex-row relative box-border py-5" :style="{ height }">
    <div class="flex-1 p-2 font-mono border-[1px] md:rounded-l-lg md:rounded-r-none rounded-t-lg">
      <textarea v-model="model" class="w-full h-full overflow-auto outline-none resize-none" placeholder="You can say something there..." @input="handleInput" />
    </div>
    <div :class="`flex-1 p-2 border-[1px] border-l-0 rounded-b-lg md:rounded-l-none md:rounded-r-lg overflow-auto ${colorMode.value === 'dark' ? 'markdown-body markdown-body-background' : 'markdown-body-light markdown-body-light-background'}`" v-html="html" />
  </div>
</template>

<style>

</style>
