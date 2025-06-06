interface HowItWorksProps {
  badgeTitle: string;
  title: string;
  description: string;
  image: string;
}

export const howitworks = {
  title: "How It Works",
  slogan: "Step-by-Step Process",
  HowItWorksList: [
    {
      badgeTitle: "Add Books",
      title: "Easily Add Books to Your Library",
      description:
        "Search or manually add your favorite books to your personal library with just a few clicks.",
      image: "https://picsum.photos/200",
    },
    {
      badgeTitle: "Track Progress",
      title: "Monitor Your Reading Journey",
      description:
        "Update your reading status, mark pages read, and watch your progress grow over time.",
      image: "https://picsum.photos/201",
    },
    {
      badgeTitle: "Get Recommendations",
      title: "Discover Books Tailored to You",
      description:
        "Receive personalized book suggestions based on your reading history and preferences.",
      image: "https://picsum.photos/202",
    },
    {
      badgeTitle: "Share & Connect",
      title: "Share Your Journey with Friends",
      description:
        "Show off your reading milestones and connect with friends to exchange book ideas.",
      image: "https://picsum.photos/203",
    },
  ] as HowItWorksProps[],
};
