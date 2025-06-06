<script setup lang="ts">
import { landing } from '@/config'
const { HowItWorksList, title, slogan } = landing.HowItWorks
</script>

<template>
	<section id="features" class="container py-24 sm:py-32">
		<div class="mb-8 text-center">
			<h2 class="mb-2 text-center text-lg tracking-wider text-primary">
				{{ title }}
			</h2>

			<h2 class="text-center text-3xl font-bold md:text-4xl">
				{{ slogan }}
			</h2>
		</div>

		<div class="relative mx-auto lg:w-[80%]">
			<div
				v-for="(
					{ badgeTitle, title, description, image }, index
				) in HowItWorksList"
				:key="title"
				:class="[
					'mb-8 flex items-center',
					{ 'flex-row-reverse': index % 2 !== 0 },
				]"
			>
				<Card class="h-full border-0 bg-transparent shadow-none">
					<CardHeader>
						<div class="pb-4">
							<Badge>{{ badgeTitle }}</Badge>
						</div>

						<CardTitle>
							{{ title }}
						</CardTitle>
					</CardHeader>

					<CardContent class="w-[80%] text-muted-foreground">
						{{ description }}
					</CardContent>
				</Card>

				<img
					:src="image"
					:alt="`Image describing ${title} `"
					class="mx-auto w-[150px] md:w-[250px] lg:w-[300px]"
				/>
				<div
					:class="[
						'absolute right-0 -z-10 h-72 w-44 rounded-full bg-primary/15 blur-3xl dark:bg-primary/10 lg:h-80 lg:w-64',
						{
							'left-0': index % 2 !== 0,
						},
					]"
				></div>
			</div>
		</div>
	</section>
</template>
