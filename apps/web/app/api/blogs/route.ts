import { NextRequest, NextResponse } from "next/server";
import { getPublicBlogs, createBlog } from "@/lib/api/blog";
import { createBlogSchema } from "@/lib/schema/blog";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? "10") || 10));

  // Optional filters
  const authorId = searchParams.get("authorId") ?? undefined;
  const authorName = searchParams.get("authorName") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  try {
    const result = await getPublicBlogs(page, limit, {
      authorId,
      authorName,
      search,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = createBlogSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 422 }
    );
  }

  try {
    const blog = await createBlog({
      ...parsed.data,
      authorId: session.user.id,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
