<script lang="ts" setup>
import type { RangeCalendarGridHeadProps } from 'radix-vue'
import { RangeCalendarGridHead } from 'radix-vue'

const props = defineProps<RangeCalendarGridHeadProps>()
</script>

<template>
	<RangeCalendarGridHead v-bind="props">
		<slot />
	</RangeCalendarGridHead>
</template>
