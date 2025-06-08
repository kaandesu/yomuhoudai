<script setup lang="ts">
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-vue-next";
import { landing } from "@/config";
const { badge, slogan, desc, button, image } = landing.Hero;
const mode = useColorMode();
</script>

<template>
  <section class="px-6">
    <div
      class="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl"
    >
      <div class="space-y-8 text-center">
        <Badge variant="outline" class="py-2 text-sm">
          <span class="mr-2 text-primary">
            <Badge>{{ badge.label }}</Badge>
          </span>
          <span> {{ badge.value }} </span>
        </Badge>

        <div
          class="mx-auto max-w-screen-md text-center text-5xl font-bold md:text-6xl"
        >
          <h1>
            {{ slogan[0] }}
            <span
              class="bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text text-transparent"
            >
              {{ slogan[1] }}
            </span>
            {{ slogan[2] }}
          </h1>
        </div>

        <p class="mx-auto max-w-screen-sm text-xl text-muted-foreground">
          {{ desc }}
        </p>

        <div class="space-y-4 md:space-x-4 md:space-y-0">
          <NuxtLink
            :to="button.primary.link"
            :class="cn(buttonVariants({ variant: 'default' }))"
            class="w-5/6 font-bold md:w-1/4"
          >
            {{ button.primary.label }}
            <ArrowRight
              class="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1"
            />
          </NuxtLink>

          <Button as-child variant="secondary" class="w-5/6 font-bold md:w-1/4">
            <a :href="button.secondary.link" target="_blank">
              {{ button.secondary.label }}
            </a>
          </Button>
        </div>
      </div>

      <div class="group relative mt-14">
        <!-- gradient shadow -->
        <div
          class="img-shadow-animation absolute -top-6 right-12 h-12 w-[90%] rounded-full bg-primary/50 blur-3xl lg:h-[80%]"
        ></div>

        <img
          class="rouded-lg img-border-animation relative mx-auto flex w-full items-center rounded-lg border border-t-2 border-t-primary/30 leading-none md:w-[1200px]"
          :src="mode.value == 'light' ? image.light : image.dark"
          alt="books"
        />

        <!-- gradient effect img -->
        <div
          class="absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.img-shadow-animation {
  animation-name: img-shadow-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

.img-border-animation {
  animation-name: img-border-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

@keyframes img-shadow-animation {
  from {
    opacity: 0.5;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes img-border-animation {
  from {
    border-top-color: hsl(var(--primary) / 0.1);
  }

  to {
    border-top-color: hsl(var(--primary) / 0.6);
  }
}
</style>
