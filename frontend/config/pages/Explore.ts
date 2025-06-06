import type { Page } from "~/types/config";

export const Explore = ref<Page>({
  title: "Explore",
  href: "/dashboard/explore",
  uid: "dashboard-explore",
  desc: "Explore ai-powered suggestions based on your profile.",
  tourDesc: "Explore book suggestions based on your profile.",
  icon: "material-symbols:book-4-spark-outline",
  parent: "dashboard",
});
