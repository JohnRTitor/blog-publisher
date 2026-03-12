import { prisma } from "@workspace/database";
import { NextResponse } from "next/server";

export async function GET() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(blogs);
}
