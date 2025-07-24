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
          <UiDropdownMenuItem>
            <NuxtLink to="/settings/profile">System</NuxtLink>
          </UiDropdownMenuItem>
          <UiDropdownMenuItem>
            <NuxtLink to="/settings/profile">Light</NuxtLink>
          </UiDropdownMenuItem>
          <UiDropdownMenuItem>
            <NuxtLink to="/settings/profile">Dark</NuxtLink>
          </UiDropdownMenuItem>
        </UiDropdownMenuGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </ClientOnly>
</template>

<script lang="ts" setup></script>

<style></style>
