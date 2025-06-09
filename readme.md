## Requirements

- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)

## Setup

1. Clone the repository.
1. Start the containers by running `docker-compose up -d` in the project root.
1. Install the composer packages by running `docker-compose exec laravel composer install`.
1. Access the Laravel instance on `http://localhost` (If there is a "Permission denied" error, run `docker-compose exec laravel chown -R www-data storage`).

Note that the changes you make to local files will be automatically reflected in the container.

## Persistent database

If you want to make sure that the data in the database persists even if the database container is deleted, add a file named `docker-compose.override.yml` in the project root with the following contents.

```
version: "3.7"

services:
  mysql:
    volumes:
    - mysql:/var/lib/mysql

volumes:
  mysql:
```

Then run the following.

```
docker-compose stop \
  && docker-compose rm -f mysql \
  && docker-compose up -d
```

---

### Frontend Directory Structure

- [Stores](#stores)
  - [1- useLibrary()](<#1--uselibrary()>)
  - [2- useStateManager()](<#2--usestatemanager()>)
  - [3- useToastManagerStore()](<#3--usetoastmanagerstore()>)

```python
frontend/
├── app.vue                 # frontend entry point
├── assets/css/             # Tailwind and global CSS
├── components/             # UI components for modular usage
│   ├── DataTable/          # Book list display components
│   └── Landing/            # Hero, Features, etc. for home page
├── config/                 # Configs for various sections/pages
│   ├── misc/               # Miscellaneous configs (i18n, Nuxt image, Tailwind, viewport)
    │   pages/              # Page configs for app navigation and metadata, when
│   └── landing/            # Landing page configs (benefits, features, hero, sponsors, team)
├── i18n/                   # Locale files (en, jp, tr, etc.)
├── layouts/                # Default layouts like main and with-tabs
├── lib/                    # Utility functions (e.g., date or string utils)
├── pages/                  # Nuxt file-based routing
│   ├── dashboard/          # /dashboard routes
│   │   ├── explore.vue     # Possibly shows book grid
│   │   ├── manage.vue      # Book management
│   │   └── settings.vue    # Settings UI
│   └── index.vue           # Homepage
├── public/                 # Static assets like images, favicon
├── server/                 # Server runtime configs
stores/
├── library.ts              # Pinia store managing book list and CRUD via API
├── stateManager.ts         # Pinia store managing app navigation, page state, and API keys
├── toastManagerStore.ts    # Pinia store for toast notification creation and management
types/                      # common ts types
utils/                      # General-purpose reusable utilities
├── create-toast.ts         #  Helper function that uses the toastManagerStore
├── find-page-by-id.ts      # Finds and returns a page object by its unique ID.
nuxt.config.ts              # Nuxt setup (modules, i18n, tailwind, etc.)
tailwind.config.js          # Tailwind v3 setup
```

---

### Stores

#### 1- useLibrary()

This Pinia store manages a collection of books with CRUD operations and search capabilities via API calls. It also handles loading states and user feedback through toast notifications.

---

##### State

- `books: Book[]` - List of books in the library.
- `loading: boolean` - Indicates if an API call is in progress.

---

##### Functions

- **getBooks({ onSuccess?, onError? })**  
  Fetches all books from `/api/v1/books`. Updates `books` state. Shows success/error toast.

- **getBookById({ id: number, onSuccess?, onError? })**  
  Fetches a single book by `id` from `/api/v1/books/{id}`. Shows success/error toast.

- **createBook({ book: Omit<Book, "id">, onSuccess?, onError? })**  
  Creates a new book via POST to `/api/v1/books`. Adds the created book to `books`. Shows success/error toast.

- **updateBook({ id: number, book: Partial<Omit<Book, "id">>, onSuccess?, onError? })**  
  Updates a book by `id` with partial data via PUT to `/api/v1/books/{id}`. Shows success/error toast.

- **deleteBook({ id: number, onSuccess?, onError? })**  
  Deletes a book by `id` via DELETE to `/api/v1/books/{id}`. Removes book from `books` on success. Shows success/error toast.

- **searchBooksByTitle({ title: string, onSuccess?, onError? })**  
  Searches books by title via GET `/api/v1/books/search/title?q={title}`. Shows success/error toast.

- **searchBooksByAuthor({ author: string, onSuccess?, onError? })**  
  Searches books by author via GET `/api/v1/books/search/author?q={author}`. Shows success/error toast.

---

###### Notes

- <small>Each function supports optional callbacks: `onSuccess` and `onError` for custom handling.</small>
- <small>Uses `createToast` to notify user of success or failure.</small>
- <small> Manages `loading` state during API requests.</small>

---

#### 2- useStateManager()

This Pinia store manages app-wide UI state including navigation toggle states, API keys, page loading status, and current active page info. It also provides navigation helper functions with loading indicators.

---

##### State

- `navState: { open: boolean; collapsed: boolean }` — Tracks navigation menu open/collapsed state.
- `apikeys: { gpt: string }` — Stores API keys like GPT key.
- `loadingPage: boolean` — Indicates if a page navigation is in progress.
- `currentPageInfo: Page` — Holds metadata of the current active page.

<small>Note: The store persists `navState` and `apikeys` across sessions using the localStorage.</small>

---

##### Functions

- **findPage(id: string): Page \| false**  
  Finds a page by its `id` in the `pages` dictionary. Returns the page or `false` if not found.

- **updateActivePage(id: string): Page**  
  Updates `currentPageInfo` to the page matching the given `id` or defaults to `{ uid: id }` if not found. Returns the updated page.

- **navigatePage(page: Page): Promise<void>**  
  Sets loading state, updates active page, then navigates to `page.href`. Clears loading state after navigation.

- **navigatePageById(id: string): Promise<void>**  
  Finds a page by `id`, navigates to its href, and manages loading state.

---

#### 3- useToastManagerStore()

This Pinia store provides a centralized way to create various types of toast notifications using `vue-sonner`. It supports multiple toast types with customizable options.

---

##### Functions

- **create({ message: string, toastOps?: ToastT, type?: ToastTypes }): Function**  
  Returns a function that triggers a toast notification with the specified message, options, and type.
  - `message`: Text to display in the toast.
  - `toastOps`: Optional settings like icon, duration, position, actions, and styling.
  - `type`: Toast category such as `"success"`, `"info"`, `"warning"`, `"error"`, `"loading"`, or `"default"`.

---
