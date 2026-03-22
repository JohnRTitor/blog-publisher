import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";

const activities = [
  {
    user: "Sarah Wilson",
    action: "commented on",
    target: "Getting Started with Next.js 15",
    time: "2 minutes ago",
    initials: "SW",
  },
  {
    user: "Mike Chen",
    action: "subscribed to your blog",
    target: "",
    time: "15 minutes ago",
    initials: "MC",
  },
  {
    user: "Emily Davis",
    action: "liked",
    target: "Building Modern UIs with Tailwind CSS",
    time: "1 hour ago",
    initials: "ED",
  },
  {
    user: "Alex Turner",
    action: "shared",
    target: "The Future of Web Development",
    time: "3 hours ago",
    initials: "AT",
  },
  {
    user: "Jordan Lee",
    action: "bookmarked",
    target: "Mastering TypeScript in 2026",
    time: "5 hours ago",
    initials: "JL",
  },
];

export function ActivityFeed() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription className="text-muted-foreground">
          Latest interactions on your blog
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <Avatar className="h-8 w-8 bg-primary/20">
                <AvatarFallback className="bg-transparent text-xs text-primary">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">
                    {activity.action}
                  </span>{" "}
                  {activity.target && (
                    <span className="font-medium text-primary">
                      {activity.target}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
