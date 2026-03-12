import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { CalendarIcon, UserIcon } from "lucide-react";
import { format as formatDate } from "date-fns";

type BlogCardProps = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: Date;
};

function getExcerpt(content: string, maxLength = 160): string {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength).trimEnd() + "…";
}

export default function BlogCard({
  id,
  title,
  content,
  author,
  createdAt,
}: BlogCardProps) {
  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg leading-snug">
          {title}
        </CardTitle>
        <CardDescription className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs">
          <span className="flex items-center gap-1">
            <UserIcon className="size-3 shrink-0" />
            {author.name}
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon className="size-3 shrink-0" />
            {formatDate(new Date(createdAt), "MMMM d, yyyy")}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 text-sm text-muted-foreground">
        <p>{getExcerpt(content)}</p>
      </CardContent>

      <CardFooter>
        <Button variant="outline" size="sm">
          <Link href={`/view-blogs/${id}`}>Read more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
