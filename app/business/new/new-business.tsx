"use client";

import { createNewBusiness } from "@/actions/new-business";
import { Spinner } from "@/components/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];
const MAX_IMAGE_SIZE = 5242880; // 5 MB
const newBusinessUSchema = z.object({
  name: z.string().min(2).max(50),
  image: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`)
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
      `Each file size should be less than 5 MB.`
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type)
        ),
      "Only these types are allowed .jpg, .jpeg, .png and .webp"
    ),
});

type NewBusinessType = z.infer<typeof newBusinessUSchema>;

export function NewBusinessForm() {
  const [preview, setPreview] = useState("");
  const { toast } = useToast();

  const form = useForm<NewBusinessType>({
    resolver: zodResolver(newBusinessUSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: NewBusinessType) => {
    const formData = new FormData();
    formData.append("name", values.name);
    // Append each file to FormData
    formData.append("image", values.image[0]);

    const { data, error } = await createNewBusiness(formData);
    console.log(error);

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    } else {
      toast({
        description: "business has been added successfully!",
      });
    }
  };

  function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;

    if (files && files.length > 0) {
      const displayUrl = URL.createObjectURL(event.target.files![0]);
      return { files, displayUrl };
    }
    return { files: null, displayUrl: "" };
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  space-y-8"
      >
        {form.formState.isValid &&
          form.formState.isDirty &&
          preview.length > 0 && (
            <Avatar className="w-24 h-24 mx-auto mt-4">
              <AvatarImage src={preview} />
              <AvatarFallback>BU</AvatarFallback>
            </Avatar>
          )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    {...rest}
                    disabled={form.formState.isSubmitting}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const { files, displayUrl } = getImageData(event);
                      setPreview(displayUrl);
                      onChange(files);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Choose image for your Business.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          create new business
        </Button>
      </form>
    </Form>
  );
}
