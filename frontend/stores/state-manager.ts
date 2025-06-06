import { defineStore } from "pinia";
import type { Page } from "@/types/config";
import { pagesDict as pages } from "@/config/pages";

export const theme = "yellow";

export const useStateManager = defineStore(
  "AppStateStore",
  () => {
    const navState = ref<Record<"open" | "collapsed", boolean>>({
      open: false,
      collapsed: false,
    });

    const apikeys = ref<Record<"gpt", string>>({ gpt: "" });

    const loadingPage = ref<boolean>(false);

    const currentPageInfo = ref<Page>({ uid: "" });

    const findPage = (id: string): Page | false => {
      const keys = Object.keys(pages);
      const pgs: Record<string, Ref<Page>> = pages;
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (pgs[key].value.uid == id) {
          return pgs[key].value;
        }
      }
      return false;
    };

    const updateActivePage = (id: string): Page => {
      let page: Page | boolean = findPage(id);
      currentPageInfo.value = page ? page : { uid: id };
      return currentPageInfo.value;
    };

    const navigatePage = async (page: Page) => {
      loadingPage.value = true;
      updateActivePage(page.uid!);
      await navigateTo(page.href!).then(() => {
        loadingPage.value = false;
      });
    };

    const navigatePageById = async (id: string) => {
      const page = updateActivePage(id);
      await navigateTo(page.href!).then(() => {
        loadingPage.value = false;
      });
    };

    return {
      currentPageInfo,
      updateActivePage,
      navigatePage,
      navState,
      navigatePageById,
      loadingPage,
      apikeys,
    };
  },
  {
    persist: {
      paths: ["navState", "apikeys"],
    },
  },
);
