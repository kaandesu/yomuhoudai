import { defineStore } from "pinia";

export type Book = {
  id: number;
  title: string;
  author: string;
  cover?: string;
  currentPage?: string;
  description?: string;
  categories?: string[];
  pageCount?: string;
  language?: string;
  publisher?: string;
  publishedDate?: string;
  averageRating?: string;
  ratingsCount?: string;
  added?: boolean;
  status?: "completed" | "ongoing" | "on-hold" | "plan-to-read" | "dropped";
};

interface BookResponse {
  code: number;
  data: Book | null;
  message?: string;
}

type BooksResponse = {
  code: number;
  data: Book[];
  message?: string;
};

type Callbacks = {
  onSuccess?: (...args: unknown[]) => unknown;
  onError?: (...args: unknown[]) => unknown;
};

export type Route =
  | `/v1/books`
  | `/v1/books/${number}`
  | `/v1/books/search/title`
  | `/v1/books/search/author`
  | `/v1/books/export/csv/${string}/${string | undefined}`
  | `/v1/books/export/xml/${string}/${string | undefined}`;

const backendUrl = "http://localhost:80/api";

export const useLibrary = defineStore(
  "Library",
  () => {
    const books = ref<Book[]>([]);

    const loading = ref<boolean>(false);

    const getBooks = async ({ onSuccess, onError }: Callbacks = {}) => {
      loading.value = true;
      const { data } = await useFetch<BooksResponse>("/api/v1/books", {
        server: false,
      });

      loading.value = false;
      if (data.value != null) {
        books.value = data.value.data;
      }

      if (
        data.value?.code &&
        data.value?.code >= 200 &&
        data.value?.code < 300
      ) {
        if (onSuccess) onSuccess(data.value);
      } else {
        if (onError) onError(data.value);
      }
    };

    const getBookById = async ({
      id,
      onSuccess,
      onError,
    }: { id: number } & Callbacks) => {
      const { data, pending } = await useFetch<BookResponse>(
        `/v1/books/${id}`,
        {
          method: "GET",
          headers: {},
        },
      );

      loading.value = pending.value;

      if (
        data.value?.code &&
        data.value?.code >= 200 &&
        data.value?.code < 300
      ) {
        if (onSuccess) onSuccess(data.value);
      } else {
        if (onError) onError(data.value);
      }
    };

    const createBook = async ({
      book,
      onSuccess,
      onError,
    }: { book: Omit<Book, "id"> } & Callbacks) => {
      const { data, pending } = await useFetch<BookResponse>(
        backendUrl + "/v1/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        },
      );

      loading.value = pending.value;

      if (
        data.value?.code &&
        data.value?.code >= 200 &&
        data.value?.code < 300
      ) {
        if (onSuccess) onSuccess(data.value);
      } else {
        if (onError) onError(data.value);
      }
    };

    const updateBook = async ({
      id,
      book,
      onSuccess,
      onError,
    }: { id: number; book: Partial<Omit<Book, "id">> } & Callbacks) => {
      const { data, pending } = await useFetch<BookResponse>(
        `/v1/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        },
      );

      loading.value = pending.value;

      if (
        data.value?.code &&
        data.value?.code >= 200 &&
        data.value?.code < 300
      ) {
        if (onSuccess) onSuccess(data.value);
      } else {
        if (onError) onError(data.value);
      }
    };

    const deleteBook = async ({
      id,
      onSuccess,
      onError,
    }: { id: number } & Callbacks) => {
      loading.value = true;

      const { data } = await useFetch<{
        code: number;
        message?: string;
      }>(`/api/v1/books/${id}`, {
        method: "DELETE",
        server: false,
      });

      loading.value = false;

      if (
        data.value?.code &&
        data.value?.code >= 200 &&
        data.value?.code < 300
      ) {
        await getBooks();
        if (onSuccess) onSuccess();
      } else {
        if (onError) onError(data.value?.code ?? -1, data.value?.message);
      }
    };

    const searchBooksByTitle = async ({
      title,
      onSuccess,
      onError,
    }: { title: string } & Callbacks) => {
      // TODO: how do i do the search: 100% frontend or 100% backend, or is there a hybrid solution
      const query = encodeURIComponent(title);
      loading.value = true;
      const { data } = await useFetch<BooksResponse>(
        `/v1/books/search/title?title=${query}`,
        {
          method: "GET",
          headers: {},
        },
      );

      loading.value = false;

      if (
        data.value?.code &&
        data.value?.code >= 200 &&
        data.value?.code < 300
      ) {
        if (onSuccess) onSuccess(data.value);
      } else {
        if (onError) onError(data.value);
      }
    };

    const searchBooksByAuthor = async ({
      author,
      onSuccess,
      onError,
    }: { author: string } & Callbacks) => {
      const query = encodeURIComponent(author);
      const { data, pending } = await useFetch<BooksResponse>(
        `/v1/books/search/author?author=${query}`,
        {
          method: "GET",
          headers: {},
        },
      );

      loading.value = pending.value;

      if (data.value != null) {
        if (onSuccess) onSuccess(data.value);
      } else {
        if (onError) onError(data.value);
      }
    };

    return {
      loading,
      books,
      getBooks,
      getBookById,
      createBook,
      updateBook,
      deleteBook,
      searchBooksByTitle,
      searchBooksByAuthor,
    };
  },
  {
    persist: {
      // TODO: uncomment
      // paths: ["books"],
    },
  },
);
