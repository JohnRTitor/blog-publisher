import { prisma } from "@workspace/database";

export async function getPublicBlogs(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });

  const total = await prisma.blog.count({
    where: { published: true },
  });

  return {
    blogs,
    total,
  };
}

export async function createBlog(data: {
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}) {
  return prisma.blog.create({
    data,
  });
}

export async function getBlogById(id: string) {
  return prisma.blog.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
