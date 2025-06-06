import { defineStore } from "pinia";

export type Book = {
  title: string;
  author: string;
  cover?: string;
  description?: string;
  categories?: string[];
  pageCount?: string;
  language?: string;
  publisher?: string;
  publishedDate?: string;
  averageRating?: string;
  ratingsCount?: string;
  added?: boolean;
  status: "completed" | "ongoing" | "on-hold" | "plan-to-read" | "dropped";
};

export const useLibrary = defineStore(
  "Library",
  () => {
    const books = ref<Book[]>([
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
        description:
          "A novel about the serious issues of rape and racial inequality.",
        categories: ["Fiction", "Classic"],
        pageCount: "324",
        language: "English",
        publisher: "J.B. Lippincott & Co.",
        publishedDate: "1960-07-11",
        averageRating: "4.28",
        ratingsCount: "4500000",
        added: true,
        status: "completed",
      },
      {
        title: "1984",
        author: "George Orwell",
        cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
        description:
          "Dystopian novel about totalitarian regime surveillance and control.",
        categories: ["Fiction", "Dystopian"],
        pageCount: "328",
        language: "English",
        publisher: "Secker & Warburg",
        publishedDate: "1949-06-08",
        averageRating: "4.18",
        ratingsCount: "3200000",
        added: true,
        status: "completed",
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover: "https://covers.openlibrary.org/b/id/7352167-L.jpg",
        description: "Classic novel of the American Jazz Age.",
        categories: ["Fiction", "Classic"],
        pageCount: "180",
        language: "English",
        publisher: "Charles Scribner's Sons",
        publishedDate: "1925-04-10",
        averageRating: "3.92",
        ratingsCount: "2900000",
        added: false,
        status: "plan-to-read",
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        description:
          "A story about adolescent alienation and loss of innocence.",
        categories: ["Fiction", "Classic"],
        pageCount: "277",
        language: "English",
        publisher: "Little, Brown and Company",
        publishedDate: "1951-07-16",
        averageRating: "3.81",
        ratingsCount: "2600000",
        added: true,
        status: "on-hold",
      },
      {
        title: "Brave New World",
        author: "Aldous Huxley",
        cover: "https://covers.openlibrary.org/b/id/8774150-L.jpg",
        description:
          "Dystopian novel envisioning a future of genetically engineered citizens.",
        categories: ["Fiction", "Dystopian"],
        pageCount: "311",
        language: "English",
        publisher: "Chatto & Windus",
        publishedDate: "1932-08-01",
        averageRating: "3.98",
        ratingsCount: "1600000",
        added: false,
        status: "plan-to-read",
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        cover: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
        description: "Fantasy novel about Bilbo Baggins' adventure.",
        categories: ["Fantasy", "Adventure"],
        pageCount: "310",
        language: "English",
        publisher: "George Allen & Unwin",
        publishedDate: "1937-09-21",
        averageRating: "4.27",
        ratingsCount: "2700000",
        added: true,
        status: "completed",
      },
      {
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        cover: "https://covers.openlibrary.org/b/id/9256890-L.jpg",
        description:
          "A dystopian novel about the burning of books and censorship.",
        categories: ["Fiction", "Dystopian"],
        pageCount: "194",
        language: "English",
        publisher: "Ballantine Books",
        publishedDate: "1953-10-19",
        averageRating: "3.99",
        ratingsCount: "1700000",
        added: false,
        status: "on-hold",
      },
      {
        title: "Moby-Dick",
        author: "Herman Melville",
        cover: "https://covers.openlibrary.org/b/id/8100921-L.jpg",
        description: "Epic tale of the voyage of the whaling ship Pequod.",
        categories: ["Fiction", "Classic"],
        pageCount: "635",
        language: "English",
        publisher: "Harper & Brothers",
        publishedDate: "1851-10-18",
        averageRating: "3.51",
        ratingsCount: "540000",
        added: false,
        status: "dropped",
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        cover: "https://covers.openlibrary.org/b/id/8231994-L.jpg",
        description:
          "A classic novel of manners, love, and society in early 19th century England.",
        categories: ["Fiction", "Romance", "Classic"],
        pageCount: "279",
        language: "English",
        publisher: "T. Egerton, Whitehall",
        publishedDate: "1813-01-28",
        averageRating: "4.26",
        ratingsCount: "2800000",
        added: true,
        status: "ongoing",
      },

      {
        title: "Jane Eyre",
        author: "Charlotte Brontë",
        cover: "https://covers.openlibrary.org/b/id/8225631-L.jpg",
        description:
          "A gothic novel following the life of the strong-willed Jane Eyre.",
        categories: ["Fiction", "Classic", "Romance"],
        pageCount: "500",
        language: "English",
        publisher: "Smith, Elder & Co.",
        publishedDate: "1847-10-16",
        averageRating: "4.12",
        ratingsCount: "1600000",
        added: false,
        status: "plan-to-read",
      },
      {
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        cover: "https://covers.openlibrary.org/b/id/8235082-L.jpg",
        description:
          "A psychological study of morality and redemption in imperial Russia.",
        categories: ["Fiction", "Classic", "Philosophical"],
        pageCount: "671",
        language: "English",
        publisher: "The Russian Messenger",
        publishedDate: "1866-01-01",
        averageRating: "4.21",
        ratingsCount: "850000",
        added: true,
        status: "completed",
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        cover: "https://covers.openlibrary.org/b/id/8101356-L.jpg",
        description:
          "A spiritual journey of a shepherd seeking his personal legend.",
        categories: ["Fiction", "Adventure", "Philosophical"],
        pageCount: "208",
        language: "English",
        publisher: "HarperOne",
        publishedDate: "1988-01-01",
        averageRating: "3.90",
        ratingsCount: "2400000",
        added: true,
        status: "completed",
      },
      {
        title: "The Book Thief",
        author: "Markus Zusak",
        cover: "https://covers.openlibrary.org/b/id/8281991-L.jpg",
        description: "A young girl's life in Nazi Germany, narrated by Death.",
        categories: ["Historical", "Fiction", "Young Adult"],
        pageCount: "552",
        language: "English",
        publisher: "Knopf Books for Young Readers",
        publishedDate: "2005-03-14",
        averageRating: "4.38",
        ratingsCount: "2100000",
        added: false,
        status: "plan-to-read",
      },
      {
        title: "Slaughterhouse-Five",
        author: "Kurt Vonnegut",
        cover: "https://covers.openlibrary.org/b/id/8235104-L.jpg",
        description: "A science fiction-infused anti-war novel.",
        categories: ["Fiction", "Science Fiction", "Classic"],
        pageCount: "275",
        language: "English",
        publisher: "Delacorte",
        publishedDate: "1969-03-31",
        averageRating: "4.09",
        ratingsCount: "1200000",
        added: false,
        status: "on-hold",
      },
    ]);

    return { books };
  },
  {
    persist: {
      paths: ["books"],
    },
  },
);
