"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", calls: 1200, success: 1188 },
  { day: "Tue", calls: 1350, success: 1337 },
  { day: "Wed", calls: 980, success: 972 },
  { day: "Thu", calls: 1450, success: 1438 },
  { day: "Fri", calls: 1680, success: 1663 },
  { day: "Sat", calls: 890, success: 883 },
  { day: "Sun", calls: 1247, success: 1235 },
]

export function UsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-lg">API Usage - Last 7 Days</CardTitle>
        <p className="text-sm text-muted-foreground">Daily API call volume and success rate trends</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
                name="Total Calls"
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="success"
                stroke="hsl(var(--chart-4))"
                strokeWidth={2}
                name="Successful Calls"
                dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
