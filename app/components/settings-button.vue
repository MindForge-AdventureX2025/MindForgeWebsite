<script lang="ts" setup>
const colorMode = useColorMode()
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
          <DropdownMenuLabel>Dark Mode</DropdownMenuLabel>
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
      </DropdownMenuContent>
    </DropdownMenu>
  </ClientOnly>
</template>

<style></style>
