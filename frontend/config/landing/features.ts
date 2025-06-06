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
  slogan: "What Makes Us Different",
  desc: `
    Yomuhoudai offers a unique set of features designed to make tracking your reading effortless, fun, and productive.
    Discover why readers love using our app every day.
  `,
  featureList: [
    {
      icon: "tabletSmartphone",
      title: "Mobile Friendly",
      description:
        "Access your reading list anytime, anywhere, with a fully responsive design optimized for all devices.",
    },
    {
      icon: "badgeCheck",
      title: "Progress Tracking",
      description:
        "Keep tabs on your reading goals with easy-to-use progress indicators and milestones.",
    },
    {
      icon: "goal",
      title: "Personalized Recommendations",
      description:
        "Get book suggestions tailored to your interests based on your reading history and preferences.",
    },
    {
      icon: "pictureInPicture",
      title: "Clean & Intuitive Interface",
      description:
        "Navigate your library effortlessly with a sleek, user-friendly design that puts your books front and center.",
    },
    {
      icon: "mousePointerClick",
      title: "Quick Book Addition",
      description:
        "Add new books to your list with just a few clicks or taps, making it easy to update on the go.",
    },
    {
      icon: "newspaper",
      title: "Reading Insights",
      description:
        "Receive detailed reports and summaries about your reading habits to help you improve and enjoy more.",
    },
  ] as FeaturesProps[],
  iconMap: {
    tabletSmartphone: TabletSmartphone,
    badgeCheck: BadgeCheck,
    goal: Goal,
    pictureInPicture: PictureInPicture,
    paintbrush: Paintbrush,
    mousePointerClick: MousePointerClick,
    messageCircle: MessageCircle,
    newspaper: Newspaper,
  } as Record<string, HTMLElement>,
};
