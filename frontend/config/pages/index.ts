import type { Page } from "~/types/config";

/* NOTE:
 * I added some pages but i don't have a
 * clear idea yet so they are likely to change
 * once i do
 * */
import { EditorsChoice } from "./EditorsChoice";
import { Explore } from "./Explore";
import { Settings } from "./settings";
import { ForYou } from "./ForYou";
import { Tour } from "./tour";

export type PageId =
  | "editors-choice"
  | "explore"
  | "for-you"
  | "settings"
  | "tour";

export const pages: Page[] = [
  EditorsChoice.value,
  Explore.value,
  ForYou.value,
  Settings.value,
  Tour.value,
];

export const pagesDict: Record<string, Ref<Page>> = {
  EditorsChoice,
  Explore,
  ForYou,
  Settings,
  Tour,
};
