<template>
  <div>
    <NuxtLayout name="with-tabs">
      <NuxtPage ref="page" :dateValue="dateValue" />
      <template v-if="page && page.pageRef" #bar>
        <DateRangePicker
          v-if="page.pageRef.showDatePicker"
          v-model="dateValue"
        />
        <Alert
          v-if="apikeys.gpt == '' && page.pageRef.enableApiAlert"
          variant="destructive"
          class="w-full"
        >
          <AlertTitle>API Key Required</AlertTitle>
          <AlertDescription>
            You need to enter your OpenAI API key in settings to enable this
            feature.
          </AlertDescription>
        </Alert>
        <Button
          :disabled="apikeys.gpt == ''"
          v-if="page.pageRef.showAIButton"
          @click="page.pageRef.onAIclick(true)"
          class="h-5 justify-start text-left"
          variant="default"
        >
          <label class="pointer-events-none inline-block">
            Generate Suggestions
          </label>
          <Icon
            name="mynaui:sparkles"
            class="pointer-events-none ml-0 h-6 w-6 md:ml-2 md:h-4 md:w-4"
          />
        </Button>

        <Button
          v-if="page.pageRef.showAIButton"
          @click="page.pageRef.onAIclick(false)"
          class="h-5 justify-start text-left"
          variant="default"
        >
          <label class="pointer-events-none inline-block">
            Editor's Choice
          </label>
          <Icon
            name="mynaui:sparkles"
            class="pointer-events-none ml-0 h-6 w-6 md:ml-2 md:h-4 md:w-4"
          />
        </Button>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { DateRange } from "radix-vue";
import { useStateManager } from "@/stores/state-manager";
import { useLibrary } from "@/stores/library";
const { apikeys } = storeToRefs(useStateManager());
const { books } = storeToRefs(useLibrary());
const { getBooks } = useLibrary();

const page = ref<{ pageRef: null | any | undefined }>();
const dateValue = ref<DateRange>({
  start: undefined,
  end: undefined,
});

onMounted(async () => {
  if (books.value.length == 0) {
    createToast({
      message: "Loading your library...",
      type: "info",
    })();
    await getBooks();
  }
});

definePageMeta({
  layout: "main",
});
</script>
