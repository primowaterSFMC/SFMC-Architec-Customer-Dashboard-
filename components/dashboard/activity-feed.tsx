"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Key, Wrench } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "token",
    title: "New API token generated",
    description: 'Token "Production-2024" created successfully',
    timestamp: "2 minutes ago",
    status: "success",
    icon: Key,
  },
  {
    id: 2,
    type: "api",
    title: "High API usage detected",
    description: "Journey Builder tools used 450 times in the last hour",
    timestamp: "15 minutes ago",
    status: "warning",
    icon: Wrench,
  },
  {
    id: 3,
    type: "api",
    title: "Data Extension created",
    description: 'Successfully created "Customer_Preferences_2024"',
    timestamp: "1 hour ago",
    status: "success",
    icon: CheckCircle,
  },
  {
    id: 4,
    type: "system",
    title: "Monthly usage report generated",
    description: "December 2024 usage report is now available",
    timestamp: "3 hours ago",
    status: "info",
    icon: Clock,
  },
  {
    id: 5,
    type: "api",
    title: "Automation executed",
    description: "Weekly newsletter automation completed successfully",
    timestamp: "5 hours ago",
    status: "success",
    icon: CheckCircle,
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-lg">Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">Latest actions and system events</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className={`p-2 rounded-full ${
                  activity.status === "success"
                    ? "bg-green-100 text-green-600"
                    : activity.status === "warning"
                      ? "bg-yellow-100 text-yellow-600"
                      : activity.status === "error"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                }`}
              >
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm text-foreground">{activity.title}</h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      activity.status === "success"
                        ? "border-green-200 text-green-700"
                        : activity.status === "warning"
                          ? "border-yellow-200 text-yellow-700"
                          : activity.status === "error"
                            ? "border-red-200 text-red-700"
                            : "border-blue-200 text-blue-700"
                    }`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
