"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { MoreHorizontal, Eye, MessageSquare, Edit, Trash2 } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js 15",
    status: "Published",
    views: 1234,
    comments: 23,
    date: "Mar 15, 2026",
  },
  {
    id: 2,
    title: "Building Modern UIs with Tailwind CSS",
    status: "Published",
    views: 892,
    comments: 15,
    date: "Mar 12, 2026",
  },
  {
    id: 3,
    title: "Understanding React Server Components",
    status: "Draft",
    views: 0,
    comments: 0,
    date: "Mar 10, 2026",
  },
  {
    id: 4,
    title: "The Future of Web Development",
    status: "Published",
    views: 2456,
    comments: 45,
    date: "Mar 8, 2026",
  },
  {
    id: 5,
    title: "Mastering TypeScript in 2026",
    status: "Published",
    views: 1678,
    comments: 32,
    date: "Mar 5, 2026",
  },
];

export function RecentPosts() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">Recent Posts</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your latest blog posts and their performance
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-lg bg-secondary/50 p-4 transition-colors hover:bg-secondary"
            >
              <div className="mr-4 min-w-0 flex-1">
                <h4 className="truncate text-sm font-medium text-foreground">
                  {post.title}
                </h4>
                <div className="mt-1 flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                  <Badge
                    variant={
                      post.status === "Published" ? "default" : "secondary"
                    }
                    className={
                      post.status === "Published"
                        ? "bg-primary/20 text-primary hover:bg-primary/30"
                        : ""
                    }
                  >
                    {post.status}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-4 text-muted-foreground sm:flex">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs">
                      {post.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs">{post.comments}</span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    }
                  />

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
