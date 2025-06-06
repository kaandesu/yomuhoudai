<template>
  <main class="flex">
    <main class="mt-16 flex h-screen w-full transition-[margin] md:mt-0">
      <div class="flex h-full w-full flex-col">
        <!-- Nav Bar -->
        <section
          class="box-border flex h-16 w-full items-center justify-between px-6 py-4"
        >
          <div
            v-auto-animate
            class="flex flex-col justify-center items-start pt-5 gap-x-2"
          >
            <div class="text-3xl font-bold">
              {{ currentPageInfo.title }}
            </div>
            <div class="">
              <p v-if="currentPageInfo.desc">
                {{ currentPageInfo.desc }}
                <br />
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center gap-x-2">
            <LangSelect />
            <DarkButton />
            <NuxtLink
              to="https://github.com/kaandesu/yomuhoudai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button class="rounded-full" size="icon" variant="ghost">
                <Icon name="mdi:github" size="1.5rem" />
              </Button>
            </NuxtLink>
          </div>
        </section>
        <!-- Page  -->
        <section class="box-border h-[calc(100%-4rem)] w-full p-6 pt-2">
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
