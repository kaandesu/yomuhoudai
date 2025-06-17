<template>
  <main class="box-border h-full w-full pt-0">
    <IconBg page="Settings" />
    <Separator class="my-5"></Separator>
    <div class="grid w-full max-w-lg items-center gap-1.5">
      <Label class="mt-0" for="openaiapi">OpenAI API KEY</Label>
      <Input
        id="openaiapi"
        placeholder="Enter OpenAi API key"
        v-model="apikeys.gpt"
      />

      <Label class="mt-4 text-lg" for="openaiapi">Feature Preview</Label>

      <div class="items-top flex gap-x-2 mt-2">
        <basic-checkbox v-model:model-value="featurePreview.aiSuggestions" />
        <div
          class="grid cursor-pointer gap-1.5 leading-none select-none"
          @click="featurePreview.aiSuggestions = !featurePreview.aiSuggestions"
        >
          <p class="text-sm">
            Enable the 'Generate Suggestions' button for AI-assisted book
            recommendations on the 'Explore' page.
            <br />
            <small class="text-muted-foreground">
              Only for preview. You may use "Editor's Choice" instead.</small
            >
          </p>
        </div>
      </div>

      <div class="items-top flex gap-x-2 mt-4">
        <basic-checkbox v-model:model-value="featurePreview.heatmap" />
        <div
          class="grid cursor-pointer gap-1.5 leading-none select-none"
          @click="featurePreview.heatmap = !featurePreview.heatmap"
        >
          <p class="text-sm">
            Enable yearly heatmap page tracker & tracking cards on the
            'Overview' page!
            <br />
            <small class="text-muted-foreground"> Only for preview</small>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useStateManager } from "@/stores/state-manager";
const { apikeys, featurePreview } = storeToRefs(useStateManager());
</script>
