<template>
  <main class="box-border h-full w-full pt-4 flex flex-col justify-center">
    <section class="w-full h-12 flex justify-start items-center py-2">
      <Tabs
        default-value="title"
        class="-ml-4 w-[400px] flex justify-center items-center gap-6"
      >
        <TabsList class="grid grid-cols-2">
          <TabsTrigger value="title"> Title </TabsTrigger>
          <TabsTrigger value="author"> Author </TabsTrigger>
        </TabsList>
        <TabsContent value="title">
          <div class="-mt-2 relative w-full max-w-sm items-center">
            <Input
              v-model="searchInput"
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
              v-model="searchInput"
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
      <Button class="h-5"> Search </Button>
    </section>
    <section class="w-full h-full">
      <div
        class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        v-auto-animate
      >
        <book-card
          v-if="searchInput.length != 0"
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
const { searchResults } = storeToRefs(useLibrary());
const searchInput = ref<string>("");

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

watch(searchInput, async (newVal, oldVal) => {
  if (oldVal.length == 0 || newVal.length == 0) return;
  if (debounceTimeout != null) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(async () => {
    // TODO: call the library's serach function here
  }, 1000);
});
</script>
