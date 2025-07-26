<script lang="ts" setup>
import mdi from 'markdown-it'
import ScrollArea from './ui/scroll-area/ScrollArea.vue'

const height = computed(() => `${document.body.offsetHeight - 129}px`)

const model = defineModel<string>()
const md = mdi()
const html = computed(() => md.render(model.value || '*Your diary will appear here.*'))
</script>

<template>
  <div class="hidden md:flex flex-row relative box-border py-5" :style="{ height }">
    <!-- 电脑端应用 -->
    <div class="flex-1 p-2 font-mono border-[1px] rounded-l-lg">
      <textarea v-model="model" class="w-full h-full overflow-auto outline-none resize-none" placeholder="You can say something there..." />
    </div>
    <div class="markdown-body flex-1 p-2 border-[1px] border-l-0 rounded-r-lg" v-html="html" />
  </div>
  <div class="md:hidden flex ">
    <!-- 移动端应用 -->
  </div>
</template>

<style>

</style>
