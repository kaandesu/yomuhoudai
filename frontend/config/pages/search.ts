import type { Page } from "~/types/config";
export const Search = ref<Page>({
  title: "Search",
  href: "/dashboard/search",
  uid: "dashboard-search",
  desc: "Search your books.",
  tourDesc: "Search your books.",
  icon: "ic:round-manage-search",
  parent: "dashboard",
});
