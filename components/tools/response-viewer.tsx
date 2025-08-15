"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, CheckCircle, XCircle, Clock, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TestResult {
  id: string
  toolId: string
  toolName: string
  input: Record<string, any>
  output: Record<string, any>
  success: boolean
  executionTime: number
  timestamp: Date
  responseHeaders?: Record<string, string>
}

interface ResponseViewerProps {
  result: TestResult
}

export function ResponseViewer({ result }: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState("response")
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

  const downloadResponse = () => {
    const data = {
      tool: result.toolName,
      timestamp: result.timestamp.toISOString(),
      input: result.input,
      output: result.output,
      executionTime: result.executionTime,
      success: result.success,
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${result.toolId}_${result.timestamp.getTime()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download started",
      description: "Response data has been downloaded",
    })
  }

  return (
    <div className="space-y-4">
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {result.success ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <Badge
              variant="outline"
              className={
                result.success ? "border-green-200 text-green-800 bg-green-50" : "border-red-200 text-red-800 bg-red-50"
              }
            >
              {result.success ? "Success" : "Error"}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {result.executionTime}ms
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={downloadResponse}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Response Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="response">Response</TabsTrigger>
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
        </TabsList>

        <TabsContent value="response" className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Response Body</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(JSON.stringify(result.output, null, 2), "Response")}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-96">
              <code>{JSON.stringify(result.output, null, 2)}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="request" className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Request Body</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(JSON.stringify(result.input, null, 2), "Request")}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-96">
              <code>{JSON.stringify(result.input, null, 2)}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="headers" className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Response Headers</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(JSON.stringify(result.responseHeaders, null, 2), "Headers")}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="space-y-2">
            {result.responseHeaders &&
              Object.entries(result.responseHeaders).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="font-mono text-sm font-medium">{key}</span>
                  <span className="font-mono text-sm text-muted-foreground">{value}</span>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Execution Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Execution Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Tool:</span>
              <span className="ml-2 font-medium">{result.toolName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Execution Time:</span>
              <span className="ml-2 font-medium">{result.executionTime}ms</span>
            </div>
            <div>
              <span className="text-muted-foreground">Timestamp:</span>
              <span className="ml-2 font-medium">{result.timestamp.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Request ID:</span>
              <span className="ml-2 font-mono text-xs">{result.responseHeaders?.["X-Request-ID"] || "N/A"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
