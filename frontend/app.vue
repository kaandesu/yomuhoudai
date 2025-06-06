<template>
  <NuxtLayout :class="theme">
    <NuxtLoadingIndicator :color="theme" :height="5" />
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import { useStateManager, theme } from "@/stores/state-manager";

const app = useStateManager();
const { updateActivePage } = app;
const route = useRoute();

onMounted(() => {
  updateActivePage(route.name);
});
watch(
  () => route.name,
  () => updateActivePage(route.name),
);
</script>
