import { defineStore } from "pinia";

export type Book = {
  id: number;
  title: string;
  author: string;
  cover?: string;
  currentPage?: number;
  description?: string;
  categories?: string[];
  pageCount?: number;
  publishedDate?: string;
  rating?: number;
  added?: boolean;
  status?: "completed" | "ongoing" | "on-hold" | "plan-to-read" | "dropped";
};

export type BookPayload = Omit<Book, "added" | "id">;

interface ExportPayload {
  type: "titles_and_authors" | "titles" | "authors";
  format: "csv" | "xml";
}

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

export type Route =
  | `/api/v1/books`
  | `/api/v1/books/${number}`
  | `/api/v1/books/search/title`
  | `/api/v1/books/search/author`
  | `/api/v1/books/export/csv/${string}/${string | undefined}`
  | `/api/v1/books/export/xml/${string}/${string | undefined}`;

type SearchData = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  query: string;
};

type OverviewPaginationData = Omit<SearchData, "query" | "sort">;

export const useLibrary = defineStore(
  "Library",
  () => {
    const config = useRuntimeConfig();
    const isDevMode = config.public.devMode !== "false";
    const apiBaseUrl = isDevMode
      ? "http://127.0.0.1:1234"
      : "https://laravel.yomuhoudai.club";

    const books = ref<Book[]>([]);
    const suggestions = ref<Book[]>([]);
    // Search page results are stored here
    const searchResults = ref<Book[]>([]);
    const searchSortTab = ref<"asc" | "desc">("asc");
    const searchFieldTab = ref<"title" | "author">("title");
    const searchQuery = ref<string>("");
    const searchData = ref<SearchData>({
      total: 0,
      perPage: 5,
      currentPage: 1,
      lastPage: 0,
      query: "",
    });
    const overviewPaginationData = ref<OverviewPaginationData>({
      total: 0,
      perPage: 3,
      currentPage: 1,
      lastPage: 0,
    });

    const loading = ref(false);

    const getBooks = () => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          books.value = response._data.data ?? [];
          if (books.value.length > 0) {
            overviewPaginationData.value.total = books.value.length;
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
            if (books.value.length == overviewPaginationData.value.total)
              books.value.push(newBook);
            overviewPaginationData.value.total += 1;
            searchBooksBy(searchFieldTab.value)({});
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

    const getBooksPaginated = async ({
      page = 1,
      onSuccess,
      onError,
    }: {
      page?: number;
    } & Callbacks) => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          if (!response.ok) return;
          const result = response._data.data;
          const newBooks = result.data ?? [];
          const currentPageIndex = overviewPaginationData.value.currentPage;

          overviewPaginationData.value = {
            total: result.total,
            perPage: result.per_page,
            currentPage: result.current_page,
            lastPage: result.last_page,
          };

          if (currentPageIndex < overviewPaginationData.value.currentPage) {
            books.value.push(...newBooks);
          } else if (overviewPaginationData.value.currentPage == 1) {
            books.value = newBooks;
          }

          // NOTE: This can happen if the overview page has loaded some (but not all) pages,
          // and a new book is added that would appear on an earlier page (based on sorting).
          // Because the earlier page wasn't refreshed, the new book won't show up in the
          // currently loaded or future pages. To fix this, we refresh the loaded books.
          if (
            overviewPaginationData.value.currentPage >=
              overviewPaginationData.value.lastPage &&
            books.value.length < overviewPaginationData.value.total
          ) {
            createToast({
              message: "Some books might be missing",
              toastOps: {
                description: h("div", [
                  h(
                    "span",
                    "A new book may have been added to an earlier page.",
                  ),
                  h(
                    "button",
                    {
                      style: {
                        marginLeft: "8px",
                        backgroundColor: "#facc14",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      },
                      onClick: () => {
                        getBooksPaginated({ page: 1 });
                      },
                    },
                    "Refresh books",
                  ),
                ]),
                position: "top-right",
                duration: 8000,
              },
              type: "warning",
            })();
          }

          if (newBooks.length > 0) {
            onSuccess?.(result);
          }
        },
        onResponseError({ response }) {
          createToast({
            message: "Failed to fetch the new books",
            toastOps: {
              description: response._data?.message ?? "Unknown error",
              position: "top-right",
            },
            type: "error",
          })();
          onError?.(response._data?.message ?? "Unknown error");
        },
      });

      loading.value = true;
      return fetcher<BooksResponse>(
        `/api/v1/books/search/title?q=%20&page=${page}&per_page=${overviewPaginationData.value.perPage}`,
        { method: "GET" },
      ).finally(() => {
        loading.value = false;
      });
    };

    const updateBook = async ({
      book,
      onSuccess,
      onError,
    }: { book: Book } & Callbacks) => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        onResponse({ response }) {
          if (!response.ok) return;
          if (response._data.data != undefined) {
            const updatedBook = response._data.data as Book;
            const index = books.value.findIndex((b) => b.id === updatedBook.id);
            if (index !== -1) {
              books.value[index] = { ...books.value[index], ...updatedBook };
            }
          }

          searchBooksBy(searchFieldTab.value)({});
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
            message: `Failed to update book with id ${book.id}`,
            toastOps: {
              description: response._data?.message ?? "Unknown error",
            },
            type: "error",
          })();
          onError?.(
            response._data?.message ??
              `Failed to update book with id ${book.id}`,
          );
        },
      });

      loading.value = true;

      const { id, ...payload } = book;
      return fetcher<BookResponse>(`/api/v1/books/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: payload,
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
          if (!response.ok) return;
          createToast({
            message: "Book deleted successfully",
            toastOps: { description: response._data?.message ?? "" },
            type: "success",
          })();

          const index = books.value.findIndex((b) => b.id === id);
          if (index !== -1) books.value.splice(index, 1);

          if (
            searchResults.value.length == 1 &&
            searchData.value.currentPage >= 2
          ) {
            searchBooksBy(searchFieldTab.value)({
              page: searchData.value.currentPage - 1,
            });
          } else {
            searchBooksBy(searchFieldTab.value)({});
          }
          overviewPaginationData.value.total -= 1;
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

    const downloadBooks = async ({
      type,
      format,
      onSuccess,
      onError,
    }: ExportPayload & Callbacks) => {
      const fetcher = $fetch.create({
        baseURL: apiBaseUrl,
        responseType: "blob",
        onResponse({ response }) {
          if (!response.ok) return;
          const blob = response._data;
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `books.${format}`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);

          createToast({
            message: "Downloaded successfully!",
            toastOps: { description: "" },
            type: "success",
          })();
          onSuccess?.(blob);
        },
        onResponseError({ response }) {
          createToast({
            message: `Failed to download books`,
            toastOps: {
              description: response._data?.message ?? "Unknown error",
            },
            type: "error",
          })();
          onError?.(response._data?.message ?? `Failed to export`);
        },
      });

      loading.value = true;

      return fetcher<ApiResponseGeneric<any>>(
        `/api/v1/books/export?type=${type}&format=${format}`,
        {
          method: "GET",
        },
      ).finally(() => {
        loading.value = false;
      });
    };

    const searchBooksBy =
      (field: "author" | "title") =>
      async ({
        page = searchData.value.currentPage,
        onSuccess,
        onError,
      }: {
        page?: number;
      } & Callbacks) => {
        const input = searchQuery.value;
        const query = input ?? searchData.value.query ?? "";

        const fetcher = $fetch.create({
          baseURL: apiBaseUrl,
          onResponse({ response }) {
            if (!response.ok) return;
            const result = response._data.data;
            searchData.value = {
              total: result.total,
              perPage: result.per_page,
              currentPage: result.current_page,
              lastPage: result.last_page,
              query: input ?? "",
            };

            searchResults.value = result.data ?? [];

            if (searchResults.value.length > 0) onSuccess?.(result);
          },
          onResponseError({ response }) {
            createToast({
              message: "Failed to search books by title",
              toastOps: {
                description: response._data?.message ?? "Unknown error",
                position: "top-right",
              },
              type: "error",
            })();
            onError?.(response._data?.message ?? "Search failed");
          },
        });

        loading.value = true;
        return fetcher<BooksResponse>(
          `/api/v1/books/search/${field}?q=${encodeURIComponent(query)}&page=${page}${searchData.value.perPage >= 5 ? `&per_page=${searchData.value.perPage}` : ``}&sort=${field}&direction=${searchSortTab.value}`,
          { method: "GET" },
        ).finally(() => {
          loading.value = false;
        });
      };

    return {
      loading,
      books,
      searchResults,
      getBooksPaginated,
      overviewPaginationData,
      getBooks,
      createBook,
      updateBook,
      deleteBook,
      suggestions,
      downloadBooks,
      searchData,
      searchQuery,
      searchSortTab,
      searchFieldTab,
      searchBooksBy,
    };
  },
  {
    persist: {
      // paths: ['books'], // TODO: Uncomment if needed
    },
  },
);
