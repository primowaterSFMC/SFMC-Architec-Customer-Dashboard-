import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react"

export function SystemStatus() {
  const systemComponents = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.98%",
      lastIncident: "None in the last 30 days",
    },
    {
      name: "Authentication Service",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None in the last 30 days",
    },
    {
      name: "SFMC Tools Integration",
      status: "operational",
      uptime: "99.95%",
      lastIncident: "Minor disruption 5 days ago",
    },
    {
      name: "Dashboard & UI",
      status: "operational",
      uptime: "99.97%",
      lastIncident: "None in the last 30 days",
    },
    {
      name: "Analytics Service",
      status: "degraded",
      uptime: "98.45%",
      lastIncident: "Performance issues ongoing",
    },
  ]

  const recentIncidents = [
    {
      title: "Analytics Service Performance Issues",
      status: "investigating",
      started: "2024-12-12 14:30 PST",
      description: "Some users may experience slower loading times for analytics dashboards.",
    },
    {
      title: "Scheduled Maintenance - API Gateway",
      status: "completed",
      started: "2024-12-10 02:00 PST",
      description: "Routine maintenance completed successfully with no service interruption.",
    },
    {
      title: "SFMC Tools Integration Disruption",
      status: "resolved",
      started: "2024-12-07 09:15 PST",
      description: "Brief connectivity issues with Salesforce Marketing Cloud resolved.",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "outage":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "outage":
        return "bg-red-100 text-red-800"
      case "investigating":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const overallStatus = systemComponents.every((c) => c.status === "operational") ? "operational" : "degraded"

  return (
    <div className="space-y-6">
      <Card
        className={overallStatus === "operational" ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            {getStatusIcon(overallStatus)}
            <div>
              <h2 className="text-xl font-semibold">
                {overallStatus === "operational" ? "All Systems Operational" : "Some Systems Experiencing Issues"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Last updated: December 12, 2024 at 3:45 PM PST</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Components</CardTitle>
          <CardDescription>Current status of all platform components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemComponents.map((component, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(component.status)}
                  <div>
                    <h3 className="font-medium">{component.name}</h3>
                    <p className="text-sm text-gray-600">{component.lastIncident}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className={getStatusColor(component.status)}>
                    {component.status}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">{component.uptime} uptime</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>Latest system incidents and maintenance updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIncidents.map((incident, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{incident.title}</h3>
                  <Badge variant="secondary" className={getStatusColor(incident.status)}>
                    {incident.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                <p className="text-xs text-gray-500">Started: {incident.started}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
