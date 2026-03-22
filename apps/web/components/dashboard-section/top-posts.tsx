import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";

const topPosts = [
  { title: "The Future of Web Development", views: 2456, percentage: 100 },
  { title: "Mastering TypeScript in 2026", views: 1678, percentage: 68 },
  { title: "Getting Started with Next.js 15", views: 1234, percentage: 50 },
  {
    title: "Building Modern UIs with Tailwind CSS",
    views: 892,
    percentage: 36,
  },
  { title: "React Hooks Deep Dive", views: 654, percentage: 27 },
];

export function TopPosts() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Top Performing Posts</CardTitle>
        <CardDescription className="text-muted-foreground">
          Posts with the highest views this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPosts.map((post, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="truncate pr-4 text-sm font-medium text-foreground">
                  {post.title}
                </span>
                <span className="text-sm whitespace-nowrap text-muted-foreground">
                  {post.views.toLocaleString()} views
                </span>
              </div>
              <Progress value={post.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
