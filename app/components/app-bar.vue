<template>
  <div class="w-full h-14 border-b-2 flex items-center justify-between px-5">
    <AppBadge />
    <div>
      <!-- Navigation Group -->
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs/introduction"> Why US </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs/introduction"> ... </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <div class="flex items-center gap-2">
      <!-- Button group -->
      <SignedOut>
        <SignInButton asChild>
          <Button variant="outline" class="cursor-pointer">Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SettingsButton />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
