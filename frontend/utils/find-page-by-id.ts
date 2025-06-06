import { pages } from "~/config/pages";
import type { Page } from "~/types/config";

export default function (id: string): Page | undefined {
  return pages.find((p) => p.uid === id);
}
