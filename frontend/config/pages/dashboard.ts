import { Explore } from "./Explore";
import { Settings } from "./settings";
import type { Page } from "~/types/config";
export const Dashboard = ref<Page>({
  title: "Overview",
  label: "",
  href: "/dashboard",
  uid: "dashboard",
  icon: "material-symbols:dashboard-outline-rounded",
  isCollapsed: true,
  tourDesc: "Access your main overview and key metrics.",
  desc: "Access your main overview and key metrics.",
  tabs: [Explore.value, Settings.value],
});
