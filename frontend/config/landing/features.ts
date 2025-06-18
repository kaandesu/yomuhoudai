import {
  Paintbrush,
  MessageCircle,
  TabletSmartphone,
  BadgeCheck,
  Goal,
  PictureInPicture,
  MousePointerClick,
  Newspaper,
} from "lucide-vue-next";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

export const features = {
  title: "Features",
  slogan: "What Makes Yomuhoudai Stand Out",
  desc: `
    Yomuhoudai brings together powerful tools to make your reading journey seamless, enjoyable, and productive.
    See why readers choose us daily to track, explore, and grow their reading habits.
  `,
  featureList: [
    {
      icon: "tabletSmartphone",
      title: "Mobile Ready",
      description:
        "Enjoy full access to your library on any device, with a responsive design optimized for phones, tablets, and desktops.",
    },
    {
      icon: "quickBookAddition",
      title: "Fast Book Addition",
      description:
        "Easily add books to your list with minimal effort—just a few clicks or taps to keep your collection updated anytime.",
    },
    {
      icon: "badgeCheck",
      title: "Goal & Progress Tracking",
      description:
        "Set reading goals and monitor your progress with intuitive indicators and milestone achievements.",
    },
  ] as FeaturesProps[],
  iconMap: {
    tabletSmartphone: TabletSmartphone,
    mousePointerClick: MousePointerClick,
    badgeCheck: BadgeCheck,
    goal: Goal,
    newspaper: Newspaper,
    pictureInPicture: PictureInPicture,
    paintbrush: Paintbrush,
    messageCircle: MessageCircle,
  } as Record<string, HTMLElement>,
};
