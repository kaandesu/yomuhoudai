interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

export const testimonials = {
  title: "Testimonials",
  slogan: "Hear What Our 3+ Clients Say",
  reviewList: [
    {
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "My Friend #1",
      userName: "Avid Reader",
      comment:
        "Yomuhoudai makes tracking my books super easy. I never lose track of what I’m reading or what’s next!",
      rating: 5.0,
    },
    {
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      name: "My Mom",
      userName: "Book Enthusiast",
      comment:
        "I’ve tried many apps, but Yomuhoudai is the one I actually stick to. It’s simple and fun to use every day.",
      rating: 4.9,
    },
    {
      image: "https://randomuser.me/api/portraits/women/30.jpg",
      name: "My Friend #2",
      userName: "Casual Reader",
      comment:
        "I love the clean design and how easy it is to add new books. Yomuhoudai motivates me to read more often.",
      rating: 5.0,
    },
  ] as ReviewProps[],
};
