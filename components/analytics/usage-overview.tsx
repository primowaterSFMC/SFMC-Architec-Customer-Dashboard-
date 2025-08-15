"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, TrendingUp, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react"

const overviewStats = [
  {
    title: "Total API Calls",
    value: "156,847",
    change: "+12.5%",
    changeType: "positive" as const,
    period: "vs last month",
    icon: Activity,
    breakdown: {
      today: "4,231",
      week: "28,459",
      month: "156,847",
    },
  },
  {
    title: "Success Rate",
    value: "99.2%",
    change: "+0.3%",
    changeType: "positive" as const,
    period: "vs last month",
    icon: TrendingUp,
    breakdown: {
      successful: "155,592",
      failed: "1,255",
      rate: "99.2%",
    },
  },
  {
    title: "Avg Response Time",
    value: "247ms",
    change: "-15ms",
    changeType: "positive" as const,
    period: "vs last month",
    icon: Clock,
    breakdown: {
      fastest: "45ms",
      slowest: "2.1s",
      p95: "890ms",
    },
  },
  {
    title: "Most Used Tool",
    value: "Journey Builder",
    change: "34.2%",
    changeType: "neutral" as const,
    period: "of total usage",
    icon: Zap,
    breakdown: {
      calls: "53,642",
      percentage: "34.2%",
      rank: "#1",
    },
  },
]

export function UsageOverview() {
  return (
    <div className="space-y-6">
      <h2 className="font-playfair text-xl font-semibold text-foreground">Usage Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  {stat.changeType !== "neutral" && (
                    <Badge
                      variant="secondary"
                      className={`flex items-center gap-1 ${
                        stat.changeType === "positive"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {stat.changeType === "positive" ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {stat.change}
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">{stat.period}</p>

                <div className="space-y-1">
                  {Object.entries(stat.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-muted-foreground capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
