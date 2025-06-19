<template>
  <Form
    v-slot="{ handleSubmit }"
    :key="isOpen ? 1 : 0"
    keep-values
    :initial-values="defaultValues"
    :validation-schema="formSchema"
  >
    <Sheet v-model:open="open">
      <SheetTrigger as-child>
        <Button
          v-if="!mini"
          variant="default"
          class="h-4 bg-primary rounded-md"
        >
          <label class="hidden md:block">
            {{ actionType === "edit" ? "Edit Book" : "New Book" }}
          </label>
          <Icon
            name="proicons:book-add"
            size="1.5rem"
            class="h-6 ml-0 md:ml-3"
          />
        </Button>
        <Button v-else variant="ghost" size="sm" class="h-1/3 p-2">
          <component
            :is="actionType === 'view' ? Eye : Edit2"
            class="w-4 h-4"
          />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        class="overflow-y-auto max-h-[95dvh] sm:max-w-[600px] overflow-x-hidden"
      >
        <SheetHeader>
          <SheetTitle>
            {{
              actionType === "edit"
                ? "Edit Book"
                : actionType === "view"
                  ? "Book Details"
                  : "Add New Book"
            }}
          </SheetTitle>
          <SheetDescription>
            {{
              actionType === "edit"
                ? "Modify the book details."
                : actionType === "view"
                  ? "View book information."
                  : "Enter the book details and save when you're done."
            }}
          </SheetDescription>
        </SheetHeader>
        <!-- All form fields go here -->
        <form
          id="addBookForm"
          @submit="handleSubmit($event, onSubmit)"
          class="grid gap-4 py-4"
        >
          <!-- FIELD: title -->
          <FormField name="title" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  placeholder="Book title"
                  :disabled="isViewMode"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- FIELD: author -->
          <FormField name="author" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  placeholder="Author name"
                  :disabled="isViewMode"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- FIELD: description -->
          <FormField name="description" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  v-bind="componentField"
                  rows="3"
                  placeholder="Summary..."
                  :disabled="isViewMode"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- FIELD: categories -->
          <FormField name="categories" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  placeholder="Comma-separated list"
                  :disabled="isViewMode"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- FIELD: pageCount -->
          <FormField name="pageCount" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Page Count</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="number"
                  :disabled="isViewMode"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- FIELD: publishedDate -->
          <FormField name="publishedDate" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Published Date</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="date"
                  :disabled="isViewMode"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- FIELD: Rating -->
          <FormField name="rating" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  v-bind="componentField"
                  :disabled="isViewMode"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- FIELD: status -->
          <FormField name="status" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <select
                  v-bind="componentField"
                  :disabled="isViewMode"
                  class="px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="plan-to-read">Plan to Read</option>
                  <option value="completed">Completed</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="on-hold">On Hold</option>
                  <option value="dropped">Dropped</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>

        <SheetFooter v-if="!isViewMode" class="mt-4">
          <Button :disabled="loading" type="submit" form="addBookForm"
            >Save Book</Button
          >
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </Form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useLibrary, type BookPayload } from "@/stores/library";
const { createBook, updateBook, loading } = useLibrary();
import * as z from "zod";

import { Eye, Edit2 } from "lucide-vue-next";

const {
  actionType = "new",
  mini = false,
  book,
} = defineProps<{
  actionType: "edit" | "new" | "view";
  mini?: boolean;
  book?: Book;
}>();

const open = defineModel<boolean>();
const isViewMode = computed(() => actionType === "view");

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    description: z.string().optional(),
    categories: z.string().optional(),
    pageCount: z.number().min(0, "Page count must be 0 or greater").optional(),
    publishedDate: z.string().optional(),
    rating: z.number().optional(),
    status: z
      .enum(["completed", "ongoing", "on-hold", "plan-to-read", "dropped"])
      .optional(),
  }),
);

// Transform the book prop into default form values
const defaultValues = computed(() => {
  if (!book || actionType === "new") return {};

  return {
    title: book.title || "",
    author: book.author || "",
    description: book.description || "",
    categories: (book.categories || []).join(", "),
    pageCount: book.pageCount ? book.pageCount : 0,
    publishedDate: book.publishedDate || "",
    rating: book.rating ? book.rating : 0,
    status: book.status || "plan-to-read",
  };
});

// NOTE: changing this value to trigger re-render
// using the key field on the form
// so that the initial-values are persistent
const isOpen = ref<boolean>(false);
watch(open, (newval) => {
  isOpen.value = newval != undefined ? newval : false;
});

const onSubmit = (values: any) => {
  const updatedValues: BookPayload = cleanBookPayload({
    title: values.title,
    author: values.author,
    cover: values.cover,
    status: values.status,
    rating: values.rating ?? 0,
    currentPage: values.currentPage,
    description: values.description,
    categories: values.categories,
    pageCount: values.pageCount,
    publishedDate: values.publishedDate,
  });

  if (actionType == "edit") {
    updateBook({
      book: { id: book?.id ?? -1, ...updatedValues },
      onSuccess: () => {
        open.value = false;
      },
    });
  } else {
    createBook({
      book: updatedValues,
      onSuccess: () => {
        open.value = false;
      },
    });
  }
};
</script>
