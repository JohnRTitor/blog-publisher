import z from "zod";

// Used as the TanStack Form validator — input type must exactly match
// defaultValues, so `published` is a plain boolean with no default.
export const createBlogFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(50000, "Content must be at most 50,000 characters"),
  published: z.boolean(),
});

// Used in the API route — `published` is optional and defaults to true so
// callers that omit the field still get sensible behaviour.
export const createBlogSchema = createBlogFormSchema.extend({
  published: z.boolean().optional().default(true),
});

// Used in the PUT API route — all fields are optional, but at least one must
// be provided so that empty updates are rejected.
export const updateBlogSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(200, "Title must be at most 200 characters")
      .optional(),
    content: z
      .string()
      .min(1, "Content is required")
      .max(50000, "Content must be at most 50,000 characters")
      .optional(),
    published: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: "At least one field must be provided",
  });

export type CreateBlogFormInput = z.infer<typeof createBlogFormSchema>;
export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
