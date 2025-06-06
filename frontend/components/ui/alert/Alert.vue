<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type AlertVariants, alertVariants } from '.'

const props = withDefaults(
	defineProps<{
		variant?: AlertVariants['variant']
		class?: HTMLAttributes['class']
	}>(),
	{
		variant: 'default',
	},
)
</script>

<template>
	<div :class="cn(alertVariants({ variant }), props.class)" role="alert">
		<slot />
	</div>
</template>
