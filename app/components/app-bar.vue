<script lang="ts" setup></script>

<template>
  <div class="w-full h-14 border-b-2 flex items-center justify-between px-5">
    <div class="flex items-center gap-2">
      <img src="/logo.png" class="w-9 h-9">
      <h3 class="text-2xl font-bold font-serif">
        MindForge
      </h3>
    </div>
    <div>
      <!-- Navigation Group -->
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs/introduction">
              Why US
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs/introduction">
              ...
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <div class="flex items-center gap-2">
      <!-- Button group -->
      <SignedOut>
        <SignInButton as-child>
          <Button variant="outline" class="cursor-pointer">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SettingsButton />
    </div>
  </div>
</template>

<style></style>
