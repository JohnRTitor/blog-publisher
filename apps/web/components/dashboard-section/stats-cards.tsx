import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  FileText,
  Eye,
  MessageSquare,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    title: "Total Posts",
    value: "124",
    change: "+12%",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Total Views",
    value: "45.2K",
    change: "+23%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Comments",
    value: "1,429",
    change: "+8%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    title: "Subscribers",
    value: "2,847",
    change: "-2%",
    trend: "down",
    icon: Users,
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="mt-1 flex items-center gap-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-primary" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span
                className={`text-xs font-medium ${
                  stat.trend === "up" ? "text-primary" : "text-destructive"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
