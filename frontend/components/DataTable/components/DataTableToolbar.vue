<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <!-- NOTE: disabled the status filter as it only filters whats on screen -->
      <DataTableFacetedFilter
        v-if="false && table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Filter Status"
        :options="statuses"
      />

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </Button>

      <section class="w-full h-12 flex justify-start items-center">
        <Tabs
          default-value="title"
          v-model="activeTab"
          class="-ml-4 w-[400px] flex justify-center items-center gap-6"
        >
          <TabsContent value="title">
            <div class="-mt-2 relative w-full max-w-sm items-center">
              <Input
                v-model="searchQuery"
                id="search"
                type="text"
                placeholder="Search..."
                class="pl-10"
              />
              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
              >
                <Icon
                  name="ic:baseline-search"
                  class="size-6 text-muted-foreground"
                />
              </span>
            </div>
          </TabsContent>
          <TabsContent value="author">
            <div class="-mt-2 relative w-full max-w-sm items-center">
              <Input
                id="search"
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="pl-10"
              />
              <span
                class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
              >
                <Icon
                  name="ic:baseline-search"
                  class="size-6 text-muted-foreground"
                />
              </span>
            </div>
          </TabsContent>

          <TabsList class="grid grid-cols-2">
            <TabsTrigger value="title"> Title </TabsTrigger>
            <TabsTrigger value="author"> Author </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>
    </div>
    <section class="flex gap-x-2 items-center">
      <DownloadPopover />
      <NewDialog />
      <DataTableViewOptions :table="table" />
    </section>
  </div>
</template>
<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { computed } from "vue";

import { statuses } from "./columns";
import DataTableFacetedFilter from "./DataTableFacetedFilter.vue";
import DataTableViewOptions from "./DataTableViewOptions.vue";

import { Cross2Icon } from "@radix-icons/vue";

import { useLibrary } from "@/stores/library";
const { searchQuery } = storeToRefs(useLibrary());
const { searchBooksByAuthor, searchBooksByTitle } = useLibrary();

interface DataTableToolbarProps {
  table: Table<any>;
}

const props = defineProps<DataTableToolbarProps>();

const { table } = props;

const isFiltered = computed(
  () => props.table.getState().columnFilters.length > 0,
);

const activeTab = ref<"title" | "author">("title");

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

onMounted(async () => {
  if (searchQuery.value.length == 0) await searchBooksByTitle({});
});

watch(searchQuery, async () => {
  if (debounceTimeout != null) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(async () => {
    switch (activeTab.value) {
      case "author":
        await searchBooksByAuthor({});
        break;
      case "title":
        await searchBooksByTitle({});
        break;
    }
  }, 500);
});
</script>
