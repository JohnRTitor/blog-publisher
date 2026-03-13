"use client";

import { useRouter } from "next/navigation";
import { useAppForm } from "@/lib/form";
import { createBlogFormSchema } from "@/lib/schema/blog";
import { createBlogAction } from "@/app/actions/blog";
import { FieldGroup } from "@workspace/ui/components/field";
import { toast } from "sonner";

export default function PostForm() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      title: "",
      content: "",
      published: true,
    },

    validators: {
      onSubmit: createBlogFormSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const result = await createBlogAction(value);

        if (!result.success) {
          if (result.status === 401) {
            toast.error("You must be signed in to publish a post.");
            router.push("/login");
            return;
          }

          toast.error(result.error);
          return;
        }

        toast.success("Blog post published!");
        router.push("/dashboard");
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField name="title">
          {(field) => (
            <field.FormInputField
              label="Title"
              type="text"
              placeholder="My awesome post"
            />
          )}
        </form.AppField>

        <form.AppField name="content">
          {(field) => (
            <field.FormTextareaField
              label="Content"
              placeholder="Write your post here..."
              rows={8}
            />
          )}
        </form.AppField>

        <form.LoadingButton
          type="submit"
          loading={form.state.isSubmitting}
          loadingText="Publishing..."
        >
          Publish
        </form.LoadingButton>
      </FieldGroup>
    </form>
  );
}
