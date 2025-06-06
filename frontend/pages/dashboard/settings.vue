<template>
  <main class="box-border h-full w-full pt-0">
    <Separator class="my-5"></Separator>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label class="mt-0" for="openaiapi">OpenAI API KEY</Label>
      <Input id="openaiapi" placeholder="Enter OpenAi API key" v-model="temp" />
      <Button class="relative mt-5" @click="updateSettings()">
        <div
          class="absolute right-0 top-0 h-5 w-5 translate-x-[50%] translate-y-[-50%] rounded-full bg-red-500"
          v-if="temp != apikeys.gpt"
        />
        Update Settings
      </Button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useStateManager } from "@/stores/state-manager";
const { apikeys } = storeToRefs(useStateManager());

const temp = ref<string>("");

onMounted(() => {
  if (apikeys.value.gpt != "") {
    temp.value = apikeys.value.gpt;
  }
});

const updateSettings = () => {
  apikeys.value.gpt = temp.value;

  createToast({
    message: "Success",
    toastOps: {
      description: "Updated the user settings!",
    },
    type: "success",
  })();
};
</script>
