import { image, tailwindcss, viewport, i18n } from "./config/";
export default defineNuxtConfig({
  ssr: false,
  pages: true,
  modules: [
    "nuxt-typed-router",
    "@formkit/auto-animate/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    [
      "@nuxtjs/color-mode",
      {
        classSuffix: "",
        preference: "system",
      },
    ],
    ["@nuxt/image", image],
    "shadcn-nuxt",
    "nuxt-viewport",
    "@pinia/nuxt",
    [
      "pinia-plugin-persistedstate/nuxt",
      {
        storage: "localStorage",
      },
    ],
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
  ],
  i18n,
  viewport,
  colorMode: {
    classSuffix: "",
  },
  vite: {
    base: "",
    optimizeDeps: {
      exclude: ["vee-validate"],
    },
  },

  app: {
    baseURL: "",
    pageTransition: { name: "page", mode: "out-in" },
  },
  tailwindcss,
  css: ["shepherd.js/dist/css/shepherd.css", "~/assets/css/main.css"],
  devtools: { enabled: false },
  compatibilityDate: "2025-06-06",
  routeRules: {
    "/": { prerender: true },
  },
});

