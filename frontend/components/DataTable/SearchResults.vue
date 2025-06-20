<script setup lang="ts">
import DataTable from "./components/DataTable.vue";
import { useLibrary } from "@/stores/library";
const { searchResults } = storeToRefs(useLibrary());
import { columns } from "./components/columns";
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 p-4 px-0 flex">
    <DataTable :data="searchResults" :columns="columns" />
  </div>
</template>
