<p align="center">
  <img src="./public/logo.webp" height="150"  />
</p>

Yomuhoudai is a full-stack web app for browsing, managing, and performing CRUD operations on a book collection. It uses Laravel for the backend API, Nuxt for the frontend, and supports both local development (via Docker) and production deployment (via Coolify on a Hetzner VPS).

## Table of Contents

- [Requirements](#requirements)
- [Setup](#setup)
- [Environment Configuration](#environment-configuration)
- [Frontend Development Setup](#frontend-development-setup)
  - [Option 1: Using Docker Compose](#option-1-using-docker-compose)
  - [Option 2: Local Node Environment](#option-2-local-node-environment)
- [Deployment and CI/CD Overview](#deployment-and-cicd-overview)
  - [GitHub Workflow for Staging Deployment](#github-workflow-for-staging-deployment)
- [API Documentation](#api-documentation)
- [Frontend Directory Structure](#frontend-directory-structure)
- [Stores](#stores)
  - [1-useLibrary](#1-uselibrary)
  - [2-useStateManager](#2-usestatemanager)
  - [3-useToastManagerStore](#3-usetoastmanagerstore)

## Requirements

- [Docker](https://docs.docker.com/install)
- [Docker Compose](https://docs.docker.com/compose/install)

## Setup

1. Clone the repository.

```bash
git clone https://github.com/kaandesu/yomuhoudai.git
```

2. Start the containers by running:

```bash
docker-compose up -d
```

3. Install the Composer dependencies inside the Laravel container:

```bash
docker-compose exec laravel composer install
```

4. Run the database migrations:

```bash
docker-compose exec laravel php artisan migrate
```

Persistent database:

If you want to ensure that your database data persists even if the MySQL container is removed, create a file named `docker-compose.override.yml` in the project root with the following contents:

```yaml
version: "3.7"

services:
  mysql:
    volumes:
      - mysql:/var/lib/mysql

volumes:
  mysql:
```

Then restart the containers with:

```bash
docker-compose stop \
  && docker-compose rm -f mysql \
  && docker-compose up -d
```

---

### Environment Configuration

The `docker-compose.yml` file includes pre-configured environment variables under the `laravel` service:

```yaml
APP_DEBUG: "false" # Set to "true" for development mode
APP_ENV: production # Set to "local" for development environment
```

You can modify these values depending on your setup. For local development, it’s recommended to use:

```yaml
APP_DEBUG: "true"
APP_ENV: local
```

---

## Frontend Development Setup

You have two options to run the frontend during development:

### Option 1: Using Docker Compose

Run the full stack including the frontend container with:

```bash
docker-compose up -d frontend
```

This uses the Dockerfile under `frontend/` which builds and serves the app via nginx on port `3000`.

---

### Option 2: Local Node Environment

1. Enter frontend folder

```bash
cd frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the dev server:

```bash
pnpm dev
```

By default, the frontend connects to the deployed backend server.

To connect to your local backend instead, run:

```bash
NUXT_PUBLIC_DEV_MODE=true pnpm dev
```

This sets the frontend to send API requests to your local Laravel backend. You can change the default behaviour
through [runtimeConfig](https://nuxt.com/docs/guide/going-further/runtime-config) located in nuxt.config.ts.

---

## Deployment and CI/CD Overview

The project is deployed on a VPS rented from Hetzner and managed via Coolify, which provides easy app deployment and management.

- The backend Laravel API is hosted at:  
  <https://laravel.yomuhoudai.club/>
  <https://api.yomuhoudai.club/>

- The backend staging deployment is hosted at:  
  <https://api-staging.yomuhoudai.club/>

- The frontend app is deployed and accessible at:  
  <https://app.yomuhoudai.club/>  
  <https://library.yomuhoudai.club/>

- Coolify management dashboard is available at:  
  <https://cloud.yomuhoudai.club/>

- Caddy is configured as a reverse proxy to handle routing and HTTPS certificates.

---

### GitHub Workflow for Staging Deployment

There is a GitHub Actions workflow that automatically deploys the frontend to a staging environment on every push to the `staging` branch.

- Staging site URL:  
  <https://staging.yomuhoudai.club/>

This ensures continuous integration and deployment for testing and preview before production releases.

---

## API Documentation

Interactive API documentation is available via Swagger UI:

🔗 [https://laravel.yomuhoudai.club/api/documentation](https://laravel.yomuhoudai.club/api/documentation)

This includes all available endpoints, request/response formats.

<p align="left">
  <img src="./public/swaggerss.webp" height="300"  />
</p>

---

## Frontend Directory Structure

- [Stores](#stores)
  - [1- useLibrary](#1-uselibrary)
  - [2- useStateManager](#2-usestatemanager)
  - [3- useToastManagerStore](#3-usetoastmanagerstore)

```python
frontend/
├── app.vue                 # frontend entry point
├── assets/css/             # Tailwind and global CSS
├── components/             # UI components for modular usage
│   ├── DataTable/          # Book list display components
│   └── Landing/            # Hero, Features, etc. for home page
├── config/                 # Configs for various sections/pages
│   ├── misc/               # Miscellaneous configs (i18n, Nuxt image, Tailwind, viewport)
│   │   pages/              # Page configs for app navigation and metadata
│   └── landing/            # Landing page configs (benefits, features, hero, sponsors, team)
├── i18n/                   # Locale files (en, jp, tr, etc.)
├── layouts/                # Default layouts like main and with-tabs
├── lib/                    # Utility functions (e.g., date or string utils)
├── pages/                  # Nuxt file-based routing
│   ├── dashboard/          # /dashboard routes
│   │   ├── explore.vue     # Book suggestions
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
├── clean-book-payload.ts   # Formats the book payload compliant to the backend schema
nuxt.config.ts              # Nuxt setup (modules, i18n, tailwind, etc.)
tailwind.config.js          # Tailwind v3 setup
```

---

## Stores

### 1-useLibrary

This Pinia store manages a collection of books with CRUD operations and search capabilities via API calls. It also handles loading states and user feedback through toast notifications.

#### State

- `books: Book[]` - List of books in the library.
- `loading: boolean` - Indicates if an API call is in progress.
- `suggestions: Book[]` - List of suggested books in the library. (Editor's Choice or by an AI(wip))

#### Functions

- **getBooks({ onSuccess?, onError? })**  
  Fetches all books from `/api/v1/books`. Updates `books` state. Shows success/error toast.

- **getBookById({ id: number, onSuccess?, onError? })**  
  Fetches a single book by `id` from `/api/v1/books/{id}`. Shows success/error toast.

- **createBook({ book: Omit<Book, "id">, onSuccess?, onError? })**  
  Creates a new book via POST to `/api/v1/books`. Adds the created book to `books`. Shows success/error toast.

- **updateBook({ book: Book, onSuccess?, onError? })**  
  Updates a book via PUT to `/api/v1/books/{id}`. Shows success/error toast.

- **deleteBook({ id: number, onSuccess?, onError? })**  
  Deletes a book by `id` via DELETE to `/api/v1/books/{id}`. Removes book from `books` on success. Shows success/error toast.

- **searchBooksByTitle({ title: string, onSuccess?, onError? })**  
  Searches books by title via GET `/api/v1/books/search/title?q={title}`. Shows success/error toast.

- **searchBooksByAuthor({ author: string, onSuccess?, onError? })**  
  Searches books by author via GET `/api/v1/books/search/author?q={author}`. Shows success/error toast.

##### Notes

- <small>Each function supports optional callbacks: `onSuccess` and `onError` for custom handling.</small>
- <small>Uses `createToast` to notify user of success or failure.</small>
- <small> Manages `loading` state during API requests.</small>

---

### 2-useStateManager

This Pinia store manages app-wide UI state including navigation toggle states, API keys, page loading status, and current active page info. It also provides navigation helper functions with loading indicators.

#### State

- `navState: { open: boolean; collapsed: boolean }` — Tracks navigation menu open/collapsed state.
- `apikeys: { gpt: string }` — Stores API keys like GPT key.
- `loadingPage: boolean` — Indicates if a page navigation is in progress.
- `currentPageInfo: Page` — Holds metadata of the current active page.

<small>Note: The store persists `navState` and `apikeys` across sessions using the localStorage.</small>

#### Functions

- **findPage(id: string): Page \| false**  
  Finds a page by its `id` in the `pages` dictionary. Returns the page or `false` if not found.

- **updateActivePage(id: string): Page**  
  Updates `currentPageInfo` to the page matching the given `id` or defaults to `{ uid: id }` if not found. Returns the updated page.

- **navigatePage(page: Page): Promise<void>**  
  Sets loading state, updates active page, then navigates to `page.href`. Clears loading state after navigation.

- **navigatePageById(id: string): Promise<void>**  
  Finds a page by `id`, navigates to its href, and manages loading state.

---

### 3-useToastManagerStore

This Pinia store provides a centralized way to create various types of toast notifications using `vue-sonner`. It supports multiple toast types with customizable options.

#### Functions

- **create({ message: string, toastOps?: ToastT, type?: ToastTypes }): Function**  
  Returns a function that triggers a toast notification with the specified message, options, and type.
  - `message`: Text to display in the toast.
  - `toastOps`: Optional settings like icon, duration, position, actions, and styling.
  - `type`: Toast category such as `"success"`, `"info"`, `"warning"`, `"error"`, `"loading"`, or `"default"`.

---
