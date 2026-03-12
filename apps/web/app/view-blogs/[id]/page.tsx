import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/api/blog";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { ArrowLeftIcon, CalendarIcon, UserIcon } from "lucide-react";
import type { Metadata } from "next";

type GenerateMetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog || !blog.published) {
    return { title: "Post not found | Blog Publisher" };
  }

  return {
    title: `${blog.title} | Blog Publisher`,
    description: blog.content.slice(0, 160),
  };
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function ViewBlogPage({ params }: GenerateMetadataProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog || !blog.published) {
    notFound();
  }

  return (
    <div className="min-h-svh bg-background">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3">
          <Link href="/" className="text-base font-semibold tracking-tight">
            Blog Publisher
          </Link>

          <Button variant="ghost" size="sm">
            <Link href="/view-blogs" className="flex items-center gap-1.5">
              <ArrowLeftIcon className="size-3.5" />
              All posts
            </Link>
          </Button>
        </div>
      </header>

      {/* ── Article ─────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Title */}
        <h1 className="text-3xl leading-snug font-bold tracking-tight">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <UserIcon className="size-4 shrink-0" />
            {blog.author.name}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="size-4 shrink-0" />
            {formatDate(blog.createdAt)}
          </span>
        </div>

        <Separator className="my-8" />

        {/* Body */}
        <article className="max-w-none text-sm leading-relaxed whitespace-pre-wrap text-foreground">
          {blog.content}
        </article>

        <Separator className="my-10" />

        {/* Back link */}
        <Button variant="outline" size="sm">
          <Link href="/view-blogs" className="flex items-center gap-1.5">
            <ArrowLeftIcon className="size-3.5" />
            Back to all posts
          </Link>
        </Button>
      </main>
    </div>
  );
}
