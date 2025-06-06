import { defineStore } from "pinia";
import type { DashboardConfig } from "@/types/config";
import { pagesDict as p } from "@/config/pages";

/* NOTE: Configuration about the general state of the webapp */
export const useConfigStore = defineStore(
  "ConfigStore",
  () => {
    const sidebar = ref<DashboardConfig>({
      title: "Yomuhoudai",
      desc: "Track your reading progress",
      logo: "https://avatar.vercel.sh/32.svg",
      logoFallback: "K",
      pages: [p.Dashboard.value, p.Tour.value, p.Settings.value],
    });

    return {
      sidebar,
    };
  },
  {
    persist: [
      {
        pick: [""],
        storage: sessionStorage,
      },
    ],
  },
);
