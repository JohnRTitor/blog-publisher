import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import PostForm from "@/components/post-page/post-form";

export default function PostPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Create a new post</CardTitle>
          <CardDescription>
            Fill in the details below and hit <strong>Publish</strong> to make
            your post live.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <PostForm />
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Changed your mind?{" "}
            <Link href="/dashboard" className="text-primary hover:underline">
              Back to dashboard
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
