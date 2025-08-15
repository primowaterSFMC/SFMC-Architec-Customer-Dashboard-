import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageCircle, Clock, CheckCircle, AlertCircle, Phone } from "lucide-react"

export function SupportOverview() {
  const quickStats = [
    { label: "Open Tickets", value: "2", icon: Clock, color: "text-orange-600" },
    { label: "Resolved This Month", value: "8", icon: CheckCircle, color: "text-green-600" },
    { label: "Avg Response Time", value: "2.4h", icon: MessageCircle, color: "text-blue-600" },
    { label: "System Status", value: "Operational", icon: AlertCircle, color: "text-green-600" },
  ]

  const quickActions = [
    {
      title: "Browse Knowledge Base",
      description: "Find answers to common questions",
      icon: BookOpen,
      href: "#knowledge",
    },
    {
      title: "Submit New Ticket",
      description: "Get help from our support team",
      icon: MessageCircle,
      href: "#contact",
    },
    { title: "Schedule Call", description: "Book a consultation with our experts", icon: Phone, href: "#contact" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common support tasks and resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <action.icon className="h-6 w-6 text-sfmc-blue mt-1" />
                <div>
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
