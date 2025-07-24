<template>
  <ClientOnly>
    <Sidebar collapsible="icon">
      <SidebarHeader> <SidebarTrigger /> S**t</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel> F </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />Ryan Zhu
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />R**n Z*u
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />R**n Z*u
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild class="flex items-center">
                  <NuxtLink>
                    <Icon name="arcticons:human-benchmark" class="text-xl" />R**n Z*u
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Adventure X</SidebarFooter>
    </Sidebar>
  </ClientOnly>
</template>

<script lang="ts" setup>
import SidebarHeader from "./ui/sidebar/SidebarHeader.vue";
</script>

<style></style>
