<script lang="ts" setup>
import type { RangeCalendarHeaderProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { RangeCalendarHeader, useForwardProps } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<
	RangeCalendarHeaderProps & { class?: HTMLAttributes['class'] }
>()

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props

	return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<RangeCalendarHeader
		:class="
			cn(
				'relative flex w-full items-center justify-between pt-1',
				props.class,
			)
		"
		v-bind="forwardedProps"
	>
		<slot />
	</RangeCalendarHeader>
</template>
