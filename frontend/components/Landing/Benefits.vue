<script setup lang="ts">
import { landing } from '@/config'
const { benefitList, iconMap, title, slogan, desc } = landing.Benefits
</script>

<template>
	<section id="benefits" class="container py-24 sm:py-32">
		<div class="grid place-items-center lg:grid-cols-2 lg:gap-24">
			<div>
				<h2 class="mb-2 text-lg tracking-wider text-primary">
					{{ title }}
				</h2>

				<h2 class="mb-4 text-3xl font-bold md:text-4xl">
					{{ slogan }}
				</h2>
				<p class="mb-8 text-xl text-muted-foreground">
					{{ desc }}
				</p>
			</div>

			<div class="grid w-full gap-4 lg:grid-cols-2">
				<Card
					v-for="({ icon, title, description }, index) in benefitList"
					:key="title"
					class="group/number bg-muted/50 transition-all delay-75 hover:bg-background dark:bg-card dark:hover:bg-background"
				>
					<CardHeader>
						<div class="flex justify-between">
							<component
								class="mb-6 size-8 text-primary"
								:is="iconMap[icon]"
							/>

							<span
								class="text-5xl font-medium text-muted-foreground/15 transition-all delay-75 group-hover/number:text-muted-foreground/30"
								>0{{ index + 1 }}</span
							>
						</div>

						<CardTitle>{{ title }}</CardTitle>
					</CardHeader>

					<CardContent class="text-muted-foreground">
						{{ description }}
					</CardContent>
				</Card>
			</div>
		</div>
	</section>
</template>
