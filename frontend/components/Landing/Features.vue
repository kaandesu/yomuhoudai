<script setup lang="ts">
import { landing } from '@/config'
const { featureList, iconMap, title, slogan, desc } = landing.Features
</script>

<template>
	<section id="features" class="container py-24 sm:py-32">
		<h2 class="mb-2 text-center text-lg tracking-wider text-primary">
			{{ title }}
		</h2>

		<h2 class="mb-4 text-center text-3xl font-bold md:text-4xl">
			{{ slogan }}
		</h2>

		<h3
			class="mx-auto mb-8 text-center text-xl text-muted-foreground md:w-1/2"
		>
			{{ desc }}
		</h3>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<div
				v-for="{ icon, title, description } in featureList"
				:key="title"
			>
				<Card class="h-full border-0 bg-background shadow-none">
					<CardHeader class="flex items-center justify-center">
						<div
							class="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10"
						>
							<component
								:is="iconMap[icon]"
								class="size-6 text-primary"
							/>
						</div>

						<CardTitle>
							{{ title }}
						</CardTitle>
					</CardHeader>

					<CardContent class="text-center text-muted-foreground">
						{{ description }}
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
</template>
