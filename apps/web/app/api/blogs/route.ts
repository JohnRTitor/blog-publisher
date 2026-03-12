import { NextRequest, NextResponse } from "next/server";
import { getPublicBlogs, createBlog } from "@/lib/api/blog";
import { createBlogSchema } from "@/lib/schema/blog";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "10");

  const result = await getPublicBlogs(page, limit);

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const parsed = createBlogSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const blog = await createBlog({
    ...parsed.data,
    authorId: session.user.id,
  });

  return NextResponse.json(blog, { status: 201 });
}
