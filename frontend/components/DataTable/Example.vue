<script setup lang="ts">
import tasks from "./data/tasks.json";
import DataTable from "./components/DataTable.vue";
import { useLibrary } from "@/stores/library";
const { books } = storeToRefs(useLibrary());
import { columns } from "./components/columns";
</script>

<template>
  <div class="hidden h-full flex-1 flex-col space-y-8 p-4 px-0 md:flex">
    <DataTable :data="books" :columns="columns" />
  </div>
</template>
