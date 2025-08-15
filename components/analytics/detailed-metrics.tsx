"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

// Mock data for charts
const timelineData = [
  { date: "Dec 1", calls: 4200, successful: 4158, failed: 42 },
  { date: "Dec 2", calls: 3800, successful: 3762, failed: 38 },
  { date: "Dec 3", calls: 5100, successful: 5049, failed: 51 },
  { date: "Dec 4", calls: 4600, successful: 4554, failed: 46 },
  { date: "Dec 5", calls: 5400, successful: 5346, failed: 54 },
  { date: "Dec 6", calls: 3900, successful: 3861, failed: 39 },
  { date: "Dec 7", calls: 4800, successful: 4752, failed: 48 },
  { date: "Dec 8", calls: 5200, successful: 5148, failed: 52 },
  { date: "Dec 9", calls: 4100, successful: 4059, failed: 41 },
  { date: "Dec 10", calls: 4700, successful: 4653, failed: 47 },
  { date: "Dec 11", calls: 5300, successful: 5247, failed: 53 },
  { date: "Dec 12", calls: 4400, successful: 4356, failed: 44 },
  { date: "Dec 13", calls: 4900, successful: 4851, failed: 49 },
  { date: "Dec 14", calls: 5100, successful: 5049, failed: 51 },
  { date: "Dec 15", calls: 4231, successful: 4189, failed: 42 },
]

const categoryData = [
  { name: "Journey Builder", value: 34.2, calls: 53642, color: "hsl(var(--chart-1))" },
  { name: "Data Management", value: 22.8, calls: 35760, color: "hsl(var(--chart-2))" },
  { name: "Content Builder", value: 18.5, calls: 29016, color: "hsl(var(--chart-3))" },
  { name: "Automation Studio", value: 12.1, calls: 18978, color: "hsl(var(--chart-4))" },
  { name: "Analytics", value: 7.3, calls: 11449, color: "hsl(var(--chart-5))" },
  { name: "Other", value: 5.1, calls: 8002, color: "hsl(var(--muted-foreground))" },
]

const responseTimeData = [
  { range: "0-100ms", count: 45230, percentage: 28.8 },
  { range: "100-250ms", count: 62140, percentage: 39.6 },
  { range: "250-500ms", count: 31420, percentage: 20.0 },
  { range: "500ms-1s", count: 12890, percentage: 8.2 },
  { range: "1s-2s", count: 4320, percentage: 2.8 },
  { range: ">2s", count: 847, percentage: 0.5 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted-foreground))",
]

export function DetailedMetrics() {
  return (
    <div className="space-y-6">
      <h2 className="font-playfair text-xl font-semibold text-foreground">Detailed Metrics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Calls Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-playfair text-lg">API Calls Timeline</CardTitle>
            <p className="text-sm text-muted-foreground">Daily API call volume and success rate over time</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-muted-foreground" fontSize={12} />
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
                    name="Total Calls"
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="successful"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={2}
                    name="Successful"
                    dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="failed"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    name="Failed"
                    dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tool Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="font-playfair text-lg">Tool Category Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">Usage distribution by tool category</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any, name: string) => [
                      `${value}% (${categoryData.find((d) => d.name === name)?.calls.toLocaleString()} calls)`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-playfair text-lg">Response Time Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">API response time performance breakdown</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-muted-foreground" fontSize={12} />
                  <YAxis dataKey="range" type="category" className="text-muted-foreground" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any) => [`${value.toLocaleString()} calls`, "Count"]}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Tools Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Most Used Tools</CardTitle>
          <p className="text-sm text-muted-foreground">Top performing tools by usage volume</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.calls.toLocaleString()} calls</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{category.value}%</p>
                  <div className="w-20 h-2 bg-muted rounded-full mt-1">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${category.value * 2.5}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
