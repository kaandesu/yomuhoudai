<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Icon name="mdi-light:dots-horizontal" class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <label> Download </label>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleDeletion()" class="text-destructive">
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { useLibrary } from "@/stores/library";
import type { Task } from "../data/schema";

interface DataTableRowActionsProps {
  row: Row<Task>;
}
const props = defineProps<DataTableRowActionsProps>();
const { deleteBook } = useLibrary();

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
    onSuccess: () =>
      createToast({
        message: "Successful!",
        toastOps: {
          description: `Successfuly removed the ${props.row.original.title}.`,
        },
        type: "success",
      })(),
    onError: () =>
      createToast({
        message: "Error occured while removing the book",
        toastOps: {
          description: "Operation unsuccessful",
        },
        type: "error",
      })(),
  });
};
</script>
