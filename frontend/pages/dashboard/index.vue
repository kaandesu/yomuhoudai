<template>
  <main class="h-full w-full pt-5">
    <IconBg page="Dashboard" />
    <div
      v-if="featurePreview.heatmap"
      class="flex flex-col lg:flex-row gap-4 justify-stretch items-stretch"
    >
      <calendar-heatmap
        class="w-full lg:w-1/2"
        :values="heatMapData"
        :end-date="'2025-01-07'"
        :start-date="'2024-24-06'"
        :range-color="rangeColor"
        :round="5"
        :max="25"
        :dark-mode="colorMode.value === 'dark'"
        :no-data-text="'no data for this day'"
        tooltip-unit="pages"
      />

      <!-- InfoCards -->
      <div class="flex flex-col sm:flex-row w-full lg:w-1/2 gap-4">
        <BasicCard
          class="h-28 w-full"
          title="In Total"
          :value="overviewPaginationData.total ?? books.length"
          :muted="'Ahead of the yearly goal 🎉!'"
          :icon="'fluent-emoji-high-contrast:books'"
        />
        <BasicCard
          class="h-28 w-full"
          title="On Going"
          :muted="'+100% from last month'"
          :value="`${totalOngoing}`"
          :icon="'fluent-emoji-high-contrast:books'"
        />
        <BasicCard
          class="h-28 w-full"
          title="Completed"
          :muted="'+100% from last month'"
          :value="`${totalCompleted}`"
          :icon="'fluent-emoji-high-contrast:books'"
        />
        <!-- /InfoCards -->
      </div>
    </div>

    <section class="mt-4 flex gap-x-5 w-full items-center justify-start">
      <!-- Status Filter -->
      <Select v-model="selectedStatus">
        <SelectTrigger class="w-30 h-4 backdrop-blur-[3px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem> All </SelectItem>
            <SelectItem value="on-hold"> On Hold </SelectItem>
            <SelectItem value="plan-to-read"> Planned </SelectItem>
            <SelectItem value="ongoing"> On Going </SelectItem>
            <SelectItem value="completed"> Completed </SelectItem>
            <SelectItem value="dropped"> Dropped </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <!-- /Status Filter -->
      <new-dialog actionType="new" />
      <DownloadPopover />
      <Button
        :disabled="loading"
        class="w-18 sm:w-24 h-4 backdrop-blur-[2px] bg-transparent flex justify-between rounded-md"
        variant="outline"
        @click="getBooks()"
      >
        <span class="hidden sm:inline-block">
          {{ loading ? "Loading..." : "Load All" }}
        </span>
        <Icon name="solar:cloud-download-linear" size="1.5rem" />
      </Button>
      <Button
        :disabled="loading"
        class="w-18 sm:w-24 h-4 backdrop-blur-[2px] bg-transparent flex justify-between rounded-md"
        variant="outline"
        @click="handleRefresh()"
      >
        <span class="hidden sm:inline-block">
          {{ loading ? "Loading..." : "Refresh" }}
        </span>
        <Icon name="mdi:refresh" size="1.5rem" />
      </Button>
    </section>
    <!-- BookCards -->
    <div
      class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-4"
      v-auto-animate
    >
      <book-card v-for="book in filteredBooks" :key="book.title" :book="book" />

      <div
        v-if="books.length > 0"
        class="w-full h-[7.5rem] flex justify-center items-center flex-col gap-y-2"
      >
        {{ books.length }}/{{ overviewPaginationData.total }}
        <Button
          :disabled="loading || overviewPaginationData.total == books.length"
          class="w-24 h-4 backdrop-blur-[4px] bg-transparent flex justify-between rounded-md"
          variant="outline"
          @click="handleLoadMore()"
        >
          {{ loading ? "Loading..." : "Load More" }}
          <Icon class="ml-3" name="ep:more" size="1.5rem" />
        </Button>
      </div>
    </div>
    <!-- /BookCards -->
  </main>
</template>

<script setup lang="ts">
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import "vue3-calendar-heatmap/dist/style.css";
import { useLibrary } from "@/stores/library";
import { useStateManager } from "@/stores/state-manager";
const { featurePreview } = storeToRefs(useStateManager());
const { books, loading, overviewPaginationData } = storeToRefs(useLibrary());
const { getBooks, getBooksPaginated } = useLibrary();
const colorMode = useColorMode();

const handleRefresh = async () => {
  await useAsyncData(() => getBooksPaginated({ page: 1 }));
};

const handleLoadMore = async () => {
  await getBooksPaginated({
    page: overviewPaginationData.value.currentPage + 1,
  });
};

/* Info Cards */
const totalOngoing = computed(() => {
  let temp = books.value;
  return temp.filter((b: any) => b.status == "ongoing").length;
});

const totalCompleted = computed(() => {
  let temp = books.value;
  return temp.filter((b: any) => b.status == "completed").length;
});
/* /Info Cards */

/* Filter-by-status */
const selectedStatus = ref("");
const filteredBooks = computed<Book[]>(() => {
  if (!selectedStatus.value) return books.value;
  return books.value.filter(
    (book: Book) => book.status === selectedStatus.value,
  );
});
/* /Filter-by-status */

/* Heatmap */
// TODO: delete this temp data once the real logic is implemented
function generateRandomHeatmapData(
  startDate: any,
  endDate: any,
  numberOfDays: any,
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateSet = new Set();
  const data = [];

  while (dateSet.size < numberOfDays) {
    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    const dateStr = randomDate.toISOString().split("T")[0];
    if (!dateSet.has(dateStr)) {
      dateSet.add(dateStr);
      data.push({
        date: dateStr,
        count: Math.floor(Math.random() * 30) + 1,
      });
    }
  }

  return data;
}
const heatMapData = ref<any>([{ date: "2025-01-01", value: 1 }]);
const rangeColor = computed(() => {
  return colorMode.value === "dark"
    ? ["#2B2B2B", "#5B5B1E", "#5f6e1f", "#9B9B13", "#BFA700", "#ffc107"]
    : ["#EAEDF0", "#fff7b0", "#fffe00", "#ffe95c", "#ffd000", "#ffc107"];
});
onMounted(() => {
  heatMapData.value = generateRandomHeatmapData(
    "2024-01-06",
    "2025-01-07",
    100,
  );
});
/* /Heatmap */

defineExpose({
  showDatePicker: true,
  onDownload: () => {
    createToast({
      message: "Download started!",
      toastOps: {
        description: "Downloading...",
      },
      type: "info",
    })();
  },
});
</script>
