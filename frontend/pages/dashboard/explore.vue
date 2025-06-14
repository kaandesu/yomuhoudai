<template>
  <main class="flex h-full w-full justify-center pt-6">
    <IconBg page="Books" />
    <section
      class="flex h-full w-full flex-col items-center justify-center"
      v-auto-animate
    >
      <!-- Thumbnail Carousel -->
      <Carousel
        class="h-36 w-full max-w-6xl sm:w-[80%]"
        @init-api="(val) => (emblaThumbnailApi = val)"
      >
        <CarouselContent class="flex gap-0">
          <CarouselItem
            v-for="(_, index) in 20"
            :key="index"
            class="min-w-[5rem] max-w-[8rem] cursor-pointer"
            @click="onThumbClick(index)"
          >
            <div
              class="transition-all duration-500"
              style="backdrop-filter: blur(6px)"
              :style="
                suggestions.length < 1
                  ? `animation-delay: ${index * 150}ms`
                  : ''
              "
              :class="[
                { initialApear: suggestions.length < 1 },
                {
                  wiggle: suggestions?.[index]?.cover != null,
                },
                { added: suggestions?.[index]?.added },
                selectedIndex === index
                  ? 'scaled opacity-100'
                  : 'shrunk opacity-80',
              ]"
            >
              <!-- Loading Placeholder -->
              <div
                v-if="!suggestions?.[index]?.cover"
                class="h-32 w-full scale-90 animate-pulse rounded-md border bg-transparent p-0 text-card-foreground shadow"
                style="animation: wiggle 1s ease-in-out infinite"
              />

              <!-- Book Card -->
              <Card v-else class="rounded">
                <CardContent class="group relative h-32 w-full p-0">
                  <section>
                    <img
                      :src="suggestions[index].cover"
                      alt="Book cover"
                      class="max-h-full max-w-full object-contain"
                    />
                    <div
                      class="absolute inset-0 flex flex-col justify-end px-2 py-3"
                      :class="
                        selectedIndex === index ? 'bg-black/85' : 'bg-black/60'
                      "
                    >
                      <!-- Title & Author -->
                      <div
                        class="translate-y-14 opacity-100 transition-all duration-700 group-hover:-translate-y-8 group-hover:opacity-0"
                      >
                        <h3 class="text-sm font-bold text-white">
                          {{ suggestions[index].title ?? "--" }}
                        </h3>
                        <p class="text-[10px] text-white">
                          {{ suggestions[index].author }}
                        </p>
                      </div>

                      <!-- Meta Info (Genre, Pages, Rating, Year) -->
                      <div
                        class="translate-y-[2rem] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        <p
                          class="pointer-events-none text-sm font-bold text-white flex flex-col items-center gap-1"
                        >
                          <label v-if="suggestions[index].categories">
                            {{ suggestions[index].categories[0] }}
                          </label>
                          <label v-if="suggestions[index].pageCount">
                            {{ suggestions[index].pageCount }} Pages
                          </label>
                          <label
                            v-if="
                              suggestions[index].rating &&
                              suggestions[index].rating !== 'N/A'
                            "
                          >
                            {{ suggestions[index].rating }} Rating
                          </label>
                          <label v-if="suggestions[index].publishedDate">
                            {{ suggestions[index].publishedDate.slice(0, 4) }}
                          </label>
                        </p>
                      </div>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="hidden items-center sm:flex" />
        <CarouselNext class="hidden items-center sm:flex" />
      </Carousel>

      <section
        v-if="suggestions.length < 1"
        class="h-1/2 space-y-4 p-0 sm:p-6 flex justify-center items-center flex-col"
      >
        <Alert
          v-if="apikeys.gpt == ''"
          variant="destructive"
          class="w-full initialApear"
        >
          <AlertTitle>API Key Required</AlertTitle>
          <AlertDescription>
            You need to enter your OpenAI API key in settings to enable
            "Generate Solutions" feature.
            <br />
            Or use "Editor's Choice" for offline suggestions.
          </AlertDescription>
        </Alert>
        <SvgExplore class="w-full md:w-2/5 h-2/5" />
      </section>
      <!-- Description Carousel -->
      <section v-if="suggestions.length > 1" class="h-1/2 space-y-4 p-0 sm:p-6">
        <Carousel
          class="relative max-w-md"
          @init-api="(val) => (emblaMainApi = val)"
        >
          <CarouselContent>
            <CarouselItem v-for="(_, index) in 20" :key="index">
              <div class="h-full p-0 sm:p-6">
                <Card
                  style="backdrop-filter: blur(6px)"
                  class="bg-transparent w-full sm:max-w-md rounded-2xl border border-muted shadow-md"
                >
                  <CardHeader class="space-y-2 px-6 pt-6">
                    <CardTitle
                      class="text-lg font-semibold flex sm:block justify-center"
                    >
                      {{ suggestions[index]?.title }}
                    </CardTitle>
                    <CardDescription
                      v-if="suggestions[index]?.description"
                      class="text-sm text-muted-foreground flex sm:block justify-center px-2 sm:px-0"
                    >
                      {{
                        suggestions[index].description.slice(0, 150) +
                        (suggestions[index].description.length > 150
                          ? "..."
                          : "")
                      }}
                    </CardDescription>
                    <div
                      class="text-xs text-muted-foreground space-y-1 pt-2 hidden sm:block"
                    >
                      <p>
                        <span class="font-medium">Published Date:</span>
                        {{ suggestions[index]?.publishedDate || "N/A" }}
                      </p>
                      <div v-if="suggestions[index]?.categories?.length">
                        <p class="font-medium mb-1">Categories:</p>
                        <div class="flex flex-wrap gap-2">
                          <Badge
                            v-for="(cat, i) in suggestions[index].categories"
                            :key="i"
                            variant="outline"
                            class="text-xs"
                          >
                            {{ cat }}
                          </Badge>
                        </div>
                      </div>
                      <p>
                        <span class="font-medium">Pages:</span>
                        {{ suggestions[index]?.pageCount || "N/A" }}
                      </p>
                      <p>
                        <span class="font-medium">Rating:</span>
                        {{ suggestions[index]?.rating || "N/A" }}
                      </p>
                    </div>
                  </CardHeader>
                  <CardFooter class="px-6 pb-6 pt-2 flex justify-center">
                    <Button
                      :disabled="loading"
                      size="sm"
                      @click="addNewBook(index)"
                    >
                      Add to Your Library
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="hidden items-center sm:flex" />
          <CarouselNext class="hidden items-center sm:flex" />
        </Carousel>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { watchOnce } from "@vueuse/core";
