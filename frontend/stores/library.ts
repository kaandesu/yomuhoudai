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
  rating?: string;
  added?: boolean;
  status?: "completed" | "ongoing" | "on-hold" | "plan-to-read" | "dropped";
};

export type BookPayload = Omit<Book, "rating" | "added" | "id" | "status">;

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
  onSuccess?: (data?: any) => any;
  onError?: (error?: any) => any;
};

const isDevMode = process.env.DEV_MODE === "true";
const apiBaseUrl = isDevMode
  ? "http://127.0.0.1:1234"
  : "https://laravel.yomuhoudai.club";

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
    const suggestions = ref<Book[]>([]);
    const loading = ref(false);

    const getBooks = () => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          books.value = response._data.data ?? [];
          if (books.value.length > 0) {
            createToast({
              message: "Books loaded successfully",
              toastOps: {
                description: response._data.data?.message ?? "",
              },
              type: "success",
            })();
          }
        },
        onResponseError({ response }) {
          createToast({
            message: "Failed to load books",
            toastOps: {
              description: response._data?.message ?? "Unknown error",
            },
            type: "error",
          })();
        },
      });

      return fetcher<BooksResponse>("/api/v1/books", {
        method: "GET",
      });
    };

    const getBookById = ({
      id,
      onSuccess,
      onError,
    }: { id: number } & Callbacks) => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          createToast({
            message: "Book loaded successfully",
            toastOps: {
              description: response._data?.message ?? "",
            },
            type: "success",
          })();
          onSuccess?.(response._data?.data);
        },
        onResponseError({ response }) {
          createToast({
            message: `Failed to load book with id ${id}`,
            toastOps: {
              description: response._data?.message ?? "Unknown error",
            },
            type: "error",
          })();
          onError?.(
            response._data?.message ?? `Error loading book with id ${id}`,
          );
        },
      });

      loading.value = true;
      return fetcher<BookResponse>(`/api/v1/books/${id}`, {
        method: "GET",
      }).finally(() => {
        loading.value = false;
      });
    };

    const createBook = async ({
      book,
      onSuccess,
      onError,
    }: { book: Omit<Book, "id"> } & Callbacks) => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          if (!response.ok) return;
          createToast({
            message: "Book created successfully",
            toastOps: {
              description: response._data?.message ?? "",
            },
            type: "success",
          })();
          const newBook = response._data?.data;
          if (newBook) {
            books.value.push(newBook);
            onSuccess?.(newBook);
          }
        },
        onResponseError({ response }) {
          createToast({
            message: "Failed to create book",
            toastOps: {
              description: response._data?.message ?? "Unknown error",
            },
            type: "error",
          })();
          onError?.(response._data?.message ?? "Failed to create book");
        },
      });

      loading.value = true;
      return fetcher<BookResponse>("/api/v1/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: book,
      }).finally(() => {
        loading.value = false;
      });
    };

    const updateBook = async ({
      id,
      book,
      onSuccess,
      onError,
    }: { id: number; book: Partial<Omit<Book, "id">> } & Callbacks) => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          createToast({
            message: "Book updated successfully",
            toastOps: {
              description: response._data?.message ?? "",
            },
            type: "success",
          })();
          onSuccess?.(response._data?.data);
        },
        onResponseError({ response }) {
          createToast({
            message: `Failed to update book with id ${id}`,
            toastOps: {
              description: response._data?.message ?? "Unknown error",
            },
            type: "error",
          })();
          onError?.(
            response._data?.message ?? `Failed to update book with id ${id}`,
          );
        },
      });

      loading.value = true;
      return fetcher<BookResponse>(`/api/v1/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: book,
      }).finally(() => {
        loading.value = false;
      });
    };

    const deleteBook = async ({
      id,
      onSuccess,
      onError,
    }: { id: number } & Callbacks) => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          createToast({
            message: "Book deleted successfully",
            toastOps: { description: response._data?.message ?? "" },
            type: "success",
          })();

          const index = books.value.findIndex((b) => b.id === id);
          if (index !== -1) books.value.splice(index, 1);
          onSuccess?.(response._data);
        },
        onResponseError({ response }) {
          const title =
            books.value.find((b) => b.id === id)?.title ?? `book with id ${id}`;
          createToast({
            message: `Failed to delete ${title}`,
            toastOps: {
              description: response._data?.message ?? "Unknown error",
            },
            type: "error",
          })();
          onError?.(
            response._data?.message ?? `Failed to delete book with id ${id}`,
          );
        },
      });

      loading.value = true;
      return fetcher<ApiResponseGeneric<any>>(`/api/v1/books/${id}`, {
        method: "DELETE",
      }).finally(() => {
        loading.value = false;
      });
    };

    const searchBooksByTitle = async ({
      title,
      onSuccess,
      onError,
    }: { title: string } & Callbacks) => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          createToast({
            message: "Books found by title",
            toastOps: {
              description: response._data?.message ?? "",
            },
            type: "success",
          })();
          onSuccess?.(response._data?.data);
        },
        onResponseError({ response }) {
          createToast({
            message: "Failed to search books by title",
            toastOps: {
              description: response._data?.message ?? "Unknown error",
            },
            type: "error",
          })();
          onError?.(response._data?.message ?? "Search failed");
        },
      });

      loading.value = true;
      return fetcher<BooksResponse>(
        `/api/v1/books/search/title?q=${encodeURIComponent(title)}`,
        {
          method: "GET",
        },
      ).finally(() => {
        loading.value = false;
      });
    };

    const searchBooksByAuthor = async ({
      author,
      onSuccess,
      onError,
    }: { author: string } & Callbacks) => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          createToast({
            message: "Books found by author",
            toastOps: {
              description: response._data?.message ?? "",
            },
            type: "success",
          })();
          onSuccess?.(response._data?.data);
        },
        onResponseError({ response }) {
          createToast({
            message: "Failed to search books by author",
            toastOps: {
              description: response._data?.message ?? "Unknown error",
            },
            type: "error",
          })();
          onError?.(response._data?.message ?? "Search failed");
        },
      });

      loading.value = true;
      return fetcher<BooksResponse>(
        `/api/v1/books/search/author?q=${encodeURIComponent(author)}`,
        {
          method: "GET",
        },
      ).finally(() => {
        loading.value = false;
      });
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
      suggestions,
      searchBooksByAuthor,
    };
  },
  {
    persist: {
      // paths: ['books'], // TODO: Uncomment if needed
    },
  },
);
