<template>
  <Form v-slot="{ handleSubmit }" keep-values :validation-schema="formSchema">
    <Sheet v-model:open="open">
      <SheetTrigger as-child>
        <Button v-if="!mini" variant="default" class="h-4 bg-primary">
          {{ actionType === "edit" ? "Edit Book" : "New Book" }}
          <Icon name="proicons:book-add" class="ml-3" />
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

          <!-- FIELD: averageRating -->
          <FormField name="averageRating" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Average Rating</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  type="number"
                  step="0.1"
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
          <SheetClose as-child>
            <Button type="submit" form="addBookForm">Save Book</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </Form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Eye, Edit2 } from "lucide-vue-next";

const { actionType = "new", mini = false } = defineProps<{
  actionType: "edit" | "new" | "view";
  mini?: boolean;
}>();

const open = defineModel<boolean>();
const isViewMode = computed(() => actionType === "view");

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    description: z.string().optional(),
    categories: z.string().optional(),
    pageCount: z.number().optional(),
    publishedDate: z.string().optional(),
    averageRating: z.number().optional(),
    status: z.string().optional(),
  }),
);

function onSubmit(values: any) {
  createToast({
    message: "Book Submitted!",
    toastOps: {
      description: "Books based on your interests.",
    },
    type: "info",
  })();
  open.value = false;
}
</script>
