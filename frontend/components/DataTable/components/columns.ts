import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

import { statuses } from "../data/data";
import type { Book } from "@/stores/library";
import DataTableColumnHeader from "./DataTableColumnHeader.vue";
import DataTableRowActions from "./DataTableRowActions.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Book>[] = [
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
        class: "translate-y-0.5",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
        class: "translate-y-0.5",
      }),
    enableSorting: false,
    enableHiding: false,
  },

  // Title
  {
    accessorKey: "title",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Title" }),
    cell: ({ row }) =>
      h(
        "span",
        { class: "font-medium max-w-[300px] truncate" },
        row.getValue("title"),
      ),
    enableHiding: false,
  },

  // Author
  {
    accessorKey: "author",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Author" }),
    cell: ({ row }) =>
      h(
        "span",
        { class: "max-w-[250px] truncate" },
        row.getValue("author") || "-",
      ),
  },

  // Cover image
  {
    accessorKey: "cover",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Cover" }),
    cell: ({ row }) =>
      row.getValue("cover")
        ? h("img", {
            src: row.getValue("cover"),
            alt: row.getValue("title"),
            class: "h-12 w-auto rounded",
          })
        : h("span", {}, "-"),

    enableSorting: false,
  },

  // Description
  {
    accessorKey: "description",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Description" }),
    cell: ({ row }) =>
      h(
        "span",
        { class: "max-w-[400px] truncate" },
        row.getValue("description") || "-",
      ),
    enableSorting: false,
  },

  // Categories (array of strings)
  {
    accessorKey: "categories",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Categories" }),
    cell: ({ row }) => {
      const cats = row.getValue("categories");
      if (!cats || cats.length === 0) return h("span", {}, "-");
      return h(
        "div",
        { class: "flex flex-wrap gap-1" },
        cats.map((cat: string) =>
          h(Badge, { variant: "secondary", key: cat }, () => cat),
        ),
      );
    },

    enableSorting: false,
  },

  // Status (lookup with icon)
  {
    accessorKey: "status",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Status" }),
    cell: ({ row }) => {
      const status = statuses.find((s) => s.value === row.getValue("status"));
      if (!status) return h("span", {}, "-");
      return h("div", { class: "flex items-center space-x-1" }, [
        status.icon &&
          h(status.icon, { class: "h-4 w-4 text-muted-foreground" }),
        h("span", {}, status.label),
      ]);
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  // Page Count
  {
    accessorKey: "pageCount",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Pages" }),
    cell: ({ row }) => h("span", {}, row.getValue("pageCount") || "-"),
  },

  // Language (lookup from languages list)
  {
    accessorKey: "language",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Language" }),
    cell: ({ row }) => {
      const lang = row.getValue("language");
      return h("span", lang ? lang : "N/A");
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: false,
  },

  // Publisher (lookup from publishers list)
  {
    accessorKey: "publisher",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Publisher" }),
    cell: ({ row }) => {
      const pub = row.getValue("publisher");
      return h("span", pub ? pub : "-");
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),

    enableSorting: false,
    enableHiding: true,
  },

  // Published Date
  {
    accessorKey: "publishedDate",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Published" }),
    cell: ({ row }) => h("span", {}, row.getValue("publishedDate") || "-"),
  },

  // Average Rating
  {
    accessorKey: "averageRating",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Avg Rating" }),
    cell: ({ row }) => h("span", {}, row.getValue("averageRating") || "-"),
  },

  // Ratings Count
  {
    accessorKey: "ratingsCount",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Ratings Count" }),
    cell: ({ row }) => h("span", {}, row.getValue("ratingsCount") || "-"),
  },
];
