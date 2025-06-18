import {
  Sparkle,
  FileSearch2,
  Paintbrush,
  Blocks,
  LineChart,
  CloudDownload,
} from "lucide-vue-next";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

export const benefits = {
  title: "Why Yomuhoudai?",
  slogan: "Your Reading Companion, Simplified",
  desc: `
    Yomuhoudai helps you effortlessly organize, track, and manage your reading.
    Search your books, track your current page, filter lists, and download your collection anytime.
  `,
  benefitList: [
    {
      icon: "blocks",
      title: "Organize Your Books",
      description:
        "Keep all your books and reading statuses organized in one place for easy access and updates.",
    },
    {
      icon: "lineChart",
      title: "Track Your Progress",
      description:
        "Log your current page to always know where you left off and keep your reading on track.",
    },
    {
      icon: "fileSearch2",
      title: "Search & Filter",
      description:
        "Quickly find any book with search and filter options that help you manage your reading list effectively.",
    },
    {
      icon: "cloudDownload",
      title: "Download Your List",
      description:
        "Export your reading collection to keep backups or share your progress with friends.",
    },
  ] as BenefitsProps[],
  iconMap: {
    sparkle: Sparkle,
    fileSearch2: FileSearch2,
    paintbrush: Paintbrush,
    blocks: Blocks,
    lineChart: LineChart,
    cloudDownload: CloudDownload,
  } as Record<string, HTMLElement>,
};
