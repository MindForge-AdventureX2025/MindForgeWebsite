<template>
  <ClientOnly>
    <UiDropdownMenu>
      <UiDropdownMenuTrigger>
        <UiButton variant="ghost" size="icon">
          <Icon name="material-symbols:settings" class="text-xl" />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-40">
        <UiDropdownMenuGroup>
          <UiDropdownMenuLabel>Dark Mode</UiDropdownMenuLabel>
          <UiDropdownMenuItem @click="colorMode.preference = 'system'">System</UiDropdownMenuItem>
          <UiDropdownMenuItem @click="colorMode.preference = 'light'">Light</UiDropdownMenuItem>
          <UiDropdownMenuItem @click="colorMode.preference = 'dark'">Dark</UiDropdownMenuItem>
        </UiDropdownMenuGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </ClientOnly>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>

<style></style>
