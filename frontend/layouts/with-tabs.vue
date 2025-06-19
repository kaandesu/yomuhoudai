<template>
  <section class="h-full w-full">
    <div v-auto-animate class="pt-6" v-if="tabs && !loadingPage">
      <Tabs
        :default-value="tabs[0].uid"
        :model-value="currentPageInfo.uid"
        class="space-y-4"
      >
        <!-- on sm use dropdown to select the page -->
        <div class="flex items-center gap-4 sm:hidden">
          <Select
            v-model="selectedUid"
            @update:model-value="handleTabTrigger(selectedTab?.href ?? '#')"
          >
            <SelectTrigger
              class="w-[124px] h-6 text-md border rounded-md px-3 py-1.5"
            >
              <SelectValue placeholder="Select Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  class="-ml-2"
                  v-for="tab in tabs"
                  :key="tab.uid"
                  :value="tab.uid"
                >
                  {{ tab.title }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div class="ml-auto flex items-center gap-x-4">
            <slot name="bar" />
          </div>
        </div>

        <!-- on md+ use the tabs to select the page -->
        <section
          class="hidden sm:flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0"
        >
          <TabsList>
            <TabsTrigger
              v-for="tab in tabs"
              :key="tab.uid"
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
              />
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
const selectedUid = ref(currentPageInfo.value.uid);
const handleTabTrigger = async (href: string) => {
  await navigateTo(href);
};

const tabs = computed<Page[] | undefined>(() => {
  const parent = findPageById(currentPageInfo.value.parent ?? "");
  return parent
    ? [parent, ...(parent.tabs ?? [])]
    : [currentPageInfo.value, ...(currentPageInfo.value.tabs ?? [])];
});

const selectedTab = computed(() =>
  tabs.value?.find((tab) => tab.uid === selectedUid.value),
);
</script>
