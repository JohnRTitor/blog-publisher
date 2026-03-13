import { NextRequest, NextResponse } from "next/server";
import { getBlogById } from "@/lib/api/blog";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const blog = await getBlogById(id);

  if (!blog || !blog.published) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}
