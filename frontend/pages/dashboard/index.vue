<template>
  <main class="h-full w-full pt-5">
    <IconBg page="Dashboard" />
    <div class="flex flex-col lg:flex-row gap-4">
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
      <div class="flex flex-row w-full lg:w-1/2 gap-4">
        <BasicCard
          class="h-28 w-full"
          :title="'Total Books Read'"
          :value="books.length"
          :muted="'+180.1% from last month'"
          :icon="'fluent-emoji-high-contrast:books'"
        />
        <BasicCard
          class="h-28 w-full"
          :title="'Curently Reading'"
          :value="`${totalOngoing}`"
          :icon="'fluent-emoji-high-contrast:books'"
        />
        <!-- /InfoCards -->
      </div>
    </div>

    <section class="mt-4 flex gap-x-10 w-full items-center justify-start">
      <!-- Status Filter -->
      <div class="w-20">
        <select
          id="statusFilter"
          v-model="selectedStatus"
          class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-800 text-sm px-3 py-2"
        >
          <option value="">All</option>
          <option value="on-hold">On Hold</option>
          <option value="plan-to-read">Planned</option>
          <option value="ongoing">On Going</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
        </select>
      </div>
      <!-- /Status Filter -->
      <new-dialog actionType="new" />
      <Button
        :disabled="loading"
        class="h-4"
        variant="outline"
        @click="getBooks()"
      >
        <Icon name="mdi:refresh" size="1.5rem" />
        {{ loading ? "Loading..." : "Refresh" }}
      </Button>
    </section>
    <!-- BookCards -->
    <div
      class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      v-auto-animate
    >
      <book-card v-for="book in filteredBooks" :key="book.title" :book="book" />
    </div>
    <!-- /BookCards -->
  </main>
</template>

<script setup lang="ts">
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import "vue3-calendar-heatmap/dist/style.css";
import { useLibrary } from "@/stores/library";
const { books, loading } = storeToRefs(useLibrary());
const { getBooks } = useLibrary();
const colorMode = useColorMode();

/* Info Cards */
const totalOngoing = computed(() => {
  let temp = books.value;
  return temp.filter((b: any) => b.status == "ongoing").length;
});
/* /Info Cards */

/* Filter-by-status */
const selectedStatus = ref("");
const filteredBooks = computed(() => {
  if (!selectedStatus.value) return books.value;
  return books.value.filter(
    (book: any) => book.status === selectedStatus.value,
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
