import type { Page } from "~/types/config";

import { Explore } from "./Explore";
import { Settings } from "./settings";
import { Tour } from "./tour";
import { Dashboard } from "./dashboard";
import { Search } from "./search";

export const pages: Page[] = [
  Dashboard.value,
  Explore.value,
  Search.value,
  Settings.value,
  Tour.value,
];

export const pagesDict: Record<string, Ref<Page>> = {
  Dashboard,
  Explore,
  Search,
  Settings,
  Tour,
};
