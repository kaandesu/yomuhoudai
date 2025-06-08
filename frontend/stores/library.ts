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
  publishedDate?: string;
  averageRating?: string;
  added?: boolean;
  status?: "completed" | "ongoing" | "on-hold" | "plan-to-read" | "dropped";
};

interface BookResponse {
  code: number;
  data: Book | null;
  message?: string;
}

interface ApiResponseGeneric<T> {
  code?: number;
  data?: T | null;
  message?: string;
}

type BooksResponse = {
  code: number;
  data: Book[];
  message?: string;
};

type Callbacks = {
  onSuccess?: (data?: unknown) => unknown;
  onError?: (error?: unknown) => unknown;
};

export type Route =
  | `/api/v1/books`
  | `/api/v1/books/${number}`
  | `/api/v1/books/search/title`
  | `/api/v1/books/search/author`
  | `/api/v1/books/export/csv/${string}/${string | undefined}`
  | `/api/v1/books/export/xml/${string}/${string | undefined}`;

export const useLibrary = defineStore(
  "Library",
  () => {
    const books = ref<Book[]>([]);
    const loading = ref(false);

    const getBooks = async ({ onSuccess, onError }: Callbacks = {}) => {
      loading.value = true;
      const route: Route = `/api/v1/books`;
      const { data, error, status } = await useFetch<BooksResponse>(
        `${route}`,
        { method: "GET" },
      );
      loading.value = false;

      if (status.value === "success" && !error.value && data.value != null) {
        books.value = data.value?.data ?? [];
        createToast({
          message: "Books loaded successfully",
          toastOps: {
            description: data.value?.message ?? "",
          },
          type: "success",
        })();
        onSuccess?.(data.value?.data);
      } else {
        createToast({
          message: "Failed to load books",
          toastOps: {
            description: error.value?.statusMessage ?? "Unknown error",
          },
          type: "error",
        })();
        onError?.(error.value?.statusMessage ?? "Failed to fetch books");
      }
    };

    const getBookById = async ({
      id,
      onSuccess,
      onError,
    }: { id: number } & Callbacks) => {
      loading.value = true;
      const route: Route = `/api/v1/books/${id}`;
      const { data, error, status } = await useFetch<BookResponse>(`${route}`, {
        method: "GET",
      });
      loading.value = false;

      if (status.value === "success" && !error.value) {
        createToast({
          message: "Book loaded successfully",
          toastOps: {
            description: data.value?.message ?? "",
          },
          type: "success",
        })();
        onSuccess?.(data.value?.data);
      } else {
        createToast({
          message: `Failed to load book with id ${id}`,
          toastOps: {
            description: error.value ?? `Error fetching book with id ${id}`,
          },
          type: "error",
        })();
        onError?.(error.value ?? `Failed to fetch book with id ${id}`);
      }
    };

    // NOTE: after the creation it will return the created book object
    // then we will push it to the 'books'
    const createBook = async ({
      book,
      onSuccess,
      onError,
    }: { book: Omit<Book, "id"> } & Callbacks) => {
      loading.value = true;
      const route: Route = "/api/v1/books";
      const { data, error, status } = await useFetch<BookResponse>(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      loading.value = false;

      if (
        status.value === "success" &&
        !error.value &&
        data.value?.data != null
      ) {
        createToast({
          message: "Book created successfully",
          toastOps: {
            description: data.value?.message ?? "",
          },
          type: "success",
        })();
        books.value.push(data.value.data);
        onSuccess?.(data.value?.data);
      } else {
        createToast({
          message: "Failed to create book",
          toastOps: {
            description:
              data.value && data.value.message
                ? data.value.message
                : (error.value?.statusMessage ?? `Unknown error`),
          },
          type: "error",
        })();
        onError?.(error.value ?? "Failed to create book");
      }
    };

    const updateBook = async ({
      id,
      book,
      onSuccess,
      onError,
    }: { id: number; book: Partial<Omit<Book, "id">> } & Callbacks) => {
      loading.value = true;
      const route: Route = `/api/v1/books/${id}`;
      const { data, error, status } = await useFetch<BookResponse>(`${route}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      loading.value = false;

      if (status.value === "success" && !error.value) {
        createToast({
          message: "Book updated successfully",
          toastOps: {
            description: data.value?.message ?? "",
          },
          type: "success",
        })();
        onSuccess?.(data.value?.data);
      } else {
        createToast({
          message: `Failed to update book with id ${id}`,
          toastOps: {
            description:
              data.value && data.value.message
                ? data.value.message
                : (error.value?.statusMessage ?? `Unknown error`),
          },
          type: "error",
        })();
        onError?.(error.value ?? `Failed to update book with id ${id}`);
      }
    };

    const deleteBook = async ({
      id,
      onSuccess,
      onError,
    }: { id: number } & Callbacks) => {
      loading.value = true;
      const route: Route = `/api/v1/books/${id}`;
      const { data, error, status } = await useFetch<ApiResponseGeneric<any>>(
        `${route}`,
        {
          method: "DELETE",
        },
      );
      loading.value = false;

      if (status.value === "success" && !error.value) {
        createToast({
          message: "Book deleted successfully",
          toastOps: { description: "" },
          type: "success",
        })();
        // NOTE: instead of fetching immediately after
        // since we know its 'success' we can directly remove
        // from the local version.
        const index = books.value.findIndex((b) => b.id === id);
        if (index !== -1) {
          books.value.splice(index, 1);
        }
        onSuccess?.(data.value);
      } else {
        createToast({
          message: `Failed to delete ${books.value.find((b) => b.id == id)?.title}`,
          toastOps: {
            description:
              data.value && data.value.message
                ? data.value.message
                : (error.value?.statusMessage ??
                  `Error deleting book with id ${id}`),
          },
          type: "error",
        })();
        onError?.(error.value ?? `Failed to delete book with id ${id}`);
      }
    };

    const searchBooksByTitle = async ({
      title,
      onSuccess,
      onError,
    }: { title: string } & Callbacks) => {
      loading.value = true;
      const route: Route = `/api/v1/books/search/title`;
      const { data, error, status } = await useFetch<BooksResponse>(
        `${route}?q=${encodeURIComponent(title)}`,
        { method: "GET" },
      );
      loading.value = false;

      if (status.value === "success" && !error.value) {
        createToast({
          message: "Books found by title",
          toastOps: {
            description: data.value?.message ?? "",
          },
          type: "success",
        })();
        onSuccess?.(data.value?.data);
      } else {
        createToast({
          message: "Failed to search books by title",
          toastOps: {
            description: error.value ?? "Unknown error",
          },
          type: "error",
        })();
        onError?.(error.value ?? "Failed to search books by title");
      }
    };

    const searchBooksByAuthor = async ({
      author,
      onSuccess,
      onError,
    }: { author: string } & Callbacks) => {
      loading.value = true;
      const route: Route = `/api/v1/books/search/author`;
      const { data, error, status } = await useFetch<BooksResponse>(
        `${route}?q=${encodeURIComponent(author)}`,
        { method: "GET" },
      );
      loading.value = false;

      if (status.value === "success" && !error.value) {
        createToast({
          message: "Books found by author",
          toastOps: {
            description: data.value?.message ?? "",
          },
          type: "success",
        })();
        onSuccess?.(data.value?.data);
      } else {
        createToast({
          message: "Failed to search books by author",
          toastOps: {
            description: error.value ?? "Unknown error",
          },
          type: "error",
        })();
        onError?.(error.value ?? "Failed to search books by author");
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
      // paths: ['books'], // TODO: Uncomment if needed
    },
  },
);
