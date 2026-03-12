"use client";

import { useRouter } from "next/navigation";
import { useAppForm } from "@/lib/form";
import { createBlogFormSchema } from "@/lib/schema/blog";
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
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (response.status === 401) {
        toast.error("You must be signed in to publish a post.");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message =
          data?.error ?? "Something went wrong. Please try again.";
        toast.error(message);
        return;
      }

      toast.success("Blog post published!");
      router.push("/dashboard");
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
