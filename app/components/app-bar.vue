<script lang="ts" setup>
import whyUs from '~/lib/whyUs'
</script>

<template>
  <div class="w-full h-14 flex items-center justify-between px-5">
    <AppIcon />
    <div>
      <!-- Navigation Group -->
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink @click="whyUs">
              {{ $t("whyUs") }}
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs/">
              Special Points
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
