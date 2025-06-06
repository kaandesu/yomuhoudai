import {
  Sparkle,
  Tag,
  Paintbrush,
  Blocks,
  LineChart,
  Wallet,
} from "lucide-vue-next";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

export const benefits = {
  title: "Benefits",
  slogan: "Your Shortcut to Success",
  desc: `
    Yomuhoudai helps you stay organized, motivated, and on top of your reading goals.
    Whether you’re a casual reader or a bookworm, these benefits make your reading journey smoother and more enjoyable.
  `,
  benefitList: [
    {
      icon: "blocks",
      title: "Stay Organized",
      description:
        "Easily track all your books in one place, so you never lose sight of your reading progress or upcoming titles.",
    },
    {
      icon: "lineChart",
      title: "Track Your Progress",
      description:
        "Visualize your reading habits and milestones with simple stats to keep yourself motivated and consistent.",
    },
    {
      icon: "wallet",
      title: "Save Time",
      description:
        "Quickly add books and manage your lists with a clean, user-friendly interface that saves you time and hassle.",
    },
    {
      icon: "sparkle",
      title: "Discover New Books",
      description:
        "Get inspired with personalized recommendations and discover new authors and genres tailored to your taste.",
    },
  ] as BenefitsProps[],
  iconMap: {
    sparkle: Sparkle,
    tag: Tag,
    paintbrush: Paintbrush,
    blocks: Blocks,
    lineChart: LineChart,
    wallet: Wallet,
  } as Record<string, HTMLElement>,
};
