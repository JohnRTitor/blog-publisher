import { Sidebar } from "@/components/dashboard-section/sidebar";
import { StatsCards } from "@/components/dashboard-section/stats-cards";
import { AnalyticsChart } from "@/components/dashboard-section/analytics-chart";
import { RecentPosts } from "@/components/dashboard-section/recent-posts";
import { TopPosts } from "@/components/dashboard-section/top-posts";
import { ActivityFeed } from "@/components/dashboard-section/activity-feed";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="lg:pl-64">
        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s an overview of your blog.
            </p>
          </div>

          <div className="space-y-6">
            <StatsCards />

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <AnalyticsChart />
              </div>
              <div>
                <TopPosts />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RecentPosts />
              </div>
              <div>
                <ActivityFeed />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
