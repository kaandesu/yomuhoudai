<script setup lang="ts">
import { landing } from '@/config'
const { teamList, socialIcon, title, slogan } = landing.Team
</script>

<template>
	<section id="team" class="container py-24 sm:py-32 lg:w-[75%]">
		<div class="mb-8 text-center">
			<h2 class="mb-2 text-center text-lg tracking-wider text-primary">
				{{ title }}
			</h2>

			<h2 class="text-center text-3xl font-bold md:text-4xl">
				{{ slogan }}
			</h2>
		</div>

		<div
			class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
		>
			<Card
				v-for="{
					imageUrl,
					firstName,
					lastName,
					positions,
					socialNetworks,
				} in teamList"
				:key="imageUrl"
				class="group/hoverimg flex h-full flex-col overflow-hidden bg-muted/60 dark:bg-card"
			>
				<CardHeader class="gap-0 p-0">
					<div class="h-full overflow-hidden">
						<img
							:src="imageUrl"
							alt=""
							class="aspect-square size-full w-full object-cover saturate-0 transition-all duration-200 ease-linear group-hover/hoverimg:scale-[1.01] group-hover/hoverimg:saturate-100"
						/>
					</div>
					<CardTitle class="px-6 py-6 pb-4"
						>{{ firstName }}
						<span class="text-primary">{{ lastName }}</span>
					</CardTitle>
				</CardHeader>

				<CardContent
					v-for="(position, index) in positions"
					:key="index"
					:class="{
						'pb-0 text-muted-foreground': true,
						'pb-4': index === positions.length - 1,
					}"
				>
					{{ position
					}}<span v-if="index < positions.length - 1">,</span>
				</CardContent>

				<CardFooter class="mt-auto space-x-4">
					<a
						v-for="{ name, url } in socialNetworks"
						key="name"
						:href="url"
						target="_blank"
						class="transition-all hover:opacity-80"
						:aria-label="`Visit our ${name} page`"
					>
						<component :is="socialIcon(name)" />
					</a>
				</CardFooter>
			</Card>
		</div>
	</section>
</template>
