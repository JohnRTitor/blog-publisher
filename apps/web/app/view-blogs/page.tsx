import Link from "next/link";
import type { Metadata } from "next";
import { getPublicBlogs } from "@/lib/api/blog";
import BlogCard from "@/components/view-blogs-page/blog-card";
import EmptyState from "@/components/view-blogs-page/empty-state";
import { Button } from "@workspace/ui/components/button";
import { PenLineIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "All Posts | Blog Publisher",
  description: "Browse all published blog posts.",
};

export default async function ViewBlogsPage() {
  const { data: blogs, pagination: { total } } = await getPublicBlogs(1, 50);

  return (
    <>
      <div className="mb-10 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">All Posts</h1>
        <p className="text-sm text-muted-foreground">
          {total === 0
            ? "No published posts yet."
            : `${total} published post${total === 1 ? "" : "s"}`}
        </p>
      </div>

      {/* Blog grid or empty state */}
      {blogs.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <li key={blog.id} className="flex">
              <BlogCard
                id={blog.id}
                title={blog.title}
                content={blog.content}
                author={blog.author}
                createdAt={blog.createdAt}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
