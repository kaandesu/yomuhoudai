<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        class="h-4 bg-secondary justify-start text-left"
        variant="secondary"
      >
        <label class="pointer-events-none hidden md:inline-block">
          Download
        </label>
        <Icon
          name="material-symbols:download-2-outline-rounded"
          class="pointer-events-none ml-0 h-6 w-6 md:ml-2 md:h-4 md:w-4"
        />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-40 flex flex-col items-center justify-center">
      <form keep-values class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="type">
          <FormItem class="space-y-3">
            <FormLabel>Select fields</FormLabel>
            <FormControl>
              <RadioGroup
                class="flex flex-col space-y-1"
                v-bind="componentField"
              >
                <FormItem
                  :key="i"
                  v-for="(type, i) in optionFields.type"
                  class="flex items-center space-y-0 gap-x-3"
                >
                  <FormControl>
                    <RadioGroupItem :value="type.value" />
                  </FormControl>
                  <FormLabel class="font-normal">{{ type.label }}</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="format">
          <FormItem class="space-y-3">
            <FormLabel>Select format</FormLabel>
            <FormControl>
              <RadioGroup
                class="flex flex-col space-y-1"
                v-bind="componentField"
              >
                <FormItem
                  :key="i"
                  v-for="(type, i) in optionFields.format"
                  class="flex items-center space-y-0 gap-x-3"
                >
                  <FormControl>
                    <RadioGroupItem :value="type.value" />
                  </FormControl>
                  <FormLabel class="font-normal">{{ type.label }}</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button class="w-4/5" type="submit">Submit</Button>
      </form>
    </PopoverContent>
  </Popover>
</template>
<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLibrary } from "@/stores/library";
const { downloadBooks } = useLibrary();

const optionFields = {
  type: [
    { label: "Titles and Authors", value: "titles_and_authors" },
    { label: "Titles only", value: "titles" },
    { label: "Authors only", value: "authors" },
  ],
  format: [
    { label: "CSV", value: "csv" },
    { label: "XML", value: "xml" },
  ],
};

const formSchema = toTypedSchema(
  z.object({
    type: z.enum(["titles_and_authors", "titles", "authors"], {
      required_error: "You need to select a field type",
    }),
    format: z.enum(["csv", "xml"], {
      required_error: "You need to select a file format",
    }),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    type: "titles_and_authors",
    format: "csv",
  },
});

const onSubmit = handleSubmit(async (values) => {
  await downloadBooks({ type: values.type, format: values.format });
  console.log("submitted", values);
});
</script>
