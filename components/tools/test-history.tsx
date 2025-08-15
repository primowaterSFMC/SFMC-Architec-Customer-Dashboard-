"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react"

interface TestResult {
  id: string
  toolId: string
  toolName: string
  input: Record<string, any>
  output: Record<string, any>
  success: boolean
  executionTime: number
  timestamp: Date
}

interface TestHistoryProps {
  history: TestResult[]
  onRerunTest: (result: TestResult) => void
}

export function TestHistory({ history, onRerunTest }: TestHistoryProps) {
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Test History</CardTitle>
          <p className="text-sm text-muted-foreground">Recent test executions will appear here</p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tests executed yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-lg">Test History</CardTitle>
        <p className="text-sm text-muted-foreground">Recent test executions</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((result) => (
            <div key={result.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="font-medium text-sm">{result.toolName}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onRerunTest(result)} className="h-6 px-2">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      result.success ? "border-green-200 text-green-700" : "border-red-200 text-red-700"
                    }`}
                  >
                    {result.success ? "Success" : "Error"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{result.executionTime}ms</span>
                </div>
                <p className="text-xs text-muted-foreground">{result.timestamp.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
