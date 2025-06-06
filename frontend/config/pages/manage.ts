import type { Page } from "~/types/config";
export const Manage = ref<Page>({
  title: "Manage",
  uid: "dashboard-manage",
  label: "",
  desc: "Manage your books.",
  href: "/dashboard/manage",
  tourDesc: "Manage your books.",
  icon: "material-symbols-light:table-edit-outline",
  parent: "dashboard",
});
