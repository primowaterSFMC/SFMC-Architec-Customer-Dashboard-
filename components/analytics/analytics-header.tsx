"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

export function AnalyticsHeader() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [timeframe, setTimeframe] = useState("30d")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-foreground">Usage Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive insights into your API usage and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            Real-time Data
          </Badge>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          {timeframe === "custom" && <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>
    </div>
  )
}
