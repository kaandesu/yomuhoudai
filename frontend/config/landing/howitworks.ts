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
      image: "./books.webp",
    },
    {
      badgeTitle: "Track Progress",
      title: "Monitor Your Reading Journey",
      description:
        "Update your reading status, mark pages read, and watch your progress grow over time.",
      image: "./change-status.webp",
    },
    {
      badgeTitle: "Get Recommendations",
      title: "Discover Books Tailored to You",
      description:
        "Receive personalized book suggestions based on your reading history and preferences.",
      image: "./explore.webp",
    },
    {
      badgeTitle: "Find your book",
      title: "Search & Sort ",
      description:
        "Search by title or author, sort results, paginate, and download them as needed.",
      image: "./search.webp",
    },
  ] as HowItWorksProps[],
};
