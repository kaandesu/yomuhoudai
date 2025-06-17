<template>
  <main class="box-border h-full w-full pt-4 flex flex-col justify-center">
    <IconBg page="Edit" />
    <section class="w-full h-full">
      <DataTableSearchResults />
      <div
        v-if="false"
        class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        v-auto-animate
      >
        <book-card
          v-if="searchQuery.length != 0"
          v-for="book in searchResults"
          :key="book.title"
          :book="book"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useLibrary } from "@/stores/library";
const { searchResults, searchQuery } = storeToRefs(useLibrary());
</script>
