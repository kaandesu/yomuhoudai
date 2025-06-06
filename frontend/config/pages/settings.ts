import type { Page } from "~/types/config";
export const Settings = ref<Page>({
  title: "Settings",
  uid: "dashboard-settings",
  label: "",
  desc: "Manage your settings and  preferences.",
  href: "/dashboard/settings",
  tourDesc: "Customize your preferences and  settings.",
  icon: "mdi:cog-outline",
  parent: "dashboard",
});
