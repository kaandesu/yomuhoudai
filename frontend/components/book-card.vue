<template>
  <Card
    class="relative w-full sm:max-w-xs bg-transparent"
    style="backdrop-filter: blur(6px)"
  >
    <!-- Buttons container -->
    <div class="absolute top-2 right-2 h-24 flex flex-col items-center gap-y-1">
      <DropdownMenu>
        <DropdownMenuTrigger class="p-2 hover:bg-primary/10 rounded-xl">
          <Icon class="h-5 w-5" name="fluent:options-16-regular" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div class="grid gap-2 p-3 pt-1">
            <!-- Page Count -->
            <div>
              <Label for="width">Pages Read:</Label>
              <div class="flex justify-evenly items-center gap-x-2">
                <Button
                  @click="
                    () => {
                      pageCount > 5 ? (pageCount -= 5) : (pageCount = 0);
                    }
                  "
                  variant="destructive"
                  class="h-3 w-3 rounded-lg"
                >
                  <Icon name="line-md:minus" class="w-3 h-3" />
                </Button>
                <Input
                  v-model="pageCount"
                  type="number"
                  default-value="0"
                  class="h-8 w-20"
                />
                <Button
                  @click="pageCount += 5"
                  class="h-3 w-3 rounded-lg bg-primary"
                >
                  <Icon name="material-symbols:add" class="w-4 h-4" />
                </Button>
              </div>
            </div>
            <!-- /Page Count -->
            <!-- Status Options -->
            <div>
              <select
                id="statusFilter"
                v-model="bookStatus"
                class="w-[85%] text-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-sm px-3 py-2"
              >
                <option value="ongoing">On Going</option>
                <option value="plan-to-read">Planned</option>
                <option value="completed">Completed</option>
                <option value="dropped">Dropped</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            <!-- Status Options -->
          </div>
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
        :book="book"
      />

      <NewDialog
        class="hidden"
        v-model="openViewSheet"
        actionType="view"
        :book="book"
      />
    </div>

    <CardContent class="flex items-start gap-3 p-3">
      <img
        :src="book.cover || placeholder"
        alt="cover"
        class="w-16 h-24 object-cover rounded-md shrink-0"
      />
      <div class="flex flex-col justify-between w-full">
        <div>
          <h3 class="font-semibold text-sm leading-tight line-clamp-2">
            {{ book.title }}
          </h3>
          <p class="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
            {{ book.author }}
          </p>
          <p class="text-xs mt-1 text-zinc-600 dark:text-zinc-300">
            {{ book.status }}
          </p>
        </div>
        <div class="mt-2 flex flex-wrap gap-1">
          <span
            v-for="genre in book.categories || []"
            :key="genre"
            class="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-[10px] px-2 py-0.5 rounded-full"
          >
            {{ genre }}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import NewDialog from "@/components/new-dialog.vue";
import { Trash2, Eye, Edit2 } from "lucide-vue-next";
import { useLibrary, type Book } from "@/stores/library";

const openEditSheet = ref<boolean>(false);
const openViewSheet = ref<boolean>(false);

const pageCount = ref<number>(0);
const bookStatus = ref<Book["status"]>("ongoing");

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

watch(bookStatus, (newVal, _) => {
  // TODO: update status
  console.log("changed to", newVal, book.id);
});

watch(pageCount, (newVal, _) => {
  if (debounceTimeout != null) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(async () => {
    // TODO: submit page read
    console.log("submit", newVal, book.id);
  }, 1000);
});

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

const { deleteBook } = useLibrary();

const handleDeletion = async () => {
  createToast({
    message: "Removing...",
    toastOps: {
      description: "Request has been sent.",
    },
    type: "info",
  })();
  await deleteBook({
    id: book.id,
  });
};

const { book } = defineProps<{
  book: {
    id: number;
    title: string;
    author: string;
    cover?: string;
    status?: string;
    categories?: string[];
  };
}>();

const placeholder = "https://placehold.co/80x120?text=No+Cover";
</script>
