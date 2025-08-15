import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { UsageOverview } from "@/components/analytics/usage-overview"
import { DetailedMetrics } from "@/components/analytics/detailed-metrics"
import { UsageReports } from "@/components/analytics/usage-reports"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <UsageOverview />
      <DetailedMetrics />
      <UsageReports />
    </div>
  )
}
