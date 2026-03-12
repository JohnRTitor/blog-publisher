import { FileTextIcon } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <FileTextIcon className="size-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-medium">No posts yet</h2>
        <p className="text-sm text-muted-foreground">
          There are no published blog posts to show right now.
          <br />
          Check back later!
        </p>
      </div>
    </div>
  );
}