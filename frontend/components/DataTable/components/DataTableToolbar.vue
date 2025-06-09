<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { computed } from "vue";
import type { Task } from "../data/schema";

import { statuses } from "./columns";
import DataTableFacetedFilter from "./DataTableFacetedFilter.vue";
import DataTableViewOptions from "./DataTableViewOptions.vue";

import { Cross2Icon } from "@radix-icons/vue";

interface DataTableToolbarProps {
  table: Table<Task>;
}

const props = defineProps<DataTableToolbarProps>();

const { table } = props;

const isFiltered = computed(
  () => props.table.getState().columnFilters.length > 0,
);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter books..."
        :model-value="
          (table.getColumn('title')?.getFilterValue() as string) ?? ''
        "
        class="h-8 w-[100px] md:w-[150px] lg:w-[250px]"
        @input="table.getColumn('title')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
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
    </div>
    <section class="flex gap-x-2 items-center">
      <Button
        class="h-4 bg-secondary justify-start text-left"
        variant="secondary"
      >
        <label class="pointer-events-none hidden md:inline-block">
          Download
        </label>
        <Icon
          name="material-symbols:download-2-outline-rounded"
          class="pointer-events-none ml-0 h-6 w-6 md:ml-2 md:h-4 md:w-4"
        />
      </Button>
      <NewDialog />
      <DataTableViewOptions :table="table" />
    </section>
  </div>
</template>
