<script setup>
const model = defineModel();
const props = defineProps(["id", "value", "class"]);
</script>

<template>
  <div :class="props.class">
    <label
      class="relative flex cursor-pointer items-center rounded-full"
      :for="props.id"
      data-ripple-dark="true"
    >
      <input
        type="checkbox"
        v-model="model"
        :id="props.id"
        :value="props.value"
        class="peer relative h-6 w-6 cursor-pointer appearance-none rounded border border-primary-800 transition-all checked:bg-primary"
      />
      <div
        class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 opacity-0 transition-opacity peer-checked:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="0.3"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </label>
  </div>
</template>
