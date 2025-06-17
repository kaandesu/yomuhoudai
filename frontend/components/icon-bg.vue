<template>
  <div class="icon-wrapper opacity-25 dark:opacity-10">
    <section class="icon-background">
      <div v-for="row in rowCount" :key="'row-' + row" class="icon-row">
        <Icon
          v-for="col in colCount"
          :key="'icon-' + row + '-' + col"
          :name="iconDict[page][col % iconDict[page].length]"
          class="text-black/10 dark:text-white/10 transition-colors"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  page: {
    type: String,
    default: "Books",
  },
});

const rowCount = 20;
const colCount = 25;

const iconDict = {
  Dashboard: [
    "material-symbols:dashboard",
    "material-symbols:insights",
    "material-symbols:monitoring",
    "material-symbols:analytics",
    "material-symbols:data-thresholding",
    "material-symbols:track-changes",
    "material-symbols:bar-chart",
  ],
  Books: [
    "material-symbols:menu-book",
    "material-symbols:auto-stories",
    "material-symbols:book",
    "material-symbols:library-books",
    "material-symbols:import-contacts",
    "material-symbols:chrome-reader-mode",
    "material-symbols:collections-bookmark",
  ],
  Settings: [
    "material-symbols:settings",
    "material-symbols:tune",
    "material-symbols:manage-accounts",
    "material-symbols:build",
    "material-symbols:admin-panel-settings",
    "material-symbols:manage-accounts",
    "material-symbols:settings-suggest",
  ],
  Edit: [
    "material-symbols:edit",
    "mynaui:book-plus",
    "material-symbols:database-search-outline",
    "material-symbols:edit-note",
    "lineicons:write",
    "material-symbols:drive-file-rename-outline",
    "material-symbols:edit-off",
  ],
};
</script>

<style scoped>
.icon-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
}
.icon-background {
  position: absolute;
  top: 10%;
  left: 25%;
  transform: scale(1.8) rotate(-30deg);
  pointer-events: none;
  z-index: -1;
}

.icon-row {
  white-space: nowrap;
  display: flex;
  line-height: 1;
}

.icon {
  width: 4rem;
  height: 4rem;
  transition: all 1s ease-in-out;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.icon:nth-child(odd) {
  animation-name: move-down;
}

.icon:nth-child(even) {
  animation-name: move-up;
}

@keyframes move-down {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes move-up {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
