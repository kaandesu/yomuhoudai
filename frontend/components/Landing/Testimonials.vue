<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import { landing } from '@/config'
const { reviewList, title, slogan } = landing.Testimonials
</script>

<template>
	<section id="testimonials" class="container py-24 sm:py-32">
		<div class="mb-8 text-center">
			<h2 class="mb-2 text-center text-lg tracking-wider text-primary">
				{{ title }}
			</h2>

			<h2 class="mb-4 text-center text-3xl font-bold md:text-4xl">
				{{ slogan }}
			</h2>
		</div>

		<Carousel
			:opts="{
				align: 'start',
			}"
			class="relative mx-auto w-[80%] sm:w-[90%] lg:max-w-screen-xl"
		>
			<CarouselContent>
				<CarouselItem
					v-for="review in reviewList"
					:key="review.name"
					class="md:basis-1/2 lg:basis-1/3"
				>
					<Card class="bg-muted/50 dark:bg-card">
						<CardContent class="pb-0 pt-6">
							<div class="flex gap-1 pb-6">
								<Star
									class="size-4 fill-primary text-primary"
								/>
								<Star
									class="size-4 fill-primary text-primary"
								/>
								<Star
									class="size-4 fill-primary text-primary"
								/>
								<Star
									class="size-4 fill-primary text-primary"
								/>
								<Star
									class="size-4 fill-primary text-primary"
								/>
							</div>

							"{{ review.comment }}"
						</CardContent>

						<CardHeader>
							<div class="flex flex-row items-center gap-4">
								<Avatar>
									<AvatarImage
										src="https://www.radix-vue.com/logo.svg"
										alt="@radix-vue"
									/>
									<AvatarFallback>SV</AvatarFallback>
								</Avatar>

								<div class="flex flex-col">
									<CardTitle class="text-lg">{{
										review.name
									}}</CardTitle>
									<CardDescription>{{
										review.userName
									}}</CardDescription>
								</div>
							</div>
						</CardHeader>
					</Card>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	</section>
</template>
