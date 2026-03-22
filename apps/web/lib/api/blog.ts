import "server-only";

import { prisma } from "@workspace/database";

// Shared select for the blog author to avoid leaking sensitive fields
const authorSelect = {
  id: true,
  name: true,
} as const;

// ─── Pagination helper ─────────────────────────────────────────────────────

function paginationMeta(total: number, page: number, limit: number) {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}

// ─── List / Search ──────────────────────────────────────────────────────────

export async function getPublicBlogs(
  page: number,
  limit: number,
  filters?: { authorId?: string; authorName?: string; search?: string }
) {
  const skip = (page - 1) * limit;

  // Build a dynamic `where` clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = { published: true };

  if (filters?.authorId) {
    where.authorId = filters.authorId;
  }

  if (filters?.authorName) {
    where.author = {
      name: { contains: filters.authorName, mode: "insensitive" },
    };
  }

  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { content: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      include: { author: { select: authorSelect } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blog.count({ where }),
  ]);

  return { data: blogs, pagination: paginationMeta(total, page, limit) };
}

// ─── By author ──────────────────────────────────────────────────────────────

export async function getBlogsByAuthorId(
  authorId: string,
  page: number = 1,
  limit: number = 20
) {
  const skip = (page - 1) * limit;

  const where = { authorId };

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      include: { author: { select: authorSelect } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blog.count({ where }),
  ]);

  return { data: blogs, pagination: paginationMeta(total, page, limit) };
}

export async function getBlogsByAuthorName(
  authorName: string,
  page: number = 1,
  limit: number = 20
) {
  const skip = (page - 1) * limit;

  const where = {
    published: true,
    author: { name: { contains: authorName, mode: "insensitive" as const } },
  };

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      include: { author: { select: authorSelect } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blog.count({ where }),
  ]);

  return { data: blogs, pagination: paginationMeta(total, page, limit) };
}

export async function searchBlogs(
  query: string,
  page: number = 1,
  limit: number = 20
) {
  const skip = (page - 1) * limit;

  const where = {
    published: true,
    OR: [
      { title: { contains: query, mode: "insensitive" as const } },
      { content: { contains: query, mode: "insensitive" as const } },
    ],
  };

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      include: { author: { select: authorSelect } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.blog.count({ where }),
  ]);

  return { data: blogs, pagination: paginationMeta(total, page, limit) };
}

// ─── Single blog ────────────────────────────────────────────────────────────

export async function getBlogById(id: string) {
  return prisma.blog.findUnique({
    where: { id },
    include: { author: { select: authorSelect } },
  });
}

// ─── Create / Update / Delete ───────────────────────────────────────────────

export async function createBlog(data: {
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}) {
  return prisma.blog.create({ data });
}

export async function updateBlog(
  id: string,
  data: { title?: string; content?: string; published?: boolean }
) {
  return prisma.blog.update({
    where: { id },
    data,
    include: { author: { select: authorSelect } },
  });
}

export async function deleteBlog(id: string) {
  return prisma.blog.delete({ where: { id } });
}
