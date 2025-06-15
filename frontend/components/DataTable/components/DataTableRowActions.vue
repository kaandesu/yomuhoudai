<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="p-2 hover:bg-primary/10 rounded-xl">
      <Icon class="h-5 w-5" name="fluent:options-16-regular" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        @click="item.action()"
        :class="item.class"
        v-for="(item, i) in dropDownOptions"
        :key="i"
      >
        {{ item.label }}
        <component :is="item.icon" class="size-4 ml-auto" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <NewDialog
    class="hidden"
    v-model="openEditSheet"
    actionType="edit"
    :book="props.row.original"
  />

  <NewDialog
    class="hidden"
    v-model="openViewSheet"
    actionType="view"
    :book="props.row.original"
  />
</template>

<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { Trash2, Eye, Edit2 } from "lucide-vue-next";
import { useLibrary } from "@/stores/library";

const openEditSheet = ref<boolean>(false);
const openViewSheet = ref<boolean>(false);

interface DataTableRowActionsProps {
  row: Row<any>;
}
const props = defineProps<DataTableRowActionsProps>();
const { deleteBook } = useLibrary();

const dropDownOptions = [
  {
    label: "View",
    class: "",
    icon: Eye,
    action: () => (openViewSheet.value = true),
  },
  {
    label: "Edit",
    class: "",
    icon: Edit2,
    action: () => (openEditSheet.value = true),
  },
  {
    label: "Delete",
    class: "text-red-600 hover:bg-red-100 dark:hover:bg-red-900",
    icon: Trash2,
    action: () => handleDeletion(),
  },
];

const handleDeletion = async () => {
  createToast({
    message: `Removing ${props.row.original.title}`,
    toastOps: {
      description: "Request has been sent.",
    },
    type: "info",
  })();
  await deleteBook({
    id: parseInt(props.row.original.id),
  });
};
</script>
