import type { Page } from "~/types/config";

import { Explore } from "./Explore";
import { Settings } from "./settings";
import { Tour } from "./tour";
import { Dashboard } from "./dashboard";
import { Manage } from "./manage";

export type PageId =
  | "dashboard"
  | "editors-choice"
  | "manage"
  | "explore"
  | "for-you"
  | "settings"
  | "tour";

export const pages: Page[] = [
  Dashboard.value,
  Explore.value,
  Manage.value,
  Settings.value,
  Tour.value,
];

export const pagesDict: Record<string, Ref<Page>> = {
  Dashboard,
  Explore,
  Manage,
  Settings,
  Tour,
};
