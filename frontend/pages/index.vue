<script setup lang="ts">
import { landing } from "@/config/landing";
const { Hero, Benefits, Features, HowItWorks, Testimonials, Team } = landing;
</script>
<template>
  <main class="absolute left-0 top-0 h-screen w-screen overflow-x-hidden">
    <LandingHero v-if="Hero != undefined" />
    <LandingBenefits v-if="Benefits != undefined" />
    <LandingFeatures v-if="Features != undefined" />
    <LandingHowItWorks v-if="HowItWorks != undefined" />
    <LandingTestimonials v-if="Testimonials != undefined" />
    <LandingTeam v-if="Team != undefined" />
  </main>
</template>
<style>
*,
*::before,
*::after {
  box-sizing: content-box;
}
</style>
