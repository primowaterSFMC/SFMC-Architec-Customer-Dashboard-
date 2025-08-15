"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Eye, EyeOff, ExternalLink, Activity, Clock, Calendar, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useToast } from "@/hooks/use-toast"

interface TokenDetailsDialogProps {
  token: {
    id: string
    name: string
    token: string
    status: "active" | "suspended" | "expired"
    createdAt: Date
    expiresAt: Date
    lastUsedAt: Date
    usageCount: number
    rateLimit: {
      requestsPerMinute: number
      requestsPerDay: number
    }
    description: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock usage data
const usageData = [
  { day: "Mon", calls: 120 },
  { day: "Tue", calls: 135 },
  { day: "Wed", calls: 98 },
  { day: "Thu", calls: 145 },
  { day: "Fri", calls: 168 },
  { day: "Sat", calls: 89 },
  { day: "Sun", calls: 124 },
]

// Mock recent API calls
const recentCalls = [
  { timestamp: "2024-12-15T10:30:00", tool: "Journey Builder", action: "Create Journey", status: "success" },
  { timestamp: "2024-12-15T10:28:00", tool: "Data Extensions", action: "Query Data", status: "success" },
  { timestamp: "2024-12-15T10:25:00", tool: "Email Validation", action: "Validate Email", status: "success" },
  { timestamp: "2024-12-15T10:22:00", tool: "Automation Studio", action: "Start Automation", status: "success" },
  { timestamp: "2024-12-15T10:20:00", tool: "Content Builder", action: "Create Asset", status: "error" },
  { timestamp: "2024-12-15T10:18:00", tool: "Subscriber Management", action: "Update Subscriber", status: "success" },
  { timestamp: "2024-12-15T10:15:00", tool: "Journey Builder", action: "Activate Journey", status: "success" },
  { timestamp: "2024-12-15T10:12:00", tool: "Data Extensions", action: "Create Data Extension", status: "success" },
  { timestamp: "2024-12-15T10:10:00", tool: "Analytics", action: "Get Opens", status: "success" },
  { timestamp: "2024-12-15T10:08:00", tool: "Contact Builder", action: "Search Contacts", status: "success" },
]

export function TokenDetailsDialog({ token, open, onOpenChange }: TokenDetailsDialogProps) {
  const [showFullToken, setShowFullToken] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: `${label} copied`,
        description: `${label} has been copied to clipboard`,
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: `Failed to copy ${label.toLowerCase()} to clipboard`,
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "suspended":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "expired":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const connectionUrl = `claude://connect?token=${token.token}&name=${encodeURIComponent(token.name)}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="font-playfair text-xl">{token.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{token.description}</p>
            </div>
            <Badge variant="outline" className={getStatusColor(token.status)}>
              {token.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Token Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Token Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">API Token</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">
                    {showFullToken
                      ? token.token
                      : `${token.token.slice(0, 16)}${"•".repeat(32)}${token.token.slice(-16)}`}
                  </code>
                  <Button variant="outline" size="icon" onClick={() => setShowFullToken(!showFullToken)}>
                    {showFullToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(token.token, "Token")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Claude Desktop Connection URL</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-muted rounded text-sm font-mono break-all">{connectionUrl}</code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(connectionUrl, "Connection URL")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={connectionUrl}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="text-sm font-medium">{token.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Expires</p>
                    <p className="text-sm font-medium">{token.expiresAt.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Calls</p>
                    <p className="text-sm font-medium">{token.usageCount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Last Used</p>
                    <p className="text-sm font-medium">{token.lastUsedAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rate Limits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rate Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Requests per Minute</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }} />
                    </div>
                    <span className="text-sm text-muted-foreground">45/{token.rateLimit.requestsPerMinute}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Requests per Day</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "67%" }} />
                    </div>
                    <span className="text-sm text-muted-foreground">6,700/{token.rateLimit.requestsPerDay}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage History (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-muted-foreground" fontSize={12} />
                    <YAxis className="text-muted-foreground" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="calls"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent API Calls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent API Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentCalls.map((call, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${call.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                      />
                      <div>
                        <p className="text-sm font-medium">{call.tool}</p>
                        <p className="text-xs text-muted-foreground">{call.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{new Date(call.timestamp).toLocaleTimeString()}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          call.status === "success" ? "border-green-200 text-green-700" : "border-red-200 text-red-700"
                        }`}
                      >
                        {call.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
