import { image, tailwindcss, viewport, i18n } from "./config/";

const isDevMode = process.env.DEV_MODE === "true";
const apiBaseUrl = isDevMode
  ? "http://127.0.0.1:1234"
  : "https://api.yomuhoudai.club";

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
    server: {
      allowedHosts: true,
    },
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
    "/api/**": {
      proxy: {
        to: `${apiBaseUrl}/api/**`,
      },
    },
    "/api/v1/books/**": {
      proxy: {
        to: `${apiBaseUrl}/api/v1/books/**`,
      },
    },
    "/api/v1/**": {
      proxy: {
        to: `${apiBaseUrl}/api/v1/**`,
      },
    },
  },
});
