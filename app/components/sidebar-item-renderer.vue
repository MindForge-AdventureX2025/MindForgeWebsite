<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ props.title }}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="(item, index) of props.data" :key="index + item.href">
          <SidebarMenuButton class="flex justify-between items-center">
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
                    <DropdownMenuLabel class="!text-sm text-gray-400">Edit</DropdownMenuLabel>

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
                        <span class="text-red-500">Delete</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent v-if="dialogType === 'rename'">
                <DialogHeader>
                  <DialogTitle>Rename</DialogTitle>
                </DialogHeader>
                <div class="flex flex-col gap-2">
                  <!-- Body -->
                  <Label for="name" class="text-sm"> New Name </Label>
                  <Input id="name" v-model="newName" placeholder="New Chat" />
                </div>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="secondary">Cancel</Button>
                    <Button @click="renameChat(index)">Save</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>

              <DialogContent v-else>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription
                    >This action cannot be undone. This will permanently delete your chat and remove
                    the data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="destructive" @click="deleteChat(index)"> Continue</Button>
                  </DialogClose>
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
const newName = ref<string>("");

const props = defineProps<{
  title: string;
  data: RenderingItem[];
}>();

const setDialogType = (type: "rename" | "delete") => {
  dialogType.value = type;
};

const deleteChat = async (index: number) => {
  // 乐观更新
  const item = props.data[index];
  if (item && item.delete) {
    // eslint-disable-next-line vue/no-mutating-props
    props.data.splice(index, 1);

    await $fetch(item.delete, {
      method: "delete",
    });
  }
};

const renameChat = async (index: number) => {
  // 乐观更新
  const item = props.data[index];
  if (item && item.rename) {
    item.name = newName.value;

    await $fetch(item.rename, {
      method: "post",
      body: { name: newName.value },
    });
  }
};
</script>

<style></style>
