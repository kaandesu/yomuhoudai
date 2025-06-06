<template>
  <section class="h-full w-full">
    <div v-auto-animate class="pt-6">
      <Tabs
        v-if="tabs != undefined && !loadingPage"
        :default-value="tabs[0].uid"
        :modelValue="currentPageInfo.uid"
        class="space-y-4"
      >
        <section
          class="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0"
        >
          <TabsList>
            <TabsTrigger
              v-for="tab in tabs"
              :value="tab.uid"
              @click="handleTabTrigger(tab.href ?? '#')"
            >
              <div :class="`${tab.icon ? 'block' : ''}`">
                {{ tab.title }}
              </div>
              <Icon
                class="ml-0 h-[1.2rem] sm:ml-2"
                size="18"
                v-if="tab.icon"
                :name="tab.icon"
              ></Icon>
            </TabsTrigger>
          </TabsList>
          <div class="ml-0 flex items-center gap-x-4 md:ml-4">
            <slot name="bar" />
          </div>
        </section>
      </Tabs>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useStateManager } from "@/stores/state-manager";
import type { Page } from "@/types/config";
const { currentPageInfo, loadingPage } = storeToRefs(useStateManager());
const handleTabTrigger = async (href: string) => {
  await navigateTo(href);
};

const tabs = computed<Page[] | undefined>(() => {
  const parent = findPageById(currentPageInfo.value.parent ?? "");
  return parent
    ? [parent, ...(parent.tabs ?? [])]
    : [currentPageInfo.value, ...(currentPageInfo.value.tabs ?? [])];
});
</script>