import { ref } from "vue";
import { type Book, type BookPayload, useLibrary } from "@/stores/library";
import { Card, CardContent } from "@/components/ui/card";
import { useStateManager } from "@/stores/state-manager";
const { apikeys } = storeToRefs(useStateManager());
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const { loading, books, suggestions } = storeToRefs(useLibrary());

const { createBook } = useLibrary();

const suggestions2 = [
  { title: "1984", author: "George Orwell" },
  { title: "Brave New World", author: "Aldous Huxley" },
  { title: "The Hitchhiker’s Guide to the Galaxy", author: "Douglas Adams" },
  { title: "Neuromancer", author: "William Gibson" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Harry Potter and the Sorcerer’s Stone", author: "J.K. Rowling" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "Pride and Prejudice", author: "Jane Austen" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "Moby Dick", author: "Herman Melville" },
  { title: "The Book Thief", author: "Markus Zusak" },
  { title: "Sapiens", author: "Yuval Noah Harari" },
  { title: "Educated", author: "Tara Westover" },
  { title: "The Silent Patient", author: "Alex Michaelides" },
  { title: "The Girl on the Train", author: "Paula Hawkins" },
  { title: "Gone Girl", author: "Gillian Flynn" },
  { title: "The Hunger Games", author: "Suzanne Collins" },
  { title: "The Alchemist", author: "Paulo Coelho" },
  { title: "The Shadow of the Wind", author: "Carlos Ruiz Zafón" },
];

const fetchBookInfo = async (bookTitle: string, author: string) => {
  const query = `${bookTitle} ${author}`;
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&langRestrict=en`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    const volumeInfo = data.items[0].volumeInfo;

    const bookInfo = {
      coverUrl: volumeInfo.imageLinks?.thumbnail || "",
      description: volumeInfo.description || "No description available",
      categories: volumeInfo.categories || [],
      pageCount: volumeInfo.pageCount || "N/A",
      publishedDate: volumeInfo.publishedDate || "Unknown Date",
      rating: volumeInfo.rating || "N/A",
    };

    return bookInfo;
  }

  return null; // Return null if no book found
};

const loadBookInfo = async () => {
  if (suggestions.value == null) return;
  for (let i = 0; i < suggestions.value.length; i++) {
    const book = suggestions.value[i];
    const bookInfo = await fetchBookInfo(book.title, book.author);
    if (bookInfo) {
      book.cover = bookInfo.coverUrl;
      book.description = bookInfo.description;
      book.categories = bookInfo.categories;
      book.pageCount = bookInfo.pageCount;
      book.publishedDate = `${bookInfo.publishedDate}`;
      book.rating = `${bookInfo.rating}`;
    }
  }
};

onMounted(() => {
  // TODO: when its persisted we don't need to fetch again
  // only when we click the generate button
  if (
    suggestions.value != null &&
    suggestions.value[0] != undefined &&
    suggestions.value[0].cover == undefined
  ) {
    console.log("load book covers");
    loadBookInfo();
  }
});

const addNewBook = async (index: number) => {
  const addedBook = suggestions.value?.[index];
  if (
    !addedBook ||
    suggestions.value == null ||
    suggestions.value?.[index] == null
  )
    return;

  const book: BookPayload = cleanBookPayload({
    title: addedBook.title,
    author: addedBook.author,
    cover: addedBook.cover,
    currentPage: addedBook.currentPage,
    description: addedBook.description,
    categories: addedBook.categories,
    pageCount: addedBook.pageCount,
    publishedDate: addedBook.publishedDate,
  });
  await createBook({
    book,
    onSuccess: () => {
      if (suggestions.value == null) return;
      suggestions.value[index].added = true;
      setTimeout(() => {
        suggestions.value?.splice(index, 1);

        if (suggestions.value?.[index] != null)
          suggestions.value[index].added = false;

        // go one back to fix some bugs
        if (emblaMainApi.value) {
          const newIndex = selectedIndex.value - 1;
          emblaMainApi.value.scrollTo(newIndex >= 0 ? newIndex : 0, true);
        }
      }, 600);
    },
  });
};

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (
    !emblaMainApi.value ||
    !emblaThumbnailApi.value ||
    suggestions.value?.[index] == null
  )
    return;
  emblaMainApi.value.scrollTo(index, true);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});

defineExpose({
  showAIButton: true,
  enableApiAlert: true,
  onAIclick: async (askAi: boolean) => {
    // TODO: here actually get the suggestions from gpt
    if (askAi == false) {
      // @ts-ignore
      suggestions.value = suggestions2;
    }
    createToast({
      message: "Loading Suggestions!",
      toastOps: {
        description: "Books based on your interests.",
      },
      type: "info",
    })();

    await loadBookInfo();
  },
});
</script>
<style scoped>
@keyframes wiggle {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(-10px);
  }
}
.wiggle {
  animation: pulse 0.6s ease-in-out forwards;
}
.scaled {
  scale: 1.1;
}
.shrunk {
  scale: 0.9;
}

@keyframes pulse {
  0%,
  100% {
    scale: 1;
  }
  50% {
    scale: 1.1;
  }
}

.added {
  animation: disapear 0.6s ease-in-out forwards;
}

.initialApear {
  scale: 0;
  animation: apear 0.6s ease-in-out forwards;
}

@keyframes disapear {
  from {
    scale: 1;
    opacity: 1;
  }
  to {
    opacity: 0;
    scale: 0;
  }
}

@keyframes apear {
  to {
    scale: 1;
    opacity: 1;
  }
  from {
    opacity: 0;
    scale: 0;
  }
}
</style>
