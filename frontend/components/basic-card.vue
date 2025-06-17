<template>
  <Card
    class="bg-transparent relative flex justify-between flex-col"
    style="backdrop-filter: blur(3px)"
  >
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-0 pt-4 px-4"
    >
      <CardTitle class="text-sm font-medium"> {{ title }} </CardTitle>
      <Icon v-if="icon" class="h-5 w-5 text-muted-foreground" :name="icon" />
    </CardHeader>

    <CardContent class="flex flex-col justify-between items-start gap-y-2">
      <div class="text-2xl font-bold">{{ value }}</div>
      <p class="text-xs text-muted-foreground">{{ muted }}</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
const {
  title = "Card Title",
  value = "0.0",
  muted = "+0% from last month",
  icon,
} = defineProps<{
  title: string;
  value: string;
  muted?: string;
  icon?: string;
}>();
</script>
