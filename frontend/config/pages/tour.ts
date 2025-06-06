import type { Page } from "~/types/config";
// TODO: use shephard.js to cretea predefined intro tour
// in a store and start it from here!
// note: don't know if this works on mobile, maybe disable(?) for mobile
export const Tour = ref<Page>({
  title: "How to use?",
  uid: "tour",
  action: () => {
    console.log("i hope i'll have enough time to implement this");
  },
  icon: "streamline:computer-desktop-help-device-help-information-display-computer-desktop-question-info",
});
