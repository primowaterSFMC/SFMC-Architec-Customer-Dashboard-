"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Key, Activity, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Active Tokens",
    value: "3",
    change: "+1",
    changeType: "positive" as const,
    icon: Key,
    description: "Currently active API tokens",
  },
  {
    title: "API Calls Today",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Activity,
    description: "Requests made today",
  },
  {
    title: "API Calls This Month",
    value: "28,459",
    change: "+8%",
    changeType: "positive" as const,
    icon: Calendar,
    description: "Total monthly requests",
  },
  {
    title: "Success Rate",
    value: "99.2%",
    change: "-0.1%",
    changeType: "negative" as const,
    icon: TrendingUp,
    description: "API call success rate",
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
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
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
