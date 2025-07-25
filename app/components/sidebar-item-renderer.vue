<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ props.title }}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="(item, index) of props.data" :key="index + item.href">
          <SidebarMenuButton class="flex justify-between items-center pl-4">
            <NuxtLink :to="item.href" class="flex-1 whitespace-nowrap overflow-hidden">
              {{ item.name }}
            </NuxtLink>

            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size="icon" variant="ghost" class="cursor-pointer">
                    <Icon name="proicons:more" class="text-xl" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Edit</DropdownMenuLabel>

                    <!-- DialogTriggers -->
                    <DialogTrigger as-child>
                      <DropdownMenuItem
                        class="flex items-center gap-3"
                        @click="setDialogType('rename')"
                      >
                        <span>Rename</span>
                      </DropdownMenuItem>
                    </DialogTrigger>

                    <DialogTrigger as-child>
                      <DropdownMenuItem
                        class="flex items-center gap-3"
                        @click="setDialogType('delete')"
                      >
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent v-if="dialogType === 'rename'">
                <DialogHeader>
                  <DialogTitle>Rename</DialogTitle>
                  <!-- Do Not Need Any description -->
                </DialogHeader>
                <div>
                  <!-- Body -->
                </div>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit"> Save </Button>
                </DialogFooter>
              </DialogContent>

              <DialogContent v-else>
                <DialogHeader>
                  <DialogTitle>Delete</DialogTitle>
                  <!-- Do Not Need Any description -->
                </DialogHeader>
                <div>
                  <!-- Body -->
                </div>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit"> Save </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>

<script lang="ts" setup>
import type { RenderingItem } from "~/types/sidebarRendering";
const dialogType = ref<"rename" | "delete">("rename");

const props = defineProps<{
  title: string;
  data: RenderingItem[];
}>();

const setDialogType = (type: "rename" | "delete") => {
  dialogType.value = type;
};
</script>

<style></style>
