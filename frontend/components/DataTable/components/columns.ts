import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import {
  PauseIcon,
  RocketIcon,
  TimerIcon,
  CheckIcon,
  TrashIcon,
} from "@radix-icons/vue";
import type { Book } from "@/stores/library";
import DataTableColumnHeader from "./DataTableColumnHeader.vue";
import DataTableRowActions from "./DataTableRowActions.vue";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const statuses = [
  {
    value: "on-hold",
    label: "On Hold",
    icon: h(PauseIcon),
  },
  {
    value: "plan-to-read",
    label: "Planned",
    icon: h(RocketIcon),
  },
  {
    value: "ongoing",
    label: "On Going",
    icon: h(TimerIcon),
  },
  {
    value: "completed",
    label: "Completed",
    icon: h(CheckIcon),
  },
  {
    value: "dropped",
    label: "Dropped",
    icon: h(TrashIcon),
  },
];

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

  // Published Date
  {
    accessorKey: "publishedDate",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Published" }),
    cell: ({ row }) => h("span", {}, row.getValue("publishedDate") || "-"),
  },

  //  Rating
  {
    accessorKey: "rating",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Rating" }),
    cell: ({ row }) => h("span", {}, row.getValue("rating") || "-"),
  },
];
