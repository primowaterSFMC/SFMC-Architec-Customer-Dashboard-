"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Play, Save, RotateCcw, Lightbulb } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Tool } from "@/lib/tools-data"

interface DynamicFormProps {
  tool: Tool
  onExecute: (input: Record<string, any>) => void
  onSaveTemplate: (name: string, input: Record<string, any>) => void
  isExecuting: boolean
}

export function DynamicForm({ tool, onExecute, onSaveTemplate, isExecuting }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [showExamples, setShowExamples] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [showSaveTemplate, setShowSaveTemplate] = useState(false)
  const { toast } = useToast()

  // Initialize form with example data
  useEffect(() => {
    setFormData(tool.exampleInput)
  }, [tool])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onExecute(formData)
  }

  const handleReset = () => {
    setFormData(tool.exampleInput)
    toast({
      title: "Form reset",
      description: "Form has been reset to example values",
    })
  }

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Template name required",
        description: "Please enter a name for your template",
        variant: "destructive",
      })
      return
    }

    onSaveTemplate(templateName, formData)
    setTemplateName("")
    setShowSaveTemplate(false)
    toast({
      title: "Template saved",
      description: `Template "${templateName}" has been saved`,
    })
  }

  const renderField = (field: string, schema: any) => {
    const value = formData[field]
    const fieldType = typeof schema === "string" ? schema : schema.type || "string"

    switch (fieldType) {
      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={field}
              checked={value || false}
              onCheckedChange={(checked) => handleInputChange(field, checked)}
            />
            <Label htmlFor={field}>{field}</Label>
          </div>
        )

      case "array":
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{field}</Label>
            <Textarea
              id={field}
              value={Array.isArray(value) ? JSON.stringify(value, null, 2) : ""}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  handleInputChange(field, parsed)
                } catch {
                  // Invalid JSON, keep as string for now
                  handleInputChange(field, e.target.value)
                }
              }}
              placeholder={`Enter ${field} as JSON array`}
              rows={3}
            />
          </div>
        )

      case "object":
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{field}</Label>
            <Textarea
              id={field}
              value={typeof value === "object" ? JSON.stringify(value, null, 2) : ""}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  handleInputChange(field, parsed)
                } catch {
                  // Invalid JSON, keep as string for now
                  handleInputChange(field, e.target.value)
                }
              }}
              placeholder={`Enter ${field} as JSON object`}
              rows={4}
            />
          </div>
        )

      case "select":
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{field}</Label>
            <Select value={value || ""} onValueChange={(val) => handleInputChange(field, val)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${field}`} />
              </SelectTrigger>
              <SelectContent>
                {schema.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{field}</Label>
            <Input
              id={field}
              type={fieldType === "number" ? "number" : "text"}
              value={value || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={`Enter ${field}`}
            />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Form Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setShowExamples(!showExamples)}>
            <Lightbulb className="h-4 w-4 mr-2" />
            {showExamples ? "Hide" : "Show"} Examples
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setShowSaveTemplate(!showSaveTemplate)}>
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>

      {/* Example Values */}
      {showExamples && (
        <div className="p-3 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Example Input</h4>
          <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
            {JSON.stringify(tool.exampleInput, null, 2)}
          </pre>
        </div>
      )}

      {/* Save Template */}
      {showSaveTemplate && (
        <div className="p-3 border rounded-lg space-y-3">
          <h4 className="font-medium text-sm">Save as Template</h4>
          <div className="flex gap-2">
            <Input placeholder="Template name" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
            <Button onClick={handleSaveTemplate}>Save</Button>
            <Button variant="outline" onClick={() => setShowSaveTemplate(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Dynamic Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(tool.inputSchema).map(([field, schema]) => (
            <div key={field}>{renderField(field, schema)}</div>
          ))}
        </div>

        {/* Input/Output Format Info */}
        <div className="flex items-center gap-2 pt-2">
          <Badge variant="outline">Input: {tool.inputFormat}</Badge>
          <span className="text-muted-foreground">→</span>
          <Badge variant="outline">Output: {tool.outputFormat}</Badge>
        </div>

        {/* Execute Button */}
        <Button type="submit" disabled={isExecuting} className="w-full">
          <Play className="h-4 w-4 mr-2" />
          {isExecuting ? "Executing..." : "Execute Tool"}
        </Button>
      </form>
    </div>
  )
}
