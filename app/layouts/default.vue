<template>
  <div>
    <div class="w-full h-14 border-b-2 flex items-center justify-between px-5">
      <h3 class="text-3xl font-bold font-mono">MindForge</h3>
      <div>
        <!-- Navigation Group -->
        <UiNavigationMenu>
          <UiNavigationMenuList>
            <UiNavigationMenuItem>
              <UiNavigationMenuLink href="/docs/introduction"> Why US </UiNavigationMenuLink>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem>
              <UiNavigationMenuLink href="/docs/introduction"> ... </UiNavigationMenuLink>
            </UiNavigationMenuItem>
          </UiNavigationMenuList>
        </UiNavigationMenu>
      </div>
      <div class="flex items-center gap-2">
        <!-- Button group -->
        <SignedOut>
          <SignInButton asChild>
            <UiButton variant="outline" class="cursor-pointer">Sign In</UiButton>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SettingsButton />
      </div>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
// 声明2个函数 分别是SignedIn和SignedOut 不使用button 而使用 @click 此处是为了避免在SSR时出现错误
</script>

<style></style>
