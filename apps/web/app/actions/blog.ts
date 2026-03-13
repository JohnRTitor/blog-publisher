"use server";

import { headers } from "next/headers";
import { createBlog } from "@/lib/api/blog";
import { createBlogSchema } from "@/lib/schema/blog";
import { auth } from "@/lib/auth";

type ActionResult =
  | { success: true; blogId: string }
  | { success: false; status: 401 | 422 | 500; error: string };

export async function createBlogAction(data: unknown): Promise<ActionResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false, status: 401, error: "Unauthorized" };
  }

  const parsed = createBlogSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, status: 422, error: "Validation failed" };
  }

  try {
    const blog = await createBlog({
      ...parsed.data,
      authorId: session.user.id,
    });

    return { success: true, blogId: blog.id };
  } catch {
    return {
      success: false,
      status: 500,
      error: "Something went wrong. Please try again.",
    };
  }
}
