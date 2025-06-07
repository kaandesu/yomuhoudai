<script setup lang="ts">
import { landing } from "@/config/landing";
const { Hero, Benefits, Features, HowItWorks, Team } = landing;
</script>
<template>
  <main class="absolute left-0 top-0 h-screen w-screen overflow-x-hidden">
    <DarkButton class="right-12 top-6 absolute" />
    <LandingHero v-if="Hero != undefined" />
    <LandingBenefits v-if="Benefits != undefined" />
    <LandingFeatures v-if="Features != undefined" />
    <LandingHowItWorks v-if="HowItWorks != undefined" />
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
