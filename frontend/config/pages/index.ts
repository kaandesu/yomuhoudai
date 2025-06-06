import type { Page } from "~/types/config";

/* NOTE:
 * I added some pages but i don't have a
 * clear idea yet so they are likely to change
 * once i do
 * */
import { Explore } from "./Explore";
import { Settings } from "./settings";
import { Tour } from "./tour";

export type PageId =
  | "editors-choice"
  | "explore"
  | "for-you"
  | "settings"
  | "tour";

export const pages: Page[] = [Explore.value, Settings.value, Tour.value];

export const pagesDict: Record<string, Ref<Page>> = {
  Explore,
  Settings,
  Tour,
};
