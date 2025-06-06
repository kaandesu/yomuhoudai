<template>
  <main class="flex">
    <main class="mt-16 flex h-screen w-full transition-[margin] md:mt-0">
      <div class="flex h-full w-full flex-col">
        <!-- Nav Bar -->
        <section
          class="box-border flex h-16 w-full items-center justify-between px-6 py-4"
        >
          <div />
          <div class="flex items-center justify-center gap-x-2">
            <LangSelect />
            <DarkButton />
          </div>
        </section>
        <!-- Page  -->
        <section class="box-border h-[calc(100%-4rem)] w-full p-6 pt-2">
          <div class="text-3xl font-bold">
            {{ currentPageInfo.title }}
          </div>
          <div v-auto-animate class="pb-2">
            <p v-if="currentPageInfo.desc">
              {{ currentPageInfo.desc }}
              <br />
            </p>
          </div>
          <slot />
        </section>
      </div>
    </main>
  </main>
</template>

<script setup lang="ts">
import { useStateManager } from "@/stores/state-manager";
const { navState, currentPageInfo } = storeToRefs(useStateManager());
</script>
