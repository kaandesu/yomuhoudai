<template>
  <main class="box-border h-full w-full pt-4 flex flex-col justify-center">
    <IconBg page="Edit" />
    <section class="w-full h-12 flex justify-start items-center py-2">
      <Tabs
        default-value="title"
        v-model="activeTab"
        class="-ml-4 w-[400px] flex justify-center items-center gap-6"
      >
        <TabsList class="grid grid-cols-2">
          <TabsTrigger value="title"> Title </TabsTrigger>
          <TabsTrigger value="author"> Author </TabsTrigger>
        </TabsList>
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
      </Tabs>
    </section>
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
const { searchBooksByAuthor, searchBooksByTitle } = useLibrary();

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
