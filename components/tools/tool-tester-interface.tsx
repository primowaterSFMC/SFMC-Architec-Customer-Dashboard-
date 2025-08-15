"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolSelector } from "./tool-selector"
import { DynamicForm } from "./dynamic-form"
import { ResponseViewer } from "./response-viewer"
import { TestHistory } from "./test-history"
import { SavedTemplates } from "./saved-templates"
import { toolsData } from "@/lib/tools-data"
import type { Tool } from "@/lib/tools-data"

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

export function ToolTesterInterface() {
  const searchParams = useSearchParams()
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null)
  const [testHistory, setTestHistory] = useState<TestResult[]>([])
  const [savedTemplates, setSavedTemplates] = useState<
    Array<{ id: string; name: string; toolId: string; input: Record<string, any> }>
  >([])

  // Initialize with tool from URL params if present
  useEffect(() => {
    const toolParam = searchParams.get("tool")
    if (toolParam) {
      const tool = toolsData.flatMap((category) => category.tools).find((t) => t.id === toolParam)
      if (tool) {
        setSelectedTool(tool)
      }
    }
  }, [searchParams])

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool)
    setCurrentResult(null)
  }

  const handleExecute = async (input: Record<string, any>) => {
    if (!selectedTool) return

    setIsExecuting(true)
    const startTime = Date.now()

    try {
      // Simulate API call with realistic delay
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 500))

      // Simulate success/failure (95% success rate)
      const success = Math.random() > 0.05
      const executionTime = Date.now() - startTime

      const result: TestResult = {
        id: `test_${Date.now()}`,
        toolId: selectedTool.id,
        toolName: selectedTool.name,
        input,
        output: success
          ? generateMockResponse(selectedTool, input)
          : {
              error: "API_ERROR",
              message: "The request failed due to invalid parameters or server error",
              code: 400,
            },
        success,
        executionTime,
        timestamp: new Date(),
        responseHeaders: {
          "Content-Type": "application/json",
          "X-Request-ID": `req_${Math.random().toString(36).substr(2, 9)}`,
          "X-Rate-Limit-Remaining": Math.floor(Math.random() * 100).toString(),
        },
      }

      setCurrentResult(result)
      setTestHistory((prev) => [result, ...prev.slice(0, 9)]) // Keep last 10 tests
    } catch (error) {
      console.error("Test execution failed:", error)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleSaveTemplate = (name: string, input: Record<string, any>) => {
    if (!selectedTool) return

    const template = {
      id: `template_${Date.now()}`,
      name,
      toolId: selectedTool.id,
      input,
    }

    setSavedTemplates((prev) => [...prev, template])
  }

  const handleLoadTemplate = (template: { toolId: string; input: Record<string, any> }) => {
    const tool = toolsData.flatMap((category) => category.tools).find((t) => t.id === template.toolId)

    if (tool) {
      setSelectedTool(tool)
      // The DynamicForm component will handle loading the input values
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Testing Interface */}
      <div className="lg:col-span-2 space-y-6">
        {/* Tool Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="font-playfair text-lg">Select Tool</CardTitle>
            <p className="text-sm text-muted-foreground">Choose an SFMC tool to test</p>
          </CardHeader>
          <CardContent>
            <ToolSelector selectedTool={selectedTool} onToolSelect={handleToolSelect} />
          </CardContent>
        </Card>

        {/* Dynamic Form */}
        {selectedTool && (
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-lg">Configure Parameters</CardTitle>
              <p className="text-sm text-muted-foreground">Set input parameters for {selectedTool.name}</p>
            </CardHeader>
            <CardContent>
              <DynamicForm
                tool={selectedTool}
                onExecute={handleExecute}
                onSaveTemplate={handleSaveTemplate}
                isExecuting={isExecuting}
              />
            </CardContent>
          </Card>
        )}

        {/* Response Viewer */}
        {currentResult && (
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-lg">Response</CardTitle>
              <p className="text-sm text-muted-foreground">Execution result for {currentResult.toolName}</p>
            </CardHeader>
            <CardContent>
              <ResponseViewer result={currentResult} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Saved Templates */}
        <SavedTemplates
          templates={savedTemplates}
          onLoadTemplate={handleLoadTemplate}
          onDeleteTemplate={(id) => setSavedTemplates((prev) => prev.filter((t) => t.id !== id))}
        />

        {/* Test History */}
        <TestHistory
          history={testHistory}
          onRerunTest={(result) => {
            setSelectedTool(toolsData.flatMap((category) => category.tools).find((t) => t.id === result.toolId) || null)
            // Auto-populate form with previous input
          }}
        />
      </div>
    </div>
  )
}

// Helper function to generate mock responses
function generateMockResponse(tool: Tool, input: Record<string, any>): Record<string, any> {
  // Return the tool's example output with some dynamic elements
  const baseResponse = { ...tool.exampleOutput }

  // Add some dynamic elements based on input
  if (input.name) {
    baseResponse.name = input.name
  }

  // Add timestamp
  baseResponse.timestamp = new Date().toISOString()

  // Add request ID
  baseResponse.requestId = `req_${Math.random().toString(36).substr(2, 9)}`

  return baseResponse
}
