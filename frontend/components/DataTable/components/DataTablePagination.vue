<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-icons/vue";
import { useLibrary } from "@/stores/library";
const { searchBooksBy } = useLibrary();
const { searchData, searchFieldTab } = storeToRefs(useLibrary());

interface DataTablePaginationProps {
  table: Table<any>;
}
const { table } = defineProps<DataTablePaginationProps>();

const canGetNextPage = computed<boolean>(() => {
  return searchData.value.currentPage < searchData.value.lastPage;
});

watch(
  () => table.getState().pagination.pageSize,
  async (newVal, _) => {
    searchData.value.perPage = newVal;
    searchData.value.currentPage = 1;
    setTimeout(
      async () =>
        await searchBooksBy(searchFieldTab.value)({
          page: searchData.value.currentPage,
        }),
      500,
    );
  },
);

const canGetPrevPage = computed<boolean>(() => {
  return searchData.value.currentPage > 1;
});

const handlePageChange = async (index: number) => {
  await searchBooksBy(searchFieldTab.value)({
    page: index,
  });
};
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-xs md:text-sm text-muted-foreground">
      {{ searchData.total }}
      entries found.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm hidden md:block font-medium">Rows per page</p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue
              :placeholder="`${table.getState().pagination.pageSize}`"
            />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [5, 10, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        class="flex w-full items-center justify-center text-xs md:text-sm font-medium"
      >
        Page {{ searchData.currentPage }} of
        {{ Math.ceil(searchData.total / searchData.perPage) }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex rounded-md"
          :disabled="!canGetPrevPage"
          @click="handlePageChange(1)"
        >
          <span class="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0 rounded-md"
          :disabled="!canGetPrevPage"
          @click="handlePageChange(searchData.currentPage - 1)"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0 rounded-md"
          :disabled="!canGetNextPage"
          @click="handlePageChange(searchData.currentPage + 1)"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex rounded-md"
          :disabled="!canGetNextPage"
          @click="handlePageChange(searchData.lastPage)"
        >
          <span class="sr-only">Go to last page</span>
          <DoubleArrowRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
