<script lang="ts" setup>
const colorMode = useColorMode()

const { locales, setLocale } = useI18n()
</script>

<template>
  <ClientOnly>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
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

        <DropdownMenuGroup>
          <DropdownMenuLabel class="text-zinc-400">
            Languages
          </DropdownMenuLabel>
          <DropdownMenuItem v-for="(item, index) of locales" :key="item + index.toString()" @click="setLocale(item.code)">
            {{ item.name }}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </ClientOnly>
</template>

<style></style>
