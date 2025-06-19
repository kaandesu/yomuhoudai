<template>
  <div class="flex items-center justify-start md:gap-x-0 gap-x-4">
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

      <section
        class="items-start w-full md:h-12 h-24 flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between md:justify-start md:items-center"
      >
        <div
          class="relative w-full max-w-xs md:max-w-[140px] items-center justify-between mr-0 md:mr-2"
        >
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
        <div class="hidden md:flex justify-center items-center gap-x-2">
          <Tabs
            default-value="title"
            v-model="searchFieldTab"
            class="ml-2 flex justify-center items-center gap-6"
          >
            <TabsList class="grid grid-cols-2">
              <TabsTrigger value="title"> Title </TabsTrigger>
              <TabsTrigger value="author"> Author </TabsTrigger>
            </TabsList>
          </Tabs>
          <Separator orientation="vertical" class="h-4" />

          <Tabs
            default-value="title"
            v-model="searchSortTab"
            class="flex justify-center items-center gap-6"
          >
            <TabsList class="grid grid-cols-2">
              <TabsTrigger value="asc">
                <span class="hidden md:block truncate"> Ascending </span>
                <Icon
                  class="ml-0 md:ml-3"
                  size="1rem"
                  name="gravity-ui:bars-ascending-align-left-arrow-down"
                />
              </TabsTrigger>
              <TabsTrigger value="desc">
                <span class="hidden md:inline-block truncate">
                  Descending
                </span>
                <Icon
                  class="ml-0 md:ml-3"
                  size="1rem"
                  name="gravity-ui:bars-descending-align-left-arrow-down"
                />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <section
          class="flex md:hidden justify-center items-center gap-x-4 ml-0 md:ml-4"
        >
          <Select v-model="searchFieldTab">
            <SelectTrigger class="w-30 h-4 backdrop-blur-[3px]">
              <SelectValue placeholder="Search For" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem class="-ml-2" value="title"> Title </SelectItem>
                <SelectItem class="-ml-2" value="author"> Author </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" class="h-4" />
          <Select v-model="searchSortTab">
            <SelectTrigger class="w-30 h-4 backdrop-blur-[3px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem class="-ml-2" value="asc"> Ascending </SelectItem>
                <SelectItem class="-ml-2" value="desc"> Descending </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
      </section>
    </div>
    <section
      class="flex md:h-12 h-24 justify-between flex-col md:flex-row gap-2 items-center md:justify-center"
    >
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
const { searchQuery, searchSortTab, searchFieldTab } =
  storeToRefs(useLibrary());
const { searchBooksBy } = useLibrary();

interface DataTableToolbarProps {
  table: Table<any>;
}

const props = defineProps<DataTableToolbarProps>();

watch([searchSortTab, searchFieldTab], async () => {
  await search();
});

const { table } = props;

const isFiltered = computed(
  () => props.table.getState().columnFilters.length > 0,
);

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

onMounted(async () => {
  if (searchQuery.value.length == 0) await searchBooksBy("title")({});
});

const search = async () => {
  await searchBooksBy(searchFieldTab.value)({});
};

watch(searchQuery, async () => {
  if (debounceTimeout != null) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(async () => {
    await search();
  }, 500);
});
</script>
