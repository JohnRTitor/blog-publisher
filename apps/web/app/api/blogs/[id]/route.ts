import { NextRequest, NextResponse } from "next/server";
import { getBlogById } from "@/lib/api/blog";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const blog = await getBlogById(params.id);

  if (!blog || !blog.published) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}
