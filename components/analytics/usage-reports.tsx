"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Download, Calendar, FileText, Settings } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { useToast } from "@/hooks/use-toast"

const availableReports = [
  {
    id: "monthly-summary",
    name: "Monthly Usage Summary",
    description: "Comprehensive monthly usage report with all metrics",
    lastGenerated: "December 1, 2024",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: "tool-performance",
    name: "Tool Performance Report",
    description: "Detailed analysis of individual tool performance",
    lastGenerated: "December 1, 2024",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: "error-analysis",
    name: "Error Analysis Report",
    description: "Failed API calls analysis and troubleshooting guide",
    lastGenerated: "December 1, 2024",
    size: "956 KB",
    format: "PDF",
  },
  {
    id: "usage-trends",
    name: "Usage Trends Report",
    description: "Historical usage patterns and trend analysis",
    lastGenerated: "December 1, 2024",
    size: "3.1 MB",
    format: "PDF",
  },
]

export function UsageReports() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [reportFormat, setReportFormat] = useState("pdf")
  const [emailReports, setEmailReports] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateReport = async (reportType: string) => {
    setIsGenerating(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast({
      title: "Report generated",
      description: `Your ${reportType} report has been generated and is ready for download.`,
    })

    setIsGenerating(false)
  }

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Download started",
      description: "Your report download has started.",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="font-playfair text-xl font-semibold text-foreground">Usage Reports</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Generation */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-playfair text-lg">Generate Custom Report</CardTitle>
            <p className="text-sm text-muted-foreground">Create a custom usage report for any date range</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
              </div>

              <div className="space-y-2">
                <Label>Report Format</Label>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="csv">CSV Data</SelectItem>
                    <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                    <SelectItem value="json">JSON Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Report Sections</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Usage Overview",
                  "Tool Performance",
                  "Error Analysis",
                  "Response Times",
                  "Trend Analysis",
                  "Cost Breakdown",
                ].map((section) => (
                  <div key={section} className="flex items-center space-x-2">
                    <Switch id={section} defaultChecked />
                    <Label htmlFor={section} className="text-sm">
                      {section}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={() => handleGenerateReport("custom")} disabled={isGenerating} className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating Report..." : "Generate Report"}
            </Button>
          </CardContent>
        </Card>

        {/* Scheduled Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="font-playfair text-lg">Scheduled Reports</CardTitle>
            <p className="text-sm text-muted-foreground">Automated report delivery settings</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="monthly-reports">Monthly Reports</Label>
                <Switch id="monthly-reports" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <Switch id="weekly-reports" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-delivery">Email Delivery</Label>
                <Switch id="email-delivery" checked={emailReports} onCheckedChange={setEmailReports} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Delivery Schedule</Label>
              <Select defaultValue="first-monday">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-monday">First Monday of Month</SelectItem>
                  <SelectItem value="last-day">Last Day of Month</SelectItem>
                  <SelectItem value="15th">15th of Each Month</SelectItem>
                  <SelectItem value="custom">Custom Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Configure Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Available Reports</CardTitle>
          <p className="text-sm text-muted-foreground">Previously generated reports ready for download</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {report.lastGenerated}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {report.format}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{report.size}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report.id)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
