import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { UsageChart } from "@/components/dashboard/usage-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { NotificationsBanner } from "@/components/dashboard/notifications-banner"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Notifications Banner */}
      <NotificationsBanner />

      {/* Welcome Section */}
      <WelcomeCard />

      {/* Stats Overview */}
      <StatsGrid />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <UsageChart />
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  )
}
